import React, { useState, useRef, useEffect } from 'react';
import { useLoaderData, useParams, type LoaderFunctionArgs } from 'react-router';
import { Upload, Type, Sliders, Download, Trash2, Save, Undo, Image, User, Sparkles, Loader2, Cloud, CloudDownload, ShoppingCart } from 'lucide-react';
import { Stage, Layer, Image as KonvaImage, Text, Transformer, Group } from 'react-konva';
import Konva from 'konva';
import { useConfig } from '~/utils/themeContext';
import { AuthPrompt } from '~/components/AuthPrompt';
import { ClientOnly } from '~/components/ClientOnly';
import { EnhancedProductDesigner, type ProductDesignerProps } from '~/components/EnhancedProductDesigner';
import { uploadCanvasToCloudinary, uploadFileToCloudinary, saveDesignToCloudinary } from '~/utils/cloudinaryUpload';
import { AddToCartButton } from '~/components/AddToCartButton';
import { ToastContainer, useToast } from '~/components/Toast';
import { 
  saveDesignToStorage, 
  updateDesignInStorage, 
  getDesignsForProduct, 
  getDesignFromStorage,
  deleteDesignFromStorage,
  createAutoSave,
  type StoredDesign 
} from '~/utils/designStorage';

// Custom type definitions for Konva
type StageType = Konva.Stage;
type TransformerType = Konva.Transformer;
type NodeType = Konva.Node;

// AI Generation Modal Component  
interface AIGenerationModalProps {
  showAIModal: boolean;
  setShowAIModal: (show: boolean) => void;
  aiGenerationType: 'fan-together' | 'image-edit' | 'logo-design';
  setAiGenerationType: (type: 'fan-together' | 'image-edit' | 'logo-design') => void;
  aiPrompt: string;
  setAiPrompt: (prompt: string) => void;
  aiNegativePrompt: string;
  setAiNegativePrompt: (prompt: string) => void;
  aiReferenceImage: string | null;
  setAiReferenceImage: (image: string | null) => void;
  aiUserImage: string | null;
  setAiUserImage: (image: string | null) => void;
  aiImageReference: 'subject' | 'face';
  setAiImageReference: (ref: 'subject' | 'face') => void;
  aiAspectRatio: string;
  setAiAspectRatio: (ratio: string) => void;
  aiNumberOfImages: number;
  setAiNumberOfImages: (num: number) => void;
  uploadedImages: { id: string, src: string, name: string }[];
  handleAIGeneration: () => void;
}

