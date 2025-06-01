import React, {useState, useRef, useEffect} from 'react';
import {
  Upload,
  Camera,
  Sparkles,
  Download,
  Share2,
  AlertCircle,
  CheckCircle,
  Loader2,
  Clock,
  Heart,
  ShoppingBag,
  Shirt,
  Users,
} from 'lucide-react';
import {useConfig} from '~/utils/themeContext';
import {AuthPrompt} from '~/components/AuthPrompt';

interface AITask {
  taskId: string;
  status: 'submitted' | 'processing' | 'succeed' | 'failed';
  resultUrl?: string;
  error?: string;
}

interface APIResponse {
  taskId: string;
  status: string;
  message?: string;
  resultUrl?: string;
  error?: string;
}

interface CustomerData {
  customer?: {
    id: string;
    firstName?: string;
    lastName?: string;
    metafields?: Array<{
      id: string;
      namespace: string;
      key: string;
      value: string;
      type: string;
    }>;
  };
}

interface UsageInfo {
  currentUsage: number;
  limit: number;
  resetDate: Date;
  canGenerate: boolean;
}

export default function AIPhotoGenerator() {
  const config = useConfig();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [currentTask, setCurrentTask] = useState<AITask | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string>('');
  const [customerData, setCustomerData] = useState<CustomerData | null>(null);
  const [usageInfo, setUsageInfo] = useState<UsageInfo | null>(null);
  const [isLoadingAuth, setIsLoadingAuth] = useState(false);
  const [showAuthPrompt, setShowAuthPrompt] = useState(false);
  const [selectedPose, setSelectedPose] = useState<string>('training');
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!config.showAIMediaGeneration || !config.aiMediaGeneration) {
    return (
      <div className="py-16 text-center">
        <h2 className="text-2xl font-bold text-white">Feature not available</h2>
        <a href="/" className="text-primary hover:underline mt-4 inline-block">
          Return to homepage
        </a>
      </div>
    );
  }

  const {aiMediaGeneration} = config;

  // Check authentication on component mount
  useEffect(() => {
    if (aiMediaGeneration.requiresAuth) {
      checkAuth();
    }
  }, []);

  const checkAuth = async () => {
    setIsLoadingAuth(true);
    try {
      const response = await fetch('/api/ai-media-generation/auth');
      const data = (await response.json()) as CustomerData;

      if (response.ok && data.customer) {
        setCustomerData(data);
        setUsageInfo(calculateUsageInfo(data.customer, aiMediaGeneration));
      } else {
        setShowAuthPrompt(true);
      }
    } catch (err) {
      console.error('Auth check failed:', err);
      setShowAuthPrompt(true);
    } finally {
      setIsLoadingAuth(false);
    }
  };

  const calculateUsageInfo = (
    customer: CustomerData['customer'],
    config: typeof aiMediaGeneration,
  ): UsageInfo => {
    if (!customer) {
      return {
        currentUsage: 0,
        limit: config.usageLimit,
        resetDate: new Date(),
        canGenerate: false,
      };
    }

    const usageMetafield = customer.metafields?.find(
      (m) => m.namespace === 'ai_generation' && m.key === 'monthly_usage',
    );
    const resetMetafield = customer.metafields?.find(
      (m) => m.namespace === 'ai_generation' && m.key === 'last_reset',
    );

    const currentUsage = usageMetafield
      ? parseInt(usageMetafield.value) || 0
      : 0;
    const lastReset = resetMetafield
      ? new Date(resetMetafield.value)
      : new Date(0);

    // Calculate next reset date based on period
    const now = new Date();
    let resetDate = new Date(lastReset);

    switch (config.resetPeriod) {
      case 'daily':
        resetDate.setDate(resetDate.getDate() + 1);
        break;
      case 'weekly':
        resetDate.setDate(resetDate.getDate() + 7);
        break;
      case 'monthly':
      default:
        resetDate.setMonth(resetDate.getMonth() + 1);
        break;
    }

    // Check if we need to reset usage
    const needsReset = now >= resetDate;
    const actualUsage = needsReset ? 0 : currentUsage;

    return {
      currentUsage: actualUsage,
      limit: config.usageLimit,
      resetDate: needsReset
        ? new Date(
            now.getTime() +
              (config.resetPeriod === 'daily'
                ? 24 * 60 * 60 * 1000
                : config.resetPeriod === 'weekly'
                  ? 7 * 24 * 60 * 60 * 1000
                  : 30 * 24 * 60 * 60 * 1000),
          )
        : resetDate,
      canGenerate: actualUsage < config.usageLimit,
    };
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file size
    if (file.size > aiMediaGeneration.maxFileSize * 1024 * 1024) {
      setError(
        `File size must be less than ${aiMediaGeneration.maxFileSize}MB`,
      );
      return;
    }

    // Validate file type
    const fileExtension = file.name.split('.').pop()?.toLowerCase();
    if (
      !fileExtension ||
      !aiMediaGeneration.allowedFormats.includes(fileExtension)
    ) {
      setError(
        `Only ${aiMediaGeneration.allowedFormats.join(', ')} files are allowed`,
      );
      return;
    }

    setError('');
    setSelectedFile(file);

    // Create preview URL
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
  };

  const handleGenerate = async () => {
    if (!selectedFile) {
      setError('Please select a photo first');
      return;
    }

    // Check usage limits
    if (usageInfo && !usageInfo.canGenerate) {
      setError(aiMediaGeneration.limitReachedMessage);
      return;
    }

    setIsGenerating(true);
    setError('');
    setCurrentTask({taskId: '', status: 'submitted'});

    try {
      // Convert file to base64
      const base64 = await fileToBase64(selectedFile);

      // Create task
      const response = await fetch('/api/ai-media-generation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userImage: base64,
          influencerImage: aiMediaGeneration.influencerReferenceImage,
          pose: selectedPose,
          productImage: selectedProduct,
        }),
      });

      const result = (await response.json()) as APIResponse;

      if (!response.ok) {
        throw new Error(result.message || 'Failed to create generation task');
      }

      // Start polling for results
      setCurrentTask({
        taskId: result.taskId,
        status: result.status as AITask['status'],
      });

      pollTaskStatus(result.taskId);
    } catch (err) {
      console.error('Generation failed:', err);
      setError(err instanceof Error ? err.message : 'Generation failed');
      setIsGenerating(false);
      setCurrentTask(null);
    }
  };

  const pollTaskStatus = async (taskId: string) => {
    let attempts = 0;
    const maxAttempts = 60; // 5 minutes max

    const poll = async () => {
      try {
        const response = await fetch(`/api/ai-media-generation/${taskId}`);
        const result = (await response.json()) as APIResponse;

        if (!response.ok) {
          throw new Error(result.message || 'Failed to check status');
        }

        setCurrentTask((prev) =>
          prev
            ? {
                ...prev,
                status: result.status as AITask['status'],
                resultUrl: result.resultUrl,
                error: result.error,
              }
            : null,
        );

        if (result.status === 'succeed' || result.status === 'failed') {
          setIsGenerating(false);
          return;
        }

        attempts++;
        if (attempts < maxAttempts) {
          setTimeout(poll, 5000); // Check every 5 seconds
        } else {
          setError('Generation timed out. Please try again.');
          setIsGenerating(false);
          setCurrentTask(null);
        }
      } catch (err) {
        console.error('Polling failed:', err);
        setError('Failed to check generation status');
        setIsGenerating(false);
        setCurrentTask(null);
      }
    };

    poll();
  };

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const result = reader.result as string;
        resolve(result.split(',')[1]); // Remove data:image/jpeg;base64, prefix
      };
      reader.onerror = (error) => reject(error);
    });
  };

  const handleDownload = () => {
    if (currentTask?.resultUrl) {
      const link = document.createElement('a');
      link.href = currentTask.resultUrl;
      link.download = `ai-generated-${Date.now()}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleShare = async () => {
    if (currentTask?.resultUrl && navigator.share) {
      try {
        await navigator.share({
          title: aiMediaGeneration.title,
          text:
            aiMediaGeneration.shareText ||
            `Check out my AI-generated photo with ${config.influencerName}!`,
          url: currentTask.resultUrl,
        });
      } catch (err) {
        console.log('Sharing failed:', err);
      }
    }
  };

  const reset = () => {
    setSelectedFile(null);
    setPreviewUrl('');
    setCurrentTask(null);
    setError('');
    setIsGenerating(false);
  };

  // Authentication Prompt - Consistent Height
  if (showAuthPrompt) {
    return (
      <section className="py-16 bg-secondary/80 backdrop-blur-sm min-h-[80vh] flex items-center">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-6">
              <a
                href="/"
                className="text-primary hover:text-primary-600 text-xs mb-4 flex items-center mx-auto bg-secondary/30 px-3 py-1 rounded-md border border-primary/10"
              >
                ← Back to Home
              </a>
            </div>
            <div className="bg-secondary/40 backdrop-blur-md border border-primary/20 rounded-lg p-6 shadow-md">
              <AuthPrompt
                title={aiMediaGeneration.loginPromptTitle}
                message={aiMediaGeneration.loginPromptMessage}
                returnUrl="/ai-photo-generator"
              />
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Upload Interface (authenticated users or no auth required) - Clean, Consistent Height
  return (
    <section className="py-16 bg-secondary/80 backdrop-blur-sm min-h-[80vh] flex items-center">
      <div className="container mx-auto px-4">
        <div className="text-center mb-6">
          <a
            href="/"
            className="text-primary hover:text-primary-600 text-xs mb-4 flex items-center mx-auto bg-secondary/30 px-3 py-1 rounded-md border border-primary/10"
          >
            ← Back to Home
          </a>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {aiMediaGeneration.title}
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            {aiMediaGeneration.description}
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Usage limit reached - Cleaner */}
          {usageInfo && !usageInfo.canGenerate ? (
            <div className="bg-secondary/40 backdrop-blur-md border border-red-500/30 rounded-lg p-8 text-center shadow-md">
              <div className="flex items-center justify-center mb-4">
                <div className="bg-red-500/10 p-3 rounded-full">
                  <Clock className="w-6 h-6 text-red-400" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                {aiMediaGeneration.limitReachedTitle}
              </h3>
              <p className="text-gray-300 mb-4">
                {aiMediaGeneration.limitReachedMessage}
              </p>
              <div className="bg-secondary/30 p-4 rounded-md border border-primary/10">
                <p className="text-gray-400 text-xs mb-2">
                  Usage:{' '}
                  <span className="text-primary font-bold">
                    {usageInfo.currentUsage}/{usageInfo.limit}
                  </span>{' '}
                  generations used
                </p>
                <p className="text-gray-400 text-xs">
                  Resets:{' '}
                  <span className="text-white">
                    {usageInfo.resetDate.toLocaleDateString()}
                  </span>
                </p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Left Column: Upload + Options */}
              <div className="space-y-4">
                {/* Upload Section */}
                <div className="bg-secondary/40 backdrop-blur-md border border-primary/20 rounded-lg p-6 shadow-md">
                  <h3 className="text-lg font-bold text-white mb-4 flex items-center">
                    <Upload className="w-4 h-4 text-primary mr-2" />
                    Upload Your Photo
                  </h3>

                  {!selectedFile ? (
                    <div
                      className="border border-dashed border-primary/30 rounded-md p-8 text-center cursor-pointer hover:border-primary/50 transition-colors"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <Upload className="w-8 h-8 text-primary mx-auto mb-3" />
                      <p className="text-white text-sm mb-2">
                        {aiMediaGeneration.placeholderText}
                      </p>
                      <p className="text-gray-400 text-xs">
                        Max {aiMediaGeneration.maxFileSize}MB •{' '}
                        {aiMediaGeneration.allowedFormats
                          .join(', ')
                          .toUpperCase()}
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <div className="relative rounded-md overflow-hidden border border-primary/20">
                        <img
                          src={previewUrl}
                          alt="Preview"
                          className="w-full h-48 object-cover"
                        />
                        <button
                          onClick={reset}
                          className="absolute top-2 right-2 bg-secondary/70 text-white p-1 rounded-md hover:bg-secondary/90 transition-colors"
                        >
                          ×
                        </button>
                      </div>
                      <p className="text-gray-300 text-xs">
                        {selectedFile.name}
                      </p>
                    </div>
                  )}

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept={aiMediaGeneration.allowedFormats
                      .map((format) => `.${format}`)
                      .join(',')}
                    onChange={handleFileSelect}
                    className="hidden"
                  />

                  {error && (
                    <div className="flex items-center mt-4 p-3 bg-red-500/10 border border-red-500/20 rounded-md">
                      <AlertCircle className="w-4 h-4 text-red-400 mr-2 flex-shrink-0" />
                      <p className="text-red-300 text-xs">{error}</p>
                    </div>
                  )}
                </div>

                {/* Pose Selection */}
                <div className="bg-secondary/40 backdrop-blur-md border border-primary/20 rounded-lg p-6 shadow-md">
                  <h3 className="text-lg font-bold text-white mb-4 flex items-center">
                    <Sparkles className="w-4 h-4 text-primary mr-2" />
                    Choose Your Pose
                  </h3>

                  <div className="grid grid-cols-2 gap-3">
                    {aiMediaGeneration.poseOptions.map((pose) => (
                      <div
                        key={pose.id}
                        className={`border rounded-md p-3 cursor-pointer transition-all ${
                          selectedPose === pose.id
                            ? 'border-primary bg-primary/10'
                            : 'border-gray-600/30 hover:border-primary/30'
                        }`}
                        onClick={() => setSelectedPose(pose.id)}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center">
                            {pose.id === 'heart' && (
                              <Heart className="w-3 h-3 text-primary mr-1" />
                            )}
                            {pose.id === 'try-on' && (
                              <Shirt className="w-3 h-3 text-primary mr-1" />
                            )}
                            <h4 className="text-white text-sm font-medium">
                              {pose.name}
                            </h4>
                          </div>
                          {selectedPose === pose.id && (
                            <CheckCircle className="w-4 h-4 text-primary" />
                          )}
                        </div>
                        <p className="text-gray-400 text-xs">
                          {pose.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Product Selection - Only visible when try-on is selected */}
                {selectedPose === 'try-on' && (
                  <div className="bg-secondary/40 backdrop-blur-md border border-primary/20 rounded-lg p-6 shadow-md">
                    <h3 className="text-lg font-bold text-white mb-4 flex items-center">
                      <ShoppingBag className="w-4 h-4 text-primary mr-2" />
                      Select Product to Try On
                    </h3>

                    <div className="grid grid-cols-2 gap-3">
                      {aiMediaGeneration.productOptions.map((product) => (
                        <div
                          key={product.id}
                          className={`border rounded-md overflow-hidden cursor-pointer transition-all ${
                            selectedProduct === product.id
                              ? 'border-primary'
                              : 'border-gray-600/30 hover:border-primary/30'
                          }`}
                          onClick={() => setSelectedProduct(product.id)}
                        >
                          <div className="bg-white p-2">
                            <img
                              src={product.imagePath}
                              alt={product.name}
                              className="w-full h-20 object-contain"
                            />
                          </div>
                          <div className="p-2">
                            <div className="flex items-center justify-between">
                              <h4 className="text-white text-xs">
                                {product.name}
                              </h4>
                              {selectedProduct === product.id && (
                                <CheckCircle className="w-3 h-3 text-primary" />
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <button
                  onClick={handleGenerate}
                  disabled={
                    !selectedFile ||
                    isGenerating ||
                    (selectedPose === 'try-on' && !selectedProduct)
                  }
                  className="w-full bg-primary hover:bg-primary-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-background font-bold py-3 px-4 rounded-md transition-colors flex items-center justify-center"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Camera className="w-4 h-4 mr-2" />
                      {aiMediaGeneration.buttonText}
                    </>
                  )}
                </button>

                {/* Usage Info for authenticated users - Minimal */}
                {usageInfo && (
                  <div className="bg-secondary/40 backdrop-blur-md border border-primary/20 rounded-md p-4">
                    <h4 className="text-sm font-bold text-white mb-3 flex items-center">
                      <Users className="w-3 h-3 text-primary mr-2" />
                      Your Usage
                    </h4>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300 text-xs">
                          Generations Used:
                        </span>
                        <span className="text-primary font-bold text-xs">
                          {usageInfo.currentUsage}/{usageInfo.limit}
                        </span>
                      </div>
                      <div className="w-full bg-secondary/60 rounded-full h-2 overflow-hidden">
                        <div
                          className="bg-primary h-2 rounded-full transition-all duration-300"
                          style={{
                            width: `${(usageInfo.currentUsage / usageInfo.limit) * 100}%`,
                          }}
                        ></div>
                      </div>
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-gray-400">Resets:</span>
                        <span className="text-white">
                          {usageInfo.resetDate.toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Result Section - Cleaner */}
              <div className="space-y-4">
                <div className="bg-secondary/40 backdrop-blur-md border border-primary/20 rounded-md p-6 shadow-md">
                  <h3 className="text-lg font-bold text-white mb-4 flex items-center">
                    <Sparkles className="w-4 h-4 text-primary mr-2" />
                    Your Result
                  </h3>

                  {!currentTask ? (
                    <div className="bg-secondary/30 rounded-md p-8 text-center border border-primary/10">
                      <Sparkles className="w-8 h-8 text-gray-500 mx-auto mb-3" />
                      <p className="text-gray-400 text-xs">
                        Your generated photo will appear here
                      </p>
                      {selectedPose === 'training' && (
                        <p className="text-primary text-xs mt-2">
                          Training with {config.influencerName}
                        </p>
                      )}
                      {selectedPose === 'hugging' && (
                        <p className="text-primary text-xs mt-2">
                          Meeting with {config.influencerName}
                        </p>
                      )}
                      {selectedPose === 'heart' && (
                        <p className="text-primary text-xs mt-2">
                          Fan moment with {config.influencerName}
                        </p>
                      )}
                      {selectedPose === 'try-on' && selectedProduct && (
                        <p className="text-primary text-xs mt-2">
                          Virtual try-on
                        </p>
                      )}
                    </div>
                  ) : currentTask.status === 'submitted' ||
                    currentTask.status === 'processing' ? (
                    <div className="bg-secondary/30 rounded-md p-8 text-center border border-primary/20">
                      <Loader2 className="w-8 h-8 text-primary mx-auto mb-3 animate-spin" />
                      <p className="text-white text-sm mb-2">
                        {aiMediaGeneration.processingMessage}
                      </p>
                      <p className="text-gray-400 text-xs">
                        This usually takes 1-3 minutes
                      </p>
                    </div>
                  ) : currentTask.status === 'succeed' &&
                    currentTask.resultUrl ? (
                    <div className="space-y-4">
                      <div className="relative rounded-md overflow-hidden border border-primary/30">
                        <img
                          src={currentTask.resultUrl}
                          alt="AI Generated Result"
                          className="w-full h-auto object-cover"
                        />
                        <div className="absolute top-2 left-2 bg-primary/80 px-2 py-1 rounded-md">
                          <p className="text-background text-xs font-bold">
                            AI GENERATED
                          </p>
                        </div>
                      </div>
                      <p className="text-green-400 text-xs flex items-center">
                        <CheckCircle className="w-3 h-3 mr-2" />
                        {aiMediaGeneration.successMessage}
                      </p>
                      <div className="flex gap-2">
                        <button
                          onClick={handleDownload}
                          className="flex-1 bg-primary hover:bg-primary-600 text-background font-bold py-2 px-3 rounded-md transition-colors flex items-center justify-center"
                        >
                          <Download className="w-4 h-4 mr-2" />
                          Download
                        </button>
                        <button
                          onClick={handleShare}
                          className="flex-1 bg-secondary/50 hover:bg-secondary/60 text-white border border-primary/20 font-bold py-2 px-3 rounded-md transition-colors flex items-center justify-center"
                        >
                          <Share2 className="w-4 h-4 mr-2" />
                          Share
                        </button>
                      </div>
                      <button
                        onClick={reset}
                        className="w-full bg-secondary/30 hover:bg-secondary/40 text-gray-300 hover:text-white border border-primary/10 py-2 px-3 rounded-md transition-colors"
                      >
                        Create Another
                      </button>
                    </div>
                  ) : currentTask.status === 'failed' ? (
                    <div className="bg-red-500/10 border border-red-500/30 rounded-md p-6 text-center">
                      <AlertCircle className="w-8 h-8 text-red-400 mx-auto mb-3" />
                      <p className="text-red-300 mb-4 text-xs">
                        {currentTask.error || 'Generation failed'}
                      </p>
                      <button
                        onClick={reset}
                        className="bg-primary hover:bg-primary-600 text-background font-bold py-2 px-4 rounded-md transition-colors"
                      >
                        Try Again
                      </button>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