const AIGenerationModal: React.FC<AIGenerationModalProps> = ({
  showAIModal,
  setShowAIModal,
  aiGenerationType,
  setAiGenerationType,
  aiPrompt,
  setAiPrompt,
  aiNegativePrompt,
  setAiNegativePrompt,
  aiReferenceImage,
  setAiReferenceImage,
  aiUserImage,
  setAiUserImage,
  aiImageReference,
  setAiImageReference,
  aiAspectRatio,
  setAiAspectRatio,
  aiNumberOfImages,
  setAiNumberOfImages,
  uploadedImages,
  handleAIGeneration,
}) => {
  // Upload functions for AI modal
  const handleUserImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    
    const file = files[0];
    try {
      const uploadResult = await uploadFileToCloudinary(file, {
        folder: 'ai-user-images'
      });
      
      if (uploadResult.success && uploadResult.url) {
        setAiUserImage(uploadResult.url);
      }
    } catch (error) {
      console.error('Error uploading user image:', error);
    } finally {
      e.target.value = ''; // Reset input
    }
  };

  const handleTargetImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    
    const file = files[0];
    try {
      const uploadResult = await uploadFileToCloudinary(file, {
        folder: 'ai-target-images'
      });
      
      if (uploadResult.success && uploadResult.url) {
        setAiReferenceImage(uploadResult.url);
      }
    } catch (error) {
      console.error('Error uploading target image:', error);
    } finally {
      e.target.value = ''; // Reset input
    }
  };

  if (!showAIModal) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-secondary/95 backdrop-blur-md border border-primary/30 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white flex items-center">
              <Sparkles className="w-6 h-6 mr-2 text-primary" />
              AI Generation Studio
            </h2>
            <button
              onClick={() => setShowAIModal(false)}
              className="text-gray-400 hover:text-white text-xl font-bold w-8 h-8 flex items-center justify-center"
            >
              ✕
            </button>
          </div>

          {/* Generation Type Selection */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-white mb-3">Print Design Type</h3>
            <div className="grid grid-cols-1 gap-3">
              <button
                onClick={() => setAiGenerationType('fan-together')}
                className={`p-4 rounded-lg border transition-all ${
                  aiGenerationType === 'fan-together'
                    ? 'bg-primary/20 border-primary text-primary'
                    : 'bg-secondary/40 border-primary/20 text-white hover:border-primary/40'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className="text-2xl">🤝</div>
                  <div className="text-left">
                    <div className="font-semibold">Fan Together</div>
                    <div className="text-xs opacity-80">Upload your photo + someone/pet to be together in generated image</div>
                  </div>
                </div>
              </button>
              
              <button
                onClick={() => setAiGenerationType('image-edit')}
                className={`p-4 rounded-lg border transition-all ${
                  aiGenerationType === 'image-edit'
                    ? 'bg-primary/20 border-primary text-primary'
                    : 'bg-secondary/40 border-primary/20 text-white hover:border-primary/40'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className="text-2xl">✨</div>
                  <div className="text-left">
                    <div className="font-semibold">Image Edit</div>
                    <div className="text-xs opacity-80">Upload photo and modify/edit it based on prompt (theme, background, etc.)</div>
                  </div>
                </div>
              </button>
              
              <button
                onClick={() => setAiGenerationType('logo-design')}
                className={`p-4 rounded-lg border transition-all ${
                  aiGenerationType === 'logo-design'
                    ? 'bg-primary/20 border-primary text-primary'
                    : 'bg-secondary/40 border-primary/20 text-white hover:border-primary/40'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className="text-2xl">🎨</div>
                  <div className="text-left">
                    <div className="font-semibold">Logo & Design</div>
                    <div className="text-xs opacity-80">Generate logos, designs, artwork from text prompts (optional reference)</div>
                  </div>
                </div>
              </button>
            </div>
          </div>

          {/* Prompt Input */}
          <div className="mb-6">
            <label className="block text-white font-semibold mb-2">
              Prompt <span className="text-red-400">*</span>
            </label>
                          <textarea
                value={aiPrompt}
                onChange={(e) => setAiPrompt(e.target.value)}
                placeholder={
                  aiGenerationType === 'fan-together'
                    ? "Describe the scene where you want to be together (e.g., 'at a concert', 'playing in the park', 'training at the gym')..."
                    : aiGenerationType === 'image-edit'
                    ? "Describe how you want to modify the image (e.g., 'change background to beach', 'add sunset lighting', 'make it vintage style')..."
                    : "Describe the logo or design you want to create (e.g., 'modern logo with bold text', 'artistic pattern', 'sports team emblem')..."
                }
                className="w-full h-24 px-4 py-3 bg-secondary/80 border border-primary/20 rounded-lg text-white placeholder:text-gray-400 resize-none"
                maxLength={2500}
              />
            <div className="text-xs text-gray-400 mt-1">
              {aiPrompt.length}/2500 characters
            </div>
          </div>

          {/* Negative Prompt (for logo-design) */}
          {aiGenerationType === 'logo-design' && (
            <div className="mb-6">
              <label className="block text-white font-semibold mb-2">
                Negative Prompt (Optional)
              </label>
              <textarea
                value={aiNegativePrompt}
                onChange={(e) => setAiNegativePrompt(e.target.value)}
                placeholder="Describe what you don't want in the design (e.g., 'no text', 'no dark colors', 'not too complex')..."
                className="w-full h-20 px-4 py-3 bg-secondary/80 border border-primary/20 rounded-lg text-white placeholder:text-gray-400 resize-none"
                maxLength={2500}
              />
              <div className="text-xs text-gray-400 mt-1">
                {aiNegativePrompt.length}/2500 characters
              </div>
            </div>
          )}

          {/* Image Upload Section */}
          {aiGenerationType === 'fan-together' ? (
            <div className="mb-6 space-y-6">
              {/* Your Photo */}
              <div>
                <label className="block text-white font-semibold mb-3">
                  Your Photo <span className="text-red-400">*</span>
                </label>
                
                {/* Upload Options */}
                <div className="grid grid-cols-1 gap-4">
                  {/* Upload new photo */}
                  <div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleUserImageUpload}
                      className="hidden"
                      id="ai-user-upload"
                    />
                    <label
                      htmlFor="ai-user-upload"
                      className="block w-full p-4 border-2 border-dashed border-primary/30 rounded-lg cursor-pointer hover:border-primary/50 transition-colors text-center"
                    >
                      <Upload className="w-8 h-8 mx-auto mb-2 text-primary" />
                      <div className="text-white text-sm">Upload New Photo</div>
                      <div className="text-gray-400 text-xs">JPG, PNG up to 10MB</div>
                    </label>
                  </div>

                  {/* Choose from existing photos */}
                  {uploadedImages.length > 0 && (
                    <div>
                      <div className="text-white text-sm mb-2">Or choose from your uploaded photos:</div>
                      <div className="grid grid-cols-4 gap-2">
                        {uploadedImages.map((img) => (
                          <button
                            key={img.id}
                            onClick={() => setAiUserImage(img.src)}
                            className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                              aiUserImage === img.src
                                ? 'border-primary ring-2 ring-primary/50'
                                : 'border-primary/20 hover:border-primary/50'
                            }`}
                          >
                            <img 
                              src={img.src} 
                              alt={img.name}
                              className="w-full h-full object-cover"
                            />
                            {aiUserImage === img.src && (
                              <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
                                <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                                  <span className="text-background text-xs">✓</span>
                                </div>
                              </div>
                            )}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Selected user image preview */}
                  {aiUserImage && (
                    <div className="relative p-4 bg-green-600/20 border border-green-600/30 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <img
                            src={aiUserImage}
                            alt="Your photo"
                            className="w-12 h-12 object-cover rounded-lg"
                          />
                          <div>
                            <div className="text-green-400 text-sm font-semibold">✅ Your photo selected</div>
                            <div className="text-green-300 text-xs">Ready for generation</div>
                          </div>
                        </div>
                        <button
                          onClick={() => setAiUserImage(null)}
                          className="w-6 h-6 bg-red-600 text-white rounded-full text-xs hover:bg-red-700"
                        >
                          ✕
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Target Person/Pet Photo */}
              <div>
                <label className="block text-white font-semibold mb-3">
                  Target Person/Pet Photo <span className="text-red-400">*</span>
                </label>
                <div className="grid grid-cols-1 gap-4">
                  {/* Upload target photo */}
                  <div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleTargetImageUpload}
                      className="hidden"
                      id="ai-target-upload"
                    />
                    <label
                      htmlFor="ai-target-upload"
                      className="block w-full p-4 border-2 border-dashed border-primary/30 rounded-lg cursor-pointer hover:border-primary/50 transition-colors text-center"
                    >
                      <Cloud className="w-8 h-8 mx-auto mb-2 text-primary" />
                      <div className="text-white text-sm">Upload Target Photo</div>
                      <div className="text-gray-400 text-xs">Person/pet you want to be with</div>
                    </label>
                  </div>

                  {/* Target image preview */}
                  {aiReferenceImage && (
                    <div className="relative p-4 bg-green-600/20 border border-green-600/30 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <img
                            src={aiReferenceImage}
                            alt="Target"
                            className="w-12 h-12 object-cover rounded-lg"
                          />
                          <div>
                            <div className="text-green-400 text-sm font-semibold">✅ Target photo uploaded</div>
                            <div className="text-green-300 text-xs">Ready for generation</div>
                          </div>
                        </div>
                        <button
                          onClick={() => setAiReferenceImage(null)}
                          className="w-6 h-6 bg-red-600 text-white rounded-full text-xs hover:bg-red-700"
                        >
                          ✕
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            /* Other generation types */
            <div className="mb-6">
              <label className="block text-white font-semibold mb-3">
                {aiGenerationType === 'image-edit'
                  ? 'Base Image to Edit'
                  : 'Reference Image (Optional)'
                }
                {aiGenerationType === 'image-edit' && !aiReferenceImage && (
                  <span className="text-red-400"> - Required</span>
                )}
              </label>
              
              <div className="grid grid-cols-1 gap-4">
                {/* Upload new image */}
                <div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleTargetImageUpload}
                    className="hidden"
                    id="ai-reference-upload"
                  />
                  <label
                    htmlFor="ai-reference-upload"
                    className="block w-full p-4 border-2 border-dashed border-primary/30 rounded-lg cursor-pointer hover:border-primary/50 transition-colors text-center"
                  >
                    <Upload className="w-8 h-8 mx-auto mb-2 text-primary" />
                    <div className="text-white text-sm">Upload New Image</div>
                    <div className="text-gray-400 text-xs">JPG, PNG up to 10MB</div>
                  </label>
                </div>

                {/* Choose from existing photos */}
                {uploadedImages.length > 0 && (
                  <div>
                    <div className="text-white text-sm mb-2">Or choose from your uploaded photos:</div>
                    <div className="grid grid-cols-4 gap-2">
                      {uploadedImages.map((img) => (
                        <button
                          key={img.id}
                          onClick={() => setAiReferenceImage(img.src)}
                          className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                            aiReferenceImage === img.src
                              ? 'border-primary ring-2 ring-primary/50'
                              : 'border-primary/20 hover:border-primary/50'
                          }`}
                        >
                          <img 
                            src={img.src} 
                            alt={img.name}
                            className="w-full h-full object-cover"
                          />
                          {aiReferenceImage === img.src && (
                            <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
                              <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                                <span className="text-background text-xs">✓</span>
                              </div>
                            </div>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Selected image preview */}
                {aiReferenceImage && (
                  <div className="relative p-4 bg-green-600/20 border border-green-600/30 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <img
                          src={aiReferenceImage}
                          alt="Reference"
                          className="w-12 h-12 object-cover rounded-lg"
                        />
                        <div>
                          <div className="text-green-400 text-sm font-semibold">✅ Image selected</div>
                          <div className="text-green-300 text-xs">Ready for generation</div>
                        </div>
                      </div>
                      <button
                        onClick={() => setAiReferenceImage(null)}
                        className="w-6 h-6 bg-red-600 text-white rounded-full text-xs hover:bg-red-700"
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Generation Settings */}
          <div className="mb-6">
            {/* Fan Together Settings */}
            {aiGenerationType === 'fan-together' && aiReferenceImage && (
              <div className="mb-6">
                <label className="block text-white font-semibold mb-2">
                  Reference Type
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setAiImageReference('subject')}
                    className={`p-3 rounded-lg border transition-all ${
                      aiImageReference === 'subject'
                        ? 'bg-primary/20 border-primary text-primary'
                        : 'bg-secondary/40 border-primary/20 text-white hover:border-primary/40'
                    }`}
                  >
                    <div className="text-sm font-semibold">Full Character</div>
                    <div className="text-xs opacity-80">Use overall appearance and style</div>
                  </button>
                  <button
                    onClick={() => setAiImageReference('face')}
                    className={`p-3 rounded-lg border transition-all ${
                      aiImageReference === 'face'
                        ? 'bg-primary/20 border-primary text-primary'
                        : 'bg-secondary/40 border-primary/20 text-white hover:border-primary/40'
                    }`}
                  >
                    <div className="text-sm font-semibold">Face Only</div>
                    <div className="text-xs opacity-80">Use facial features only</div>
                  </button>
                </div>
              </div>
            )}

            {/* Common Settings */}
            <div className="grid grid-cols-2 gap-4">
              {/* Aspect Ratio */}
              <div>
                <label className="block text-white font-semibold mb-2">Aspect Ratio</label>
                <select
                  value={aiAspectRatio}
                  onChange={(e) => setAiAspectRatio(e.target.value)}
                  className="w-full px-4 py-3 bg-secondary/80 border border-primary/20 rounded-lg text-white"
                >
                  <option value="1:1">Square (1:1)</option>
                  <option value="16:9">Landscape (16:9)</option>
                  <option value="9:16">Portrait (9:16)</option>
                  <option value="4:3">Standard (4:3)</option>
                  <option value="3:4">Photo (3:4)</option>
                </select>
              </div>

              {/* Number of Images */}
              <div>
                <label className="block text-white font-semibold mb-2">
                  Images: {aiNumberOfImages}
                </label>
                <input
                  type="range"
                  min="1"
                  max="4"
                  value={aiNumberOfImages}
                  onChange={(e) => setAiNumberOfImages(Number(e.target.value))}
                  className="w-full mt-3"
                />
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                  <span>1</span>
                  <span>2</span>
                  <span>3</span>
                  <span>4</span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4">
            <button
              onClick={() => setShowAIModal(false)}
              className="flex-1 bg-secondary hover:bg-secondary/80 text-white border border-primary/20 py-3 px-6 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleAIGeneration}
              disabled={
                !aiPrompt.trim() || 
                (aiGenerationType === 'fan-together' && (!aiUserImage || !aiReferenceImage)) ||
                (aiGenerationType === 'image-edit' && !aiReferenceImage)
              }
              className="flex-1 bg-primary hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed text-background font-bold py-3 px-6 rounded-lg transition-colors"
            >
              Generate Print Design
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

interface CustomElement {
  id: string;
  type: 'image' | 'text';
  x: number;
  y: number;
  width?: number;
  height?: number;
  rotation: number;
  scaleX: number;
  scaleY: number;
  text?: string;
  fontSize?: number;
  fontFamily?: string;
  fill?: string;
  opacity: number;
  src?: string;
  selected: boolean;
  zIndex: number;
}

interface CustomizationData {
  elements: CustomElement[];
  productId: string;
  variantId: string;
  backgroundImage: string;
}

interface AIGenerationResponse {
  taskId: string;
  status: string;
  message?: string;
}

interface AIStatusResponse {
  taskId: string;
  status: string;
  resultUrl?: string;
  resultUrls?: string[]; // For multiple images
  error?: string;
  message?: string;
}

interface ProductVariant {
  id: string;
  title: string;
  availableForSale: boolean;
  price: {
    amount: string;
    currencyCode: string;
  };
  compareAtPrice?: {
    amount: string;
    currencyCode: string;
  } | null;
  image?: {
    url: string;
    altText?: string;
    width?: number;
    height?: number;
  } | null;
}

interface Product {
  id: string;
  title: string;
  description: string;
  images: {
    nodes: Array<{
      url: string;
      altText?: string;
      width?: number;
      height?: number;
    }>;
  };
  variants: {
    nodes: ProductVariant[];
  };
}

interface LoaderData {
  product: Product;
  customVariant: ProductVariant;
  isOutOfStock: boolean;
  isLoggedIn: boolean;
  customer?: any;
}

// Loader function to fetch product data
export async function loader({ params, context }: LoaderFunctionArgs) {
  const { productHandle } = params;

  if (!productHandle) {
    throw new Response('Product not found', { status: 404 });
  }

  const { product } = await context.storefront.query(PRODUCT_QUERY, {
    variables: {
      handle: productHandle,
    },
  });

  if (!product?.id) {
    throw new Response('Product not found', { status: 404 });
  }

  // Find custom variant if it exists - using safer checks
  const customVariant = product.variants.nodes.find(
    (variant: any) => variant?.title?.toLowerCase?.() === 'custom'
  );

  if (!customVariant) {
    throw new Response('This product does not support customization', { status: 404 });
  }

  // Check authentication status
  let isLoggedIn = false;
  let customer = null;
  
  try {
    isLoggedIn = await context.customerAccount.isLoggedIn();
    if (isLoggedIn) {
      // Get customer data if logged in
      const { data } = await context.customerAccount.query(`
        query CustomerInfo {
          customer {
            id
            firstName
            lastName
            email
          }
        }
      `);
      customer = data?.customer;
    }
  } catch (error) {
    console.log('Auth check failed:', error);
    // Continue without auth - will show login prompt when needed
  }

  return new Response(JSON.stringify({ 
    product,
    customVariant,
    isOutOfStock: !customVariant.availableForSale,
    isLoggedIn,
    customer
  }), { 
    headers: { 'Content-Type': 'application/json' }
  });
}

export default function ProductCustomizer() {
  const { product, customVariant, isOutOfStock, isLoggedIn, customer } = useLoaderData<LoaderData>();
  const config = useConfig();
  const params = useParams();
  const { toasts, removeToast, showSuccess, showError, showWarning, showInfo } = useToast();
  
  // Debug customVariant and auth
  console.log('ProductCustomizer loaded:', {
    customVariant: {
      id: customVariant.id,
      title: customVariant.title,
      availableForSale: customVariant.availableForSale,
      price: customVariant.price,
      isOutOfStock
    },
    auth: {
      isLoggedIn,
      customer: customer ? { id: customer.id, firstName: customer.firstName, email: customer.email } : null
    }
  });
  const stageRef = useRef<StageType | null>(null);
  const transformerRef = useRef<TransformerType | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [elements, setElements] = useState<CustomElement[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [uploadedImages, setUploadedImages] = useState<{ id: string, src: string, name: string }[]>([]);
  const [stageSize, setStageSize] = useState({ width: 500, height: 500 });
  const [backgroundImage, setBackgroundImage] = useState<HTMLImageElement | null>(null);
  const [showAIPrompt, setShowAIPrompt] = useState(false);
  const [showAIModal, setShowAIModal] = useState(false);
  const [isAIGenerating, setIsAIGenerating] = useState(false);
  const [aiPrompt, setAiPrompt] = useState('');
  const [aiNegativePrompt, setAiNegativePrompt] = useState('');
  const [aiGenerationType, setAiGenerationType] = useState<'fan-together' | 'image-edit' | 'logo-design'>('fan-together');
  const [aiReferenceImage, setAiReferenceImage] = useState<string | null>(null);
  const [aiUserImage, setAiUserImage] = useState<string | null>(null);
  const [aiImageReference, setAiImageReference] = useState<'subject' | 'face'>('subject');
  const [aiAspectRatio, setAiAspectRatio] = useState('1:1');
  const [aiNumberOfImages, setAiNumberOfImages] = useState(1);
  const [showTextControls, setShowTextControls] = useState(false);
  const [textInput, setTextInput] = useState('');
  const [selectedColor, setSelectedColor] = useState('#ffffff');
  const [selectedFont, setSelectedFont] = useState('Arial');
  const [fontSize, setFontSize] = useState(24);
  const [history, setHistory] = useState<CustomElement[][]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [keepAspectRatio, setKeepAspectRatio] = useState(true);
  const [finalDesignImage, setFinalDesignImage] = useState<string | null>(null);
  const [isCapturingDesign, setIsCapturingDesign] = useState(false);
  
  // Local storage state
  const [savedDesigns, setSavedDesigns] = useState<StoredDesign[]>([]);
  const [currentDesignId, setCurrentDesignId] = useState<string | null>(null);
  const [showSavedDesigns, setShowSavedDesigns] = useState(false);
  const [autoSaveEnabled, setAutoSaveEnabled] = useState(true);

  // Load product image
  useEffect(() => {
    if (customVariant && customVariant.image?.url) {
      const img = new window.Image();
      img.crossOrigin = 'anonymous'; // Fix for tainted canvas issue
      img.onload = () => {
        setBackgroundImage(img);
        // Adjust stage size based on image dimensions
        const containerWidth = Math.min(window.innerWidth - 40, 600);
        const scale = containerWidth / img.width;
        setStageSize({
          width: containerWidth,
          height: img.height * scale
        });
      };
      img.onerror = () => {
        console.warn('Failed to load image with CORS, trying without crossOrigin');
        // Fallback: try loading without crossOrigin (won't be exportable but will display)
        const fallbackImg = new window.Image();
        fallbackImg.onload = () => {
          setBackgroundImage(fallbackImg);
          const containerWidth = Math.min(window.innerWidth - 40, 600);
          const scale = containerWidth / fallbackImg.width;
          setStageSize({
            width: containerWidth,
            height: fallbackImg.height * scale
          });
        };
        if (customVariant?.image?.url) {
          fallbackImg.src = customVariant.image.url;
        }
      };
      img.src = customVariant.image.url;
    }
  }, [customVariant]);

  // Update transformer when selection changes
  useEffect(() => {
    if (transformerRef.current && stageRef.current) {
      const transformer = transformerRef.current;
      const selectedNode = stageRef.current.findOne('#' + selectedId);
      
      if (selectedNode) {
        transformer.nodes([selectedNode as NodeType]);
        transformer.getLayer()?.batchDraw();
      } else {
        transformer.nodes([]);
        transformer.getLayer()?.batchDraw();
      }
    }
  }, [selectedId]);

  // Save state to history when elements change
  useEffect(() => {
    if (elements.length > 0) {
      setHistory(prev => [...prev, [...elements]]);
    }
  }, [elements]);

  // Load saved designs on mount
  useEffect(() => {
    if (product?.id) {
      const designs = getDesignsForProduct(product.id);
      setSavedDesigns(designs);
      
      // Auto-load the most recent design if available
      if (designs.length > 0 && elements.length === 0) {
        const mostRecent = designs[0];
        loadDesignFromStorage(mostRecent.id);
      }
    }
  }, [product?.id]);

  // Set up auto-save
  useEffect(() => {
    if (!product || !customVariant || !autoSaveEnabled) return;

    const getCurrentDesignState = () => ({
      productId: product.id,
      variantId: customVariant.id,
      productTitle: product.title,
      elements,
      uploadedImages,
      stageSize,
      backgroundImage: customVariant.image?.url || '',
    });

    const autoSave = createAutoSave(getCurrentDesignState, 15000); // Auto-save every 15 seconds
    
    // Only start auto-save if there are elements or uploaded images
    if (elements.length > 0 || uploadedImages.length > 0) {
      autoSave.start();
      if (currentDesignId) {
        autoSave.setDesignId(currentDesignId);
      }
    }

    return () => {
      autoSave.stop();
    };
  }, [product, customVariant, elements, uploadedImages, stageSize, currentDesignId, autoSaveEnabled]);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    
    const file = files[0];
    setIsUploading(true);
    
    try {
      // Upload to Cloudinary
      const uploadResult = await uploadFileToCloudinary(file, {
        folder: 'user-uploads'
      });
      
      if (uploadResult.success && uploadResult.url) {
        const newImage = {
          id: `image-${Date.now()}`,
          src: uploadResult.url,
          name: file.name
        };
        
        // Add to uploaded images gallery
        setUploadedImages(prev => [...prev, newImage]);
        
        // Automatically add the uploaded image to the canvas in the center
        addImageToCanvas(uploadResult.url);
      } else {
        console.error('Failed to upload image:', uploadResult.error);
        showError('Failed to upload image. Please try again.');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      showError('Failed to upload image. Please try again.');
    } finally {
      setIsUploading(false);
      e.target.value = ''; // Reset input
    }
  };

  const addImageToCanvas = (src: string) => {
    const img = new window.Image();
    img.src = src;
    img.onload = () => {
      // Calculate scaled dimensions to fit stage
      const maxDim = Math.min(stageSize.width, stageSize.height) * 0.5;
      const scale = img.width > img.height 
        ? maxDim / img.width 
        : maxDim / img.height;
      
      // Calculate scaled image dimensions
      const scaledWidth = img.width * scale;
      const scaledHeight = img.height * scale;
      
      // Position image so its center is at the center of the stage
      const centerX = stageSize.width / 2;
      const centerY = stageSize.height / 2;
      
      const newElement: CustomElement = {
        id: `canvas-image-${Date.now()}`,
        type: 'image',
        x: centerX - (scaledWidth / 2),
        y: centerY - (scaledHeight / 2),
        width: img.width,
        height: img.height,
        scaleX: scale,
        scaleY: scale,
        rotation: 0,
        src,
        opacity: 1,
        selected: true,
        zIndex: elements.length // New elements get higher z-index
      };
      
      // Deselect others and select the new element
      setElements(prev => 
        prev.map(el => ({ ...el, selected: false })).concat(newElement)
      );
      setSelectedId(newElement.id);
      addToHistory();
    };
  };

  const addTextToCanvas = () => {
    if (!textInput.trim()) return;
    
    const newElement: CustomElement = {
      id: `canvas-text-${Date.now()}`,
      type: 'text',
      x: stageSize.width / 2,
      y: stageSize.height / 2,
      scaleX: 1,
      scaleY: 1,
      rotation: 0,
      text: textInput,
      fontSize,
      fontFamily: selectedFont,
      fill: selectedColor,
      opacity: 1,
      selected: true,
      zIndex: elements.length // New elements get higher z-index
    };
    
    // Deselect others and select the new element
    setElements(prev => 
      prev.map(el => ({ ...el, selected: false })).concat(newElement)
    );
    setSelectedId(newElement.id);
    setTextInput('');
    setShowTextControls(false);
    addToHistory();
  };

  const handleElementSelect = (id: string) => {
    setSelectedId(id);
    setElements(prev => 
      prev.map(el => ({
        ...el,
        selected: el.id === id
      }))
    );
  };

  const handleTransform = (nodeId: string, newAttrs: Partial<CustomElement>) => {
    setElements(prev => 
      prev.map(el => 
        el.id === nodeId ? { ...el, ...newAttrs } : el
      )
    );
  };

  const deleteSelectedElement = () => {
    if (!selectedId) return;
    
    setElements(prev => prev.filter(el => el.id !== selectedId));
    setSelectedId(null);
    addToHistory();
  };

  const bringForward = () => {
    if (!selectedId) return;
    
    setElements(prev => {
      const elementIndex = prev.findIndex(el => el.id === selectedId);
      if (elementIndex === -1) return prev;
      
      const element = prev[elementIndex];
      const maxZIndex = Math.max(...prev.map(el => el.zIndex));
      
      if (element.zIndex < maxZIndex) {
        const newElements = [...prev];
        newElements[elementIndex] = { ...element, zIndex: element.zIndex + 1 };
        
        // Swap z-index with the element that was at zIndex + 1
        const swapIndex = newElements.findIndex(el => el.zIndex === element.zIndex + 1 && el.id !== selectedId);
        if (swapIndex !== -1) {
          newElements[swapIndex] = { ...newElements[swapIndex], zIndex: element.zIndex };
        }
        
        return newElements;
      }
      
      return prev;
    });
    addToHistory();
  };

  const sendBackward = () => {
    if (!selectedId) return;
    
    setElements(prev => {
      const elementIndex = prev.findIndex(el => el.id === selectedId);
      if (elementIndex === -1) return prev;
      
      const element = prev[elementIndex];
      const minZIndex = Math.min(...prev.map(el => el.zIndex));
      
      if (element.zIndex > minZIndex) {
        const newElements = [...prev];
        newElements[elementIndex] = { ...element, zIndex: element.zIndex - 1 };
        
        // Swap z-index with the element that was at zIndex - 1
        const swapIndex = newElements.findIndex(el => el.zIndex === element.zIndex - 1 && el.id !== selectedId);
        if (swapIndex !== -1) {
          newElements[swapIndex] = { ...newElements[swapIndex], zIndex: element.zIndex };
        }
        
        return newElements;
      }
      
      return prev;
    });
    addToHistory();
  };

  const clearCanvas = () => {
    setElements([]);
    setSelectedId(null);
    addToHistory();
  };

  const addToHistory = () => {
    setHistory(prev => [...prev, [...elements]]);
  };

  const undo = () => {
    if (history.length > 1) {
      const newHistory = [...history];
      newHistory.pop(); // Remove current state
      const previousState = newHistory[newHistory.length - 1];
      setElements(previousState);
      setHistory(newHistory);
      setSelectedId(null);
    }
  };

  const captureDesignForCart = async () => {
    setIsCapturingDesign(true);
    
    try {
      // Set up the global function to handle the captured canvas data
      (window as any).handleDesignCapture = async (dataURL: string) => {
        try {
          setFinalDesignImage(dataURL);
          console.log('Design captured for cart');
        } catch (error) {
          console.error('Error capturing design for cart:', error);
        } finally {
          setIsCapturingDesign(false);
        }
      };

      // Set up error handler for capture failures
      (window as any).handleDesignCaptureError = (error: any) => {
        console.error('Design capture failed:', error);
        showError('Failed to capture design. This may be due to image loading issues. Please try refreshing the page and re-uploading your images.');
        setIsCapturingDesign(false);
      };

      // Trigger the capture in ProductDesigner
      const event = new CustomEvent('capture-design');
      window.dispatchEvent(event);
    } catch (error) {
      console.error('Error initiating design capture:', error);
      setIsCapturingDesign(false);
    }
  };



  const loadDesignFromStorage = (designId: string) => {
    try {
      const design = getDesignFromStorage(designId);
      if (!design) {
        console.error('Design not found:', designId);
        return;
      }

      // Migrate old designs that don't have zIndex
      const migratedElements = (design.elements || []).map((element: any, index: number) => ({
        ...element,
        zIndex: element.zIndex !== undefined ? element.zIndex : index
      }));

      // Load design state
      setElements(migratedElements);
      setUploadedImages(design.uploadedImages || []);
      setStageSize(design.stageSize || stageSize);
      setCurrentDesignId(designId);
      setSelectedId(null);

      console.log('Design loaded from localStorage:', design.id);
    } catch (error) {
      console.error('Error loading design:', error);
    }
  };

  const saveCurrentDesignLocally = () => {
    try {
      if (!product || !customVariant) return;

      const designData = {
        productId: product.id,
        variantId: customVariant.id,
        productTitle: product.title,
        elements,
        uploadedImages,
        stageSize,
        backgroundImage: customVariant.image?.url || '',
      };

      let designId: string;
      if (currentDesignId) {
        updateDesignInStorage(currentDesignId, designData);
        designId = currentDesignId;
      } else {
        designId = saveDesignToStorage(designData);
        setCurrentDesignId(designId);
      }

      // Refresh saved designs list
      const designs = getDesignsForProduct(product.id);
      setSavedDesigns(designs);

      console.log('Design saved locally:', designId);
    } catch (error) {
      console.error('Error saving design locally:', error);
    }
  };

  const deleteDesign = (designId: string) => {
    try {
      deleteDesignFromStorage(designId);
      
      // Refresh saved designs list
      if (product?.id) {
        const designs = getDesignsForProduct(product.id);
        setSavedDesigns(designs);
      }
      
      // Clear current design if it was deleted
      if (currentDesignId === designId) {
        setCurrentDesignId(null);
      }
      
      console.log('Design deleted:', designId);
    } catch (error) {
      console.error('Error deleting design:', error);
    }
  };

  const generateWithAI = () => {
    // TESTING: Skip authentication check for now
    console.log('🧪 TESTING MODE: Skipping authentication check');
    
    // TODO: Re-enable for production
    // if (!isLoggedIn) {
    //   setShowAIPrompt(true);
    //   return;
    // }

    // Open the AI generation modal
    setShowAIModal(true);
  };

  const handleAIGeneration = async () => {
    if (!aiPrompt.trim()) {
      showError('Please enter a prompt for AI generation.');
      return;
    }

    // Check if required images are provided
    if (aiGenerationType === 'fan-together') {
      if (!aiUserImage) {
        showError('Please select or upload your photo first.');
        return;
      }
      if (!aiReferenceImage) {
        showError('Please upload the target person/pet photo.');
        return;
      }
    } else if (aiGenerationType === 'image-edit' && !aiReferenceImage) {
      showError('Please select or upload a base image to edit.');
      return;
    }

    setIsAIGenerating(true);
    setShowAIModal(false);
    
    try {
      let requestBody: any = {
        generationType: aiGenerationType,
        prompt: aiPrompt,
        negativePrompt: aiNegativePrompt || undefined,
        aspectRatio: aiAspectRatio,
        numberOfImages: aiNumberOfImages,
      };

      if (aiGenerationType === 'fan-together') {
        // For fan together, we need user image and target image
        if (aiUserImage) {
          requestBody.userImageUrl = aiUserImage;
        }
        
        // Target person/pet image
        if (aiReferenceImage) {
          requestBody.referenceImageUrl = aiReferenceImage;
          requestBody.imageReference = aiImageReference;
        }
      } else if (aiGenerationType === 'image-edit') {
        // For image editing, use the selected image as base
        if (aiReferenceImage) {
          requestBody.baseImageUrl = aiReferenceImage;
        }
      } else {
        // For logo design, include reference image if provided
        if (aiReferenceImage) {
          requestBody.referenceImageUrl = aiReferenceImage;
          requestBody.imageReference = aiImageReference;
        }
      }

      // Make the API call to generate AI content
      const aiResponse = await fetch('/api/ai-media-generation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      const aiResult = await aiResponse.json() as AIGenerationResponse;
      
      if (!aiResponse.ok) {
        throw new Error(aiResult.message || 'Failed to create AI generation task');
      }

      // Start polling for the result
      const pollForResult = async (taskId: string) => {
        const maxAttempts = 60; // 5 minutes max
        let attempts = 0;
        
        const poll = async (): Promise<void> => {
          try {
            const statusResponse = await fetch(`/api/ai-media-generation/${taskId}`);
            const statusResult = await statusResponse.json() as AIStatusResponse;
            
            if (!statusResponse.ok) {
              throw new Error(statusResult.message || 'Failed to check status');
            }

            if (statusResult.status === 'succeed' && (statusResult.resultUrl || statusResult.resultUrls)) {
              // Handle multiple images if available
              if (statusResult.resultUrls && statusResult.resultUrls.length > 1) {
                // Add all generated images to the canvas
                statusResult.resultUrls.forEach((url, index) => {
                  setTimeout(() => addImageToCanvas(url), index * 500); // Stagger the additions
                });
                showSuccess(`Print design complete! ${statusResult.resultUrls.length} images have been added to your design.`);
              } else {
                // Single image
                addImageToCanvas(statusResult.resultUrl!);
                showSuccess(`Print design complete! The generated image has been added to your design.`);
              }
              setIsAIGenerating(false);
              return;
            } else if (statusResult.status === 'failed') {
              throw new Error(statusResult.error || 'AI generation failed');
            } else if (statusResult.status === 'processing' || statusResult.status === 'submitted') {
             attempts++;
             if (attempts < maxAttempts) {
               setTimeout(poll, 5000); // Check every 5 seconds
             } else {
               throw new Error('AI generation timed out. Please try again.');
             }
           }
         } catch (error) {
           console.error('Polling failed:', error);
           showError(`AI generation failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
           setIsAIGenerating(false);
         }
        };

        poll();
      };

      // Show progress message
      showInfo(`Print design generation started! This usually takes 1-3 minutes. The generated image will be automatically added to your design when ready.`);
      
      // Start polling
      pollForResult(aiResult.taskId);
      
    } catch (error) {
      console.error('AI generation failed:', error);
      showError(`AI generation failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
      setIsAIGenerating(false);
    }
  };



  // Handle click outside elements to deselect
  const checkDeselect = (e: any) => {
    // Clicked on empty area of the stage
    if (e.target === e.target.getStage()) {
      setSelectedId(null);
      setElements(prev => prev.map(el => ({ ...el, selected: false })));
    }
  };

  // Render fallback while canvas is loading
  const renderCanvasLoading = () => (
    <div 
      className="w-full h-full flex items-center justify-center bg-secondary/60 rounded-md border border-primary/10" 
      style={{ minHeight: '400px' }}
    >
      <div className="text-center p-4">
        <Loader2 className="w-10 h-10 text-primary mx-auto mb-4 animate-spin" />
        <p className="text-white">Loading design editor...</p>
      </div>
    </div>
  );

  // Show out of stock message if the custom variant is not available
  if (isOutOfStock) {
    return (
      <div className="pt-30 pb-10 bg-secondary/80 backdrop-blur-sm min-h-screen">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <a 
              href={`/products/${params.productHandle}`}
              className="text-primary hover:text-primary-600 text-xs mb-4 flex items-center mx-auto bg-secondary/30 px-3 py-1 rounded-md border border-primary/10"
            >
              ← Back to Product
            </a>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              {product.title} - Customization
            </h1>
          </div>
          
          <div className="max-w-2xl mx-auto">
            <div className="bg-red-600/20 border border-red-600/30 rounded-lg p-8 shadow-md text-center">
              <div className="w-16 h-16 bg-red-600/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-red-400 text-2xl">⚠️</span>
              </div>
              <h2 className="text-2xl font-bold text-red-400 mb-4">
                Out of Stock
              </h2>
              <p className="text-gray-300 mb-6">
                This product is currently out of stock and cannot be customized at this time.
              </p>
              <p className="text-gray-400 text-sm mb-6">
                Please check back later or browse our other available products.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href={`/products/${params.productHandle}`}
                  className="bg-secondary hover:bg-secondary/80 text-white border border-primary/20 py-3 px-6 rounded-md transition-colors"
                >
                  View Product Details
                </a>
                <a
                  href="/collections/all"
                  className="bg-primary hover:bg-primary-600 text-background font-bold py-3 px-6 rounded-md transition-colors"
                >
                  Browse Other Products
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (showAIPrompt) {
    return (
      <section className="pt-30 pb-16 bg-secondary/80 backdrop-blur-sm min-h-[80vh] flex items-center">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-6">
              <button 
                onClick={() => setShowAIPrompt(false)}
                className="text-primary hover:text-primary-600 text-xs mb-4 flex items-center mx-auto bg-secondary/30 px-3 py-1 rounded-md border border-primary/10"
              >
                ← Back to Editor
              </button>
            </div>
            <AuthPrompt
              title="Sign In Required for AI Generation"
              message={`Sign in to generate AI customized products with ${config.influencerName}.`}
              returnUrl={`/customize-product/${params.productHandle}`}
            />
          </div>
        </div>
      </section>
    );
  }



  return (
    <div className="pt-30 pb-10 bg-secondary/80 backdrop-blur-sm min-h-screen">
      {/* Toast Notifications */}
      <ToastContainer toasts={toasts} removeToast={removeToast} />
      
      {/* AI Generation Modal */}
      <AIGenerationModal 
        showAIModal={showAIModal}
        setShowAIModal={setShowAIModal}
        aiGenerationType={aiGenerationType}
        setAiGenerationType={setAiGenerationType}
        aiPrompt={aiPrompt}
        setAiPrompt={setAiPrompt}
        aiNegativePrompt={aiNegativePrompt}
        setAiNegativePrompt={setAiNegativePrompt}
        aiReferenceImage={aiReferenceImage}
        setAiReferenceImage={setAiReferenceImage}
        aiUserImage={aiUserImage}
        setAiUserImage={setAiUserImage}
        aiImageReference={aiImageReference}
        setAiImageReference={setAiImageReference}
        aiAspectRatio={aiAspectRatio}
        setAiAspectRatio={setAiAspectRatio}
        aiNumberOfImages={aiNumberOfImages}
        setAiNumberOfImages={setAiNumberOfImages}
        uploadedImages={uploadedImages}
        handleAIGeneration={handleAIGeneration}
      />
      
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <a 
            href={`/products/${params.productHandle}`}
            className="text-primary hover:text-primary-600 text-xs mb-4 flex items-center mx-auto bg-secondary/30 px-3 py-1 rounded-md border border-primary/10"
          >
            ← Back to Product
          </a>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            Customize Your {product.title}
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto mb-4">
            Add your photos, text, and designs to create a unique custom product.
          </p>
          
          {/* Authentication Status */}
          {isLoggedIn && customer && (
            <div className="bg-green-600/20 border border-green-600/30 rounded-lg px-4 py-2 mx-auto mb-6 max-w-md">
              <p className="text-green-400 text-sm text-center">
                ✅ Logged in as <strong>{customer.firstName || customer.email}</strong> - AI features available!
              </p>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Simplified Sidebar */}
          <div className="lg:col-span-1 space-y-4">
            {/* Quick Add Section */}
            <div className="bg-secondary/40 backdrop-blur-md border border-primary/20 rounded-lg p-4 shadow-md">
              <div className="grid grid-cols-2 gap-3 mb-4">
                {/* Upload Button - More prominent */}
                <button 
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isUploading}
                  className="bg-primary hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed text-background font-bold py-3 px-3 rounded-lg transition-colors flex flex-col items-center justify-center h-20"
                >
                  {isUploading ? (
                    <>
                      <Loader2 className="w-5 h-5 mb-1 animate-spin" />
                      <span className="text-xs">Uploading...</span>
                    </>
                  ) : (
                    <>
                      <Upload className="w-5 h-5 mb-1" />
                      <span className="text-xs">Add Photo</span>
                    </>
                  )}
                </button>

                {/* Text Button */}
                <button 
                  onClick={() => setShowTextControls(true)}
                  className="bg-secondary hover:bg-secondary/60 text-white border border-primary/20 py-3 px-3 rounded-lg transition-colors flex flex-col items-center justify-center h-20"
                >
                  <Type className="w-5 h-5 mb-1" />
                  <span className="text-xs">Add Text</span>
                </button>
              </div>

              {/* AI Generation */}
              <button 
                onClick={generateWithAI}
                disabled={isAIGenerating}
                className="w-full bg-gradient-to-r from-purple-600 to-primary hover:from-purple-700 hover:to-primary-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3 px-4 rounded-lg transition-colors flex items-center justify-center"
              >
                {isAIGenerating ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 mr-2" />
                    AI Generation Studio ✨
                  </>
                )}
              </button>
              
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />

              {/* Simple Text Controls */}
              {showTextControls && (
                <div className="mt-4 p-4 bg-white/5 rounded-lg border border-primary/10">
                  <input
                    type="text"
                    value={textInput}
                    onChange={(e) => setTextInput(e.target.value)}
                    placeholder="Type your text here..."
                    className="w-full mb-3 px-3 py-2 bg-secondary/80 border border-primary/20 rounded-lg text-white placeholder:text-gray-400"
                  />
                  
                  <div className="grid grid-cols-3 gap-2 mb-3">
                    <select
                      value={selectedFont}
                      onChange={(e) => setSelectedFont(e.target.value)}
                      className="px-2 py-1 bg-secondary/80 border border-primary/20 rounded text-white text-sm"
                    >
                      <option value="Arial">Arial</option>
                      <option value="Impact">Bold</option>
                      <option value="Times New Roman">Serif</option>
                      <option value="Comic Sans MS">Fun</option>
                    </select>
                    
                    <input
                      type="range"
                      value={fontSize}
                      onChange={(e) => setFontSize(Number(e.target.value))}
                      min="12"
                      max="48"
                      className="col-span-2"
                      title={`Size: ${fontSize}px`}
                    />
                  </div>
                  
                  <div className="flex space-x-2 mb-3">
                    {['#ffffff', '#000000', '#ff0000', '#0066ff', '#ffff00'].map(color => (
                      <button 
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`w-8 h-8 rounded-full border-2 ${selectedColor === color ? 'border-primary scale-110' : 'border-white/20'}`}
                        style={{ backgroundColor: color }}
                      />
                    ))}
                    <input
                      type="color"
                      value={selectedColor}
                      onChange={(e) => setSelectedColor(e.target.value)}
                      className="w-8 h-8 rounded-full"
                    />
                  </div>
                  
                  <div className="flex space-x-2">
                    <button
                      onClick={addTextToCanvas}
                      className="flex-1 bg-primary hover:bg-primary-600 text-background font-bold py-2 px-3 rounded-lg"
                    >
                      Add Text
                    </button>
                    <button
                      onClick={() => setShowTextControls(false)}
                      className="px-3 py-2 text-gray-400 hover:text-white"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              )}
              
              {/* Your Photos */}
              {uploadedImages.length > 0 && (
                <div className="mt-4">
                  <h4 className="text-sm text-white mb-3">📷 Your Photos</h4>
                  <div className="grid grid-cols-4 gap-2">
                    {uploadedImages.map((img) => (
                      <button 
                        key={img.id}
                        onClick={() => addImageToCanvas(img.src)}
                        className="relative rounded-lg overflow-hidden h-16 border-2 border-primary/20 hover:border-primary transition-all hover:scale-105"
                        title="Click to add to design"
                      >
                        <img 
                          src={img.src} 
                          alt={img.name}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            {/* Quick Controls - Only show when something is selected */}
            {selectedId && (
              <div className="bg-secondary/40 backdrop-blur-md border border-primary/20 rounded-lg p-4 shadow-md">
                <h3 className="text-white font-bold mb-3 flex items-center">
                  🎯 Selected Item
                </h3>
                
                <div className="grid grid-cols-2 gap-2 mb-3">
                  <button
                    onClick={bringForward}
                    disabled={elements.length === 0 || !selectedId || (elements.length > 0 && elements.find(el => el.id === selectedId)?.zIndex === Math.max(...elements.map(el => el.zIndex)))}
                    className="bg-secondary hover:bg-secondary/60 disabled:opacity-30 disabled:cursor-not-allowed text-white py-2 px-3 rounded-lg transition-colors text-sm"
                    title="Bring to front"
                  >
                    📤 Front
                  </button>
                  <button
                    onClick={sendBackward}
                    disabled={elements.length === 0 || !selectedId || (elements.length > 0 && elements.find(el => el.id === selectedId)?.zIndex === Math.min(...elements.map(el => el.zIndex)))}
                    className="bg-secondary hover:bg-secondary/60 disabled:opacity-30 disabled:cursor-not-allowed text-white py-2 px-3 rounded-lg transition-colors text-sm"
                    title="Send to back"
                  >
                    📥 Back
                  </button>
                </div>

                {/* Transparency Slider */}
                <div className="mb-3">
                  <label className="text-xs text-gray-300 block mb-2">✨ Transparency</label>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={elements.find(el => el.id === selectedId)?.opacity || 1}
                    onChange={(e) => {
                      const opacity = parseFloat(e.target.value);
                      handleTransform(selectedId, { opacity });
                    }}
                    className="w-full"
                  />
                </div>

                {/* Resize Lock */}
                <div className="mb-3">
                  <button
                    onClick={() => setKeepAspectRatio(!keepAspectRatio)}
                    className={`w-full py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                      keepAspectRatio 
                        ? 'bg-primary text-background' 
                        : 'bg-secondary/60 text-white border border-primary/20'
                    }`}
                  >
                    {keepAspectRatio ? '🔒 Keep Shape' : '🔓 Free Resize'}
                  </button>
                </div>
                
                <button
                  onClick={deleteSelectedElement}
                  className="w-full bg-red-600/80 hover:bg-red-600 text-white py-2 px-4 rounded-lg transition-colors flex items-center justify-center font-medium"
                >
                  🗑️ Delete
                </button>
              </div>
            )}

            {/* Simple Actions */}
            <div className="bg-secondary/40 backdrop-blur-md border border-primary/20 rounded-lg p-4 shadow-md">
              <div className="grid grid-cols-2 gap-2 mb-3">
                <button
                  onClick={undo}
                  disabled={history.length <= 1}
                  className="bg-secondary hover:bg-secondary/60 disabled:opacity-30 disabled:cursor-not-allowed text-white py-2 px-3 rounded-lg transition-colors flex items-center justify-center text-sm"
                  title="Undo last action"
                >
                  ↶ Undo
                </button>
                
                <button
                  onClick={clearCanvas}
                  disabled={elements.length === 0}
                  className="bg-secondary hover:bg-secondary/60 disabled:opacity-30 disabled:cursor-not-allowed text-white py-2 px-3 rounded-lg transition-colors flex items-center justify-center text-sm"
                  title="Start over"
                >
                  🗑️ Clear
                </button>
              </div>
              
              {/* Simplified Save & Cart */}
              {!finalDesignImage ? (
                <button
                  onClick={captureDesignForCart}
                  disabled={elements.length === 0 || isCapturingDesign}
                  className="w-full bg-primary hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed text-background font-bold py-3 px-4 rounded-lg transition-colors flex items-center justify-center"
                >
                  {isCapturingDesign ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Getting Ready...
                    </>
                  ) : (
                    <>
                      🛒 Add to Cart
                    </>
                  )}
                </button>
              ) : (
                <AddToCartButton
                  lines={[{
                    merchandiseId: customVariant.id,
                    quantity: 1,
                    attributes: [
                      {
                        key: 'Custom Design',
                        value: 'Yes'
                      },
                      {
                        key: 'Design Elements',
                        value: `${elements.length} elements`
                      }
                    ]
                  }]}
                  selectedVariant={customVariant}
                  disabled={isOutOfStock}
                  className={`w-full font-bold py-3 px-4 rounded-lg transition-colors flex items-center justify-center ${
                    isOutOfStock 
                      ? 'bg-gray-600 text-gray-400 cursor-not-allowed' 
                      : 'bg-green-600 hover:bg-green-700 text-white'
                  }`}
                >
                  🛒 Add Custom Design
                </AddToCartButton>
              )}

              {/* Auto-save indicator */}
              {autoSaveEnabled && (elements.length > 0 || uploadedImages.length > 0) && (
                <div className="mt-2 text-center">
                  <span className="text-green-400 text-xs">
                    💾 Auto-saved
                  </span>
                </div>
              )}
            </div>

            {/* Saved Designs - Collapsed by default */}
            {savedDesigns.length > 0 && (
              <div className="bg-secondary/40 backdrop-blur-md border border-primary/20 rounded-lg p-4 shadow-md">
                <button
                  onClick={() => setShowSavedDesigns(!showSavedDesigns)}
                  className="w-full flex items-center justify-between text-white font-bold mb-2"
                >
                  <span>💾 My Designs ({savedDesigns.length})</span>
                  <span>{showSavedDesigns ? '−' : '+'}</span>
                </button>
                
                {showSavedDesigns && (
                  <div className="space-y-2 max-h-32 overflow-y-auto">
                    {savedDesigns.map((design, index) => (
                      <div key={design.id} className="flex items-center justify-between bg-secondary/60 rounded-lg p-2">
                        <span className="text-white text-sm">Design {index + 1}</span>
                        <div className="flex space-x-1">
                          <button
                            onClick={() => loadDesignFromStorage(design.id)}
                            className="bg-primary hover:bg-primary-600 text-background text-xs py-1 px-2 rounded"
                          >
                            Load
                          </button>
                          <button
                            onClick={() => deleteDesign(design.id)}
                            className="bg-red-600/70 hover:bg-red-600 text-white text-xs py-1 px-2 rounded"
                          >
                            ✕
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
          
          {/* Canvas Area */}
          <div className="lg:col-span-2">
            <div className="bg-secondary/40 backdrop-blur-md border border-primary/20 rounded-lg p-4 shadow-md">
              <div className="relative mb-4">
                <h3 className="text-lg font-bold text-white">Design Canvas</h3>
                <p className="text-gray-400 text-xs">
                  Drag, resize, and position your elements
                </p>
              </div>
              
              <div className="relative mx-auto" style={{ width: stageSize.width, height: stageSize.height }}>
                {/* Use ClientOnly to prevent server-side rendering of Konva */}
                <ClientOnly fallback={renderCanvasLoading()}>
                  <EnhancedProductDesigner
                    backgroundImage={backgroundImage}
                    stageSize={stageSize}
                    elements={elements}
                    selectedId={selectedId}
                    onElementSelect={handleElementSelect}
                    onElementDeselect={() => setSelectedId(null)}
                    onElementTransform={handleTransform}
                    keepAspectRatio={keepAspectRatio}
                  />
                </ClientOnly>
              </div>
              
              <div className="mt-4 space-y-3">
                {finalDesignImage && (
                  <div className="bg-green-600/20 border border-green-600/30 rounded-md p-3">
                    <div className="flex items-center mb-2">
                      <ShoppingCart className="w-4 h-4 text-green-400 mr-2" />
                      <p className="text-green-400 text-sm font-semibold">Design Ready!</p>
                    </div>
                    <p className="text-green-300 text-xs">
                      Your custom design is ready to be added to cart. The design preview has been captured and will be included with your order.
                    </p>
                  </div>
                )}
                
                {elements.length === 0 && uploadedImages.length === 0 && (
                  <div className="bg-primary/10 border border-primary/30 rounded-lg p-4 text-center">
                    <div className="text-2xl mb-2">🎨</div>
                    <h3 className="text-white font-bold mb-2">Start Creating!</h3>
                    <p className="text-gray-300 text-sm">
                      Add photos and text to create your custom design. 
                      Click and drag to move things around!
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// GraphQL query to fetch product data - rename to avoid conflicts
const PRODUCT_QUERY = `#graphql
  query ProductCustomizer($handle: String!) {
    product(handle: $handle) {
      id
      title
      description
      images(first: 1) {
        nodes {
          url
          altText
          width
          height
        }
      }
      variants(first: 25) {
        nodes {
          id
          title
          availableForSale
          price {
            amount
            currencyCode
          }
          compareAtPrice {
            amount
            currencyCode
          }
          image {
            url
            altText
            width
            height
          }
        }
      }
    }
  }
`; 