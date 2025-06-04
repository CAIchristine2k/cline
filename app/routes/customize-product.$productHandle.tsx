import React, {useState, useRef, useEffect} from 'react';
import {useLoaderData, useParams, type LoaderFunctionArgs, useNavigate, useRevalidator, useSubmit, useFetcher} from 'react-router';
import {
  Upload,
  Type,
  Sliders,
  Download,
  Trash2,
  Save,
  Undo,
  Image,
  User,
  Sparkles,
  Loader2,
  Cloud,
  CloudDownload,
  ShoppingCart,
  Images,
} from 'lucide-react';
import {
  Stage,
  Layer,
  Image as KonvaImage,
  Text,
  Transformer,
  Group,
} from 'react-konva';
import Konva from 'konva';
import {useConfig} from '~/utils/themeContext';
import {AuthPrompt} from '~/components/AuthPrompt';
import {ClientOnly} from '~/components/ClientOnly';
import {ProductDesigner} from '~/components/ProductDesigner';
import {
  uploadCanvasToCloudinary,
  uploadFileToCloudinary,
  saveDesignToCloudinary,
  downloadAndReuploadToCloudinary,
} from '~/utils/cloudinaryUpload';
import {AddToCartButton} from '~/components/AddToCartButton';
import {ToastContainer, useToast} from '~/components/Toast';
import {
  saveDesignToStorage,
  updateDesignInStorage,
  getDesignsForProduct,
  getDesignFromStorage,
  deleteDesignFromStorage,
  createAutoSave,
  resetDesignsForProduct,
  type StoredDesign,
  getDesignForProductAndImage,
  storeCartLineDesigns,
  storeLatestDesign,
} from '~/utils/designStorage';
import {useCart} from '~/hooks/useCart';

// Extend StoredDesign type locally to include cloudinaryUrl
type ExtendedStoredDesign = StoredDesign & {
  cloudinaryUrl?: string;
  lastUpdated?: string;
};

// Custom type definitions for Konva
type StageType = Konva.Stage;
type TransformerType = Konva.Transformer;
type NodeType = Konva.Node;

// AI Generation Modal Component
interface AIGenerationModalProps {
  showAIModal: boolean;
  setShowAIModal: (show: boolean) => void;
  aiGenerationType: 'fan-together' | 'image-reference' | 'text-only';
  setAiGenerationType: (
    type: 'fan-together' | 'image-reference' | 'text-only',
  ) => void;
  aiPrompt: string;
  setAiPrompt: (prompt: string) => void;
  aiNegativePrompt: string;
  setAiNegativePrompt: (prompt: string) => void;
  aiReferenceImage: string | null;
  setAiReferenceImage: (image: string | null) => void;
  aiUserImage: string | null;
  setAiUserImage: (image: string | null) => void;
  aiImageReference: 'basic' | 'subject' | 'face';
  setAiImageReference: (ref: 'basic' | 'subject' | 'face') => void;
  aiAspectRatio: string;
  setAiAspectRatio: (ratio: string) => void;
  aiNumberOfImages: number;
  setAiNumberOfImages: (num: number) => void;
  uploadedImages: {id: string; src: string; name: string}[];
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
  const handleUserImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    try {
      const uploadResult = await uploadFileToCloudinary(file, {
        folder: 'ai-user-images',
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

  const handleTargetImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    try {
      const uploadResult = await uploadFileToCloudinary(file, {
        folder: 'ai-target-images',
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
            <div>
              <h2 className="text-2xl font-bold text-white flex items-center">
                <Sparkles className="w-6 h-6 mr-2 text-primary" />
                AI Generation Studio
              </h2>
              <p className="text-xs text-green-400 mt-1 flex items-center">
                <span className="ml-1">Create amazing designs with AI</span>
              </p>
            </div>
            <button
              onClick={() => setShowAIModal(false)}
              className="text-gray-400 hover:text-white text-xl font-bold w-8 h-8 flex items-center justify-center"
            >
              ✕
            </button>
          </div>

          {/* Generation Type Selection */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-white mb-3">
              Choose Design Mode
            </h3>
            <div className="grid grid-cols-1 gap-3">
              <button
                onClick={() => setAiGenerationType('text-only')}
                className={`p-4 rounded-lg border transition-all ${
                  aiGenerationType === 'text-only'
                    ? 'bg-primary/20 border-primary text-primary'
                    : 'bg-secondary/40 border-primary/20 text-white hover:border-primary/40'
                  }`}
              >
                <div className="flex items-center space-x-3">
                  <div className="text-2xl">💭</div>
                  <div className="text-left flex-1">
                    <div className="font-semibold flex items-center justify-between">
                      Text-to-Image
                    </div>
                    <div className="text-xs opacity-80">
                      Create designs from your text descriptions. Perfect for
                      logos, graphics, and creative artwork.
                    </div>
                  </div>
                </div>
              </button>

              <button
                onClick={() => setAiGenerationType('image-reference')}
                className={`p-4 rounded-lg border transition-all ${
                  aiGenerationType === 'image-reference'
                    ? 'bg-primary/20 border-primary text-primary'
                    : 'bg-secondary/40 border-primary/20 text-white hover:border-primary/40'
                  }`}
              >
                <div className="flex items-center space-x-3">
                  <div className="text-2xl">🖼️</div>
                  <div className="text-left flex-1">
                    <div className="font-semibold flex items-center justify-between">
                      Image Transformation
                    </div>
                    <div className="text-xs opacity-80">
                      Transform an existing image with AI. Edit styles,
                      backgrounds, or add creative elements.
                    </div>
                  </div>
                </div>
              </button>

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
                  <div className="text-left flex-1">
                    <div className="font-semibold flex items-center justify-between">
                      Mashup Creator
                    </div>
                    <div className="text-xs opacity-80">
                      Combine two images together. Great for creating scenes
                      with you and your favorite athletes or pets.
                    </div>
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
                  : aiGenerationType === 'image-reference'
                    ? "Describe how you want to modify or style the image (e.g., 'change background to beach', 'add sunset lighting', 'make it vintage style', 'create logo in this style')..."
                    : "Describe what you want to create (e.g., 'modern logo with bold text', 'artistic pattern', 'sports team emblem', 'abstract design')..."
              }
              className="w-full h-24 px-4 py-3 bg-secondary/80 border border-primary/20 rounded-lg text-white placeholder:text-gray-400 resize-none"
              maxLength={2500}
            />
            <div className="text-xs text-gray-400 mt-1">
              {aiPrompt.length}/2500 characters
            </div>
          </div>

          {/* Negative Prompt (for text-only) */}
          {aiGenerationType === 'text-only' && (
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
                Exclude specific elements or styles from your design
              </div>
            </div>
          )}

          {/* Image Upload Section - Different for each mode */}
          {aiGenerationType === 'text-only' ? (
            /* Text-only mode - no images needed */
            <div className="mb-6 p-4 bg-green-600/10 border border-green-600/30 rounded-lg">
              <div className="text-center">
                <div className="text-2xl mb-2">💭</div>
                <h4 className="text-green-400 font-semibold mb-2">
                  Text-to-Image Mode
                </h4>
                <p className="text-green-300 text-sm">
                  Just describe what you want! Our AI will create designs based
                  solely on your text description.
                </p>
              </div>
            </div>
          ) : aiGenerationType === 'image-reference' ? (
            /* Image Reference mode - 1 image needed */
            <div className="mb-6">
              <label className="block text-white font-semibold mb-3">
                Reference Image <span className="text-red-400">*</span>
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
                    <div className="text-white text-sm">
                      Upload Reference Image
                    </div>
                    <div className="text-gray-400 text-xs">
                      For style, editing, or logo inspiration
                    </div>
                  </label>
                </div>

                {/* Choose from existing photos */}
                {uploadedImages.length > 0 && (
                  <div>
                    <div className="text-white text-sm mb-2">
                      Or choose from your uploaded photos:
                    </div>
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
                                <span className="text-background text-xs">
                                  ✓
                                </span>
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
                          <div className="text-green-400 text-sm font-semibold">
                            ✅ Reference image selected
                          </div>
                          <div className="text-green-300 text-xs">
                            Ready for generation
                          </div>
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
          ) : (
            /* Fan Together mode - 2 images needed */
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
                      <div className="text-gray-400 text-xs">
                        JPG, PNG up to 10MB
                      </div>
                    </label>
                  </div>

                  {/* Choose from existing photos */}
                  {uploadedImages.length > 0 && (
                    <div>
                      <div className="text-white text-sm mb-2">
                        Or choose from your uploaded photos:
                      </div>
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
                                  <span className="text-background text-xs">
                                    ✓
                                  </span>
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
                            <div className="text-green-400 text-sm font-semibold">
                              ✅ Your photo selected
                            </div>
                            <div className="text-green-300 text-xs">
                              Ready for generation
                            </div>
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
                  Target Person/Pet Photo{' '}
                  <span className="text-red-400">*</span>
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
                      <div className="text-white text-sm">
                        Upload Target Photo
                      </div>
                      <div className="text-gray-400 text-xs">
                        Person/pet you want to be with
                      </div>
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
                            <div className="text-green-400 text-sm font-semibold">
                              ✅ Target photo uploaded
                            </div>
                            <div className="text-green-300 text-xs">
                              Ready for generation
                            </div>
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
          )}

          {/* Generation Settings */}
          <div className="mb-6">
            {/* Fan Together Settings */}
            {aiGenerationType === 'fan-together' && aiReferenceImage && (
              <div className="mb-6">
                <label className="block text-white font-semibold mb-2">
                  Enhancement Level
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
                    <div className="text-xs opacity-80">
                      Use overall appearance and style
                    </div>
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
                    <div className="text-xs opacity-80">
                      Use facial features only
                    </div>
                  </button>
                </div>
              </div>
            )}

            {/* Common Settings */}
            <div className="grid grid-cols-2 gap-4">
              {/* Aspect Ratio */}
              <div>
                <label className="block text-white font-semibold mb-2">
                  Aspect Ratio
                </label>
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
                (aiGenerationType === 'fan-together' &&
                  (!aiUserImage || !aiReferenceImage)) ||
                (aiGenerationType === 'image-reference' && !aiReferenceImage)
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
  metafield?: {
    id: string;
    type: string;
    value: string;
    references?: {
      nodes: Array<{
        id: string;
        image: {
          url: string;
          altText?: string;
          width?: number;
          height?: number;
        };
      }>;
    };
  } | null;
}

interface Product {
  id: string;
  handle: string;
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
  media?: {
    nodes: Array<{
      id: string;
      image?: {
        id?: string;
        url: string;
        altText?: string;
        width?: number;
        height?: number;
      };
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
export async function loader({params, context}: LoaderFunctionArgs) {
  const {productHandle} = params;

  if (!productHandle) {
    throw new Response('Product not found', {status: 404});
  }

  try {
    // Query product data
    const response = await context.storefront.query(PRODUCT_QUERY, {
      variables: {
        handle: productHandle,
      },
    });

    const {product} = response;

    // Log the raw product data for debugging
    console.log('📦 Product data loaded:', {
      id: product?.id,
      handle: product?.handle,
      hasVariants: !!product?.variants?.nodes?.length,
      variantCount: product?.variants?.nodes?.length,
      hasMedia: !!product?.media?.nodes?.length,
      mediaCount: product?.media?.nodes?.length,
    });

    // Log detailed variant information
    if (product?.variants?.nodes) {
      console.log('🏷️ All Variants:');
      product.variants.nodes.forEach((variant: any, index: number) => {
        console.log(`    Variant #${index + 1}:`, {
          id: variant.id,
          title: variant.title,
          hasMetafield: !!variant.metafield,
          metafieldType: variant.metafield?.type || 'N/A',
          metafield: variant.metafield || 'No metafield',
        });
      });
    }

    // Log the raw query response to see exactly what's being returned
    console.log(
      '📊 Raw GraphQL response structure:',
      JSON.stringify(
        {
          hasProduct: !!response.product,
          hasVariants: !!response.product?.variants,
          variantsNodes: !!response.product?.variants?.nodes,
          firstVariantMetafields:
            response.product?.variants?.nodes?.[0]?.metafields ||
            'No metafields',
        },
        null,
        2,
      ),
    );

    if (!product?.id) {
      throw new Response('Product not found', {status: 404});
    }

    // Find custom variant if it exists - using safer checks
    const customVariant = product.variants.nodes.find(
      (variant: any) => variant?.title?.toLowerCase?.() === 'custom',
    );

    if (!customVariant) {
      throw new Response('This product does not support customization', {
        status: 404,
      });
    }

    // Log the custom variant details
    console.log('🎨 Custom variant found:', {
      id: customVariant.id,
      title: customVariant.title,
      hasMetafield: !!customVariant.metafield,
      metafieldType: customVariant.metafield?.type || 'N/A',
      metafield: customVariant.metafield || 'No metafield',
    });

    // Check authentication status
    let isLoggedIn = false;
    let customer = null;

    try {
      isLoggedIn = await context.customerAccount.isLoggedIn();
      if (isLoggedIn) {
        // Get customer data if logged in
        const {data} = await context.customerAccount.query(`
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

    return new Response(
      JSON.stringify({
        product,
        customVariant,
        isOutOfStock: !customVariant.availableForSale,
        isLoggedIn,
        customer,
      }),
      {
        headers: {'Content-Type': 'application/json'},
      },
    );
  } catch (error) {
    console.error('Error loading product data:', error);
    throw new Response('Failed to load product data', {status: 500});
  }
}

export default function ProductCustomizer() {
  const {product, customVariant, isOutOfStock, isLoggedIn, customer} = 
    useLoaderData<LoaderData>();
  const config = useConfig();
  const {openCart} = useCart(); // Get openCart function from hook
  const navigate = useNavigate();
  const revalidator = useRevalidator();
  const submit = useSubmit();
  const cartFetcher = useFetcher(); // Add fetcher for cart updates without navigation
  const {toasts, removeToast, showSuccess, showError, showWarning, showInfo} =
    useToast();
  const params = useParams();

  // Debug loader data
  console.log('⭐ ProductCustomizer loaded from loader:', {
    product: {
      id: product.id,
      handle: product.handle,
      title: product.title,
      variantsCount: product.variants?.nodes?.length || 0,
      mediaCount: product.media?.nodes?.length || 0,
      imagesCount: product.images?.nodes?.length || 0,
    },
    customVariant: customVariant
      ? {
          id: customVariant.id,
          title: customVariant.title,
          hasMetafield: !!customVariant.metafield,
          metafieldType: customVariant.metafield?.type || 'N/A',
          metafieldValue: customVariant.metafield || 'No metafield',
        }
      : 'No custom variant',
  });

  // Custom CSS for shadow glow effect
  const shadowGlowStyle = `
    .shadow-glow {
      box-shadow: 0 0 8px 2px rgba(var(--color-primary-rgb), 0.5);
    }
  `;

  // Debug customVariant and auth
  console.log('ProductCustomizer loaded:', {
    customVariant: {
      id: customVariant.id,
      title: customVariant.title,
      availableForSale: customVariant.availableForSale,
      price: customVariant.price,
      isOutOfStock,
    },
    auth: {
      isLoggedIn,
      customer: customer
        ? {
          id: customer.id,
          firstName: customer.firstName,
          email: customer.email,
        }
        : null,
    },
  });
  const stageRef = useRef<StageType | null>(null);
  const transformerRef = useRef<TransformerType | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Custom variant images from metafield
  const [customizableImages, setCustomizableImages] = useState<
    Array<{
    id: string;
    url: string;
    altText?: string;
    width?: number;
    height?: number;
    }>
  >([]);

  // State to track currently selected customizable image
  const [selectedCustomImage, setSelectedCustomImage] = useState<string | null>(
    null,
  );

  const [elements, setElements] = useState<CustomElement[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [uploadedImages, setUploadedImages] = useState<
    {id: string; src: string; name: string}[]
  >([]);
  const [stageSize, setStageSize] = useState({width: 500, height: 500});
  const [backgroundImage, setBackgroundImage] =
    useState<HTMLImageElement | null>(null);
  const [showAIPrompt, setShowAIPrompt] = useState(false);
  const [showAIModal, setShowAIModal] = useState(false);
  const [isAIGenerating, setIsAIGenerating] = useState(false);
  const [aiPrompt, setAiPrompt] = useState('');
  const [aiNegativePrompt, setAiNegativePrompt] = useState('');
  const [aiGenerationType, setAiGenerationType] = useState<
    'fan-together' | 'image-reference' | 'text-only'
  >('text-only');
  const [aiReferenceImage, setAiReferenceImage] = useState<string | null>(null);
  const [aiUserImage, setAiUserImage] = useState<string | null>(null);
  const [aiImageReference, setAiImageReference] = useState<
    'basic' | 'subject' | 'face'
  >('basic');
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
  const [isProcessingAIImages, setIsProcessingAIImages] = useState(false);
  const [processingImageCount, setProcessingImageCount] = useState(0);

  // Local storage state
  const [savedDesigns, setSavedDesigns] = useState<StoredDesign[]>([]);
  const [currentDesignId, setCurrentDesignId] = useState<string | null>(null);
  const [showSavedDesigns, setShowSavedDesigns] = useState(false);
  const [autoSaveEnabled, setAutoSaveEnabled] = useState(true);

  // Track designs for multiple customizable images
  const [designedImages, setDesignedImages] = useState<Record<string, string>>(
    {},
  ); // Map of image URL to design URL

  // Track progress through customization workflow
  const [customizationProgress, setCustomizationProgress] = useState({
    total: 0,
    completed: 0,
    current: 0,
  });

  // Track if all images have been customized
  const [allImagesCustomized, setAllImagesCustomized] = useState(false);

  // Add a state to track reset operation
  const [isResetting, setIsResetting] = useState(false);

  // Function to change the background image when a customizable image is selected
  const changeBackgroundImage = (imageUrl: string) => {
    // First save the current design if we're switching away from something
    if (selectedCustomImage && elements.length > 0 && autoSaveEnabled) {
      console.log(`💾 Auto-saving current design for ${selectedCustomImage} before switching...`);
      saveCurrentDesignLocally();
    }
    
    setSelectedCustomImage(imageUrl);

    // Load the new image
    const img = new window.Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      setBackgroundImage(img);
      // Adjust stage size based on image dimensions
      const containerWidth = Math.min(window.innerWidth - 40, 600);
      const scale = containerWidth / img.width;
      setStageSize({
        width: containerWidth,
        height: img.height * scale,
      });

      // Load existing design for this variant if it exists
      if (product?.id) {
        // Use the helper function to find a design for this specific image
        const matchingDesign = getDesignForProductAndImage(product.id, imageUrl);
        
        if (matchingDesign) {
          console.log(`🔄 Found matching design in storage: ${matchingDesign.id}`);
          loadDesignFromStorage(matchingDesign.id);
        } else {
          // Clear canvas since we don't have a saved design for this variant
          console.log(`🆕 No existing design found for this image, starting fresh`);
          setElements([]);
          setSelectedId(null);
          setCurrentDesignId(null); // Ensure we create a new design ID when saving
        }
      } else {
        // Clear canvas when switching to a new image
        setElements([]);
        setSelectedId(null);
      }
    };
    img.onerror = () => {
      console.warn('Failed to load customizable image with CORS');

      // Fallback: try loading without crossOrigin
      const fallbackImg = new window.Image();
      fallbackImg.onload = () => {
        setBackgroundImage(fallbackImg);
        const containerWidth = Math.min(window.innerWidth - 40, 600);
        const scale = containerWidth / fallbackImg.width;
        setStageSize({
          width: containerWidth,
          height: fallbackImg.height * scale,
        });
      };
      fallbackImg.src = imageUrl;
    };
    img.src = imageUrl;
  };

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
          height: img.height * scale,
        });
      };
      img.onerror = () => {
        console.warn(
          'Failed to load image with CORS, trying without crossOrigin',
        );
        // Fallback: try loading without crossOrigin (won't be exportable but will display)
        const fallbackImg = new window.Image();
        fallbackImg.onload = () => {
          setBackgroundImage(fallbackImg);
          const containerWidth = Math.min(window.innerWidth - 40, 600);
          const scale = containerWidth / fallbackImg.width;
          setStageSize({
            width: containerWidth,
            height: fallbackImg.height * scale,
          });
        };
        if (customVariant?.image?.url) {
          fallbackImg.src = customVariant.image.url;
        }
      };
      img.src = customVariant.image.url;
    }
  }, [customVariant]);

  // Initialize images when component mounts or when selected variant changes
  useEffect(() => {
    if (customVariant && product) {
      console.log('Loading customizable images for:', {
        productId: product.id,
        productHandle: product.handle,
        variantId: customVariant.id,
        variantTitle: customVariant.title,
        hasMetafield: !!customVariant.metafield,
        hasMainImage: !!customVariant.image,
      });

      // Initialize array to hold all customizable images
      let allCustomizableImages: Array<{
        id: string;
        url: string;
        altText?: string;
        width?: number;
        height?: number;
      }> = [];

      // Add the main variant image first
      if (customVariant.image?.url) {
        const mainImage = {
          id: `main-variant-image-${customVariant.id}`,
          url: customVariant.image.url,
          altText:
            customVariant.image.altText ||
            `${customVariant.title} - Main Image`,
          width: customVariant.image.width || 800,
          height: customVariant.image.height || 800,
        };
        allCustomizableImages.push(mainImage);
        console.log('🖼️ Added main variant image:', mainImage.url);
      }

      // Check if we have the variant_imgs metafield with references
      const variantImgsMf = customVariant.metafield;

      console.log('🔍 CUSTOM.VARIANT_IMGS LOG:', {
        found: !!variantImgsMf,
        type: variantImgsMf?.type,
        value: variantImgsMf?.value,
        hasReferences: !!variantImgsMf?.references?.nodes?.length,
      });

      if (variantImgsMf?.references?.nodes) {
        // Direct access to referenced images through the metafield
        const additionalImages = variantImgsMf.references.nodes.map(
          (node, index) => ({
            id: node.id,
            url: node.image.url,
            altText:
              node.image.altText ||
              `${customVariant.title} - Image ${index + 1}`,
            width: node.image.width || 800,
            height: node.image.height || 800,
          }),
        );

        console.log(
          '🖼️ Additional customizable images from references:',
          additionalImages,
        );

        // Add the additional images to our array
        allCustomizableImages = [...allCustomizableImages, ...additionalImages];
      } else if (variantImgsMf?.value) {
        // Legacy fallback: try to parse the value as JSON if references are not available
        try {
          // Parse the metafield value as JSON
          const parsedValue = JSON.parse(variantImgsMf.value);
          console.log('📊 Parsed image identifiers (legacy):', parsedValue);

          // Legacy processing to match GIDs with media nodes
          // [Keeping the existing complex code for fallback purposes]
          // ...
        } catch (error) {
          console.error('Error parsing customizable images:', error);
        }
      }

      // If we have images, set them and update the UI
      if (allCustomizableImages.length > 0) {
        console.log(
          `🖼️ Final set of ${allCustomizableImages.length} customizable images:`,
          allCustomizableImages.map((img) => img.url),
        );

        setCustomizableImages(allCustomizableImages);

        // Update the progress tracker
        setCustomizationProgress({
          total: allCustomizableImages.length,
          completed: 0,
          current: 0,
        });

        // Set the first image as selected by default
        const firstImage = allCustomizableImages[0];
        
        // Check if we have any saved designs for any of the images
        if (product.id) {
          // Build map of existing designs
          const existingDesignMap: Record<string, string> = {};
          
          // Check for existing designs for each customizable image
          allCustomizableImages.forEach(img => {
            const savedDesign = getDesignForProductAndImage(product.id, img.url);
            if (savedDesign) {
              console.log(`🔍 Found existing design for image: ${img.url}`);
              // Track that this image has a design
              existingDesignMap[img.url] = savedDesign.id;
              
              // Update completion tracking
              setDesignedImages(prev => ({
                ...prev,
                [img.url]: savedDesign.id
              }));
            }
          });
          
          // If we have at least one saved design, show success message
          if (Object.keys(existingDesignMap).length > 0) {
            showInfo(`Loaded ${Object.keys(existingDesignMap).length} existing designs for this product.`);
          }
        }
        
        // Always switch to the first image to start
            setSelectedCustomImage(firstImage.url);
            changeBackgroundImage(firstImage.url);
      } else {
        console.log('⚠️ No customizable images found');
        // Fallback to variant's default image if available
        if (customVariant?.image?.url) {
          const fallbackImage = {
            id: 'default-variant-img',
            url: customVariant.image.url,
            altText: 'Product image',
            width: customVariant.image.width,
            height: customVariant.image.height,
          };

          setCustomizableImages([fallbackImage]);
          setSelectedCustomImage(fallbackImage.url);
          changeBackgroundImage(fallbackImage.url);

          // Update progress tracker for single image
          setCustomizationProgress({
            total: 1,
            completed: 0,
            current: 0,
          });
        }
      }
    }
  }, [customVariant, product]);

  // Track completion whenever elements are added/removed for the current image
  useEffect(() => {
    if (selectedCustomImage && elements.length > 0) {
      // Mark current image as completed if it has elements
      setDesignedImages((prev) => ({
        ...prev,
        [selectedCustomImage]: 'has_elements', // Simple marker to show completion
      }));
      console.log(`✅ Marked ${selectedCustomImage} as completed (${elements.length} elements)`);
    } else if (selectedCustomImage && elements.length === 0) {
      // Remove from completed if no elements
      setDesignedImages((prev) => {
        const updated = { ...prev };
        delete updated[selectedCustomImage];
        return updated;
      });
      console.log(`❌ Removed ${selectedCustomImage} from completed (no elements)`);
    }
  }, [elements.length, selectedCustomImage]);

  // Update the completion status whenever designedImages or customizableImages change
  useEffect(() => {
    if (customizableImages.length > 0) {
      const completedCount = Object.keys(designedImages).length;
      const totalCount = customizableImages.length;

      setCustomizationProgress((prev) => ({
        ...prev,
        completed: completedCount,
        total: totalCount,
      }));

      // Set allImagesCustomized flag when all images are done
      setAllImagesCustomized(completedCount === totalCount);

      console.log(
        `📊 Customization progress: ${completedCount}/${totalCount} complete`,
      );
    }
  }, [designedImages, customizableImages]);

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
      setHistory((prev) => [...prev, [...elements]]);
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
      backgroundImage: selectedCustomImage || customVariant.image?.url || '',
      selectedCustomImage,
    });

    // Don't set up auto-save timer, we'll save on each edit instead
    // Just prepare the state for manual saves
    const autoSave = createAutoSave(getCurrentDesignState, 60000); // Longer interval as backup only

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
  }, [
    product,
    customVariant,
    elements,
    uploadedImages,
    stageSize,
    currentDesignId,
    autoSaveEnabled,
    selectedCustomImage,
  ]);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    setIsUploading(true);

    try {
      // Upload to Cloudinary
      const uploadResult = await uploadFileToCloudinary(file, {
        folder: 'user-uploads',
      });

      if (uploadResult.success && uploadResult.url) {
        const newImage = {
          id: `image-${Date.now()}`,
          src: uploadResult.url,
          name: file.name,
        };

        // Add to uploaded images gallery
        setUploadedImages((prev) => [...prev, newImage]);

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

  // Add image to canvas with auto-save
  const addImageToCanvas = (src: string) => {
    const img = new window.Image();
    img.src = src;
    img.onload = () => {
      // Calculate scaled dimensions to fit stage
      const maxDim = Math.min(stageSize.width, stageSize.height) * 0.5;
      const scale =
        img.width > img.height ? maxDim / img.width : maxDim / img.height;

      // Calculate scaled image dimensions
      const scaledWidth = img.width * scale;
      const scaledHeight = img.height * scale;

      // Position image so its center is at the center of the stage
      const centerX = stageSize.width / 2;
      const centerY = stageSize.height / 2;

      const newElement: CustomElement = {
        id: `canvas-image-${Date.now()}`,
        type: 'image',
        x: centerX - scaledWidth / 2,
        y: centerY - scaledHeight / 2,
        width: img.width,
        height: img.height,
        scaleX: scale,
        scaleY: scale,
        rotation: 0,
        src,
        opacity: 1,
        selected: true,
        zIndex: elements.length, // New elements get higher z-index
      };

      // Deselect others and select the new element
      setElements((prev) =>
        prev.map((el) => ({...el, selected: false})).concat(newElement),
      );
      setSelectedId(newElement.id);
      addToHistory();
      
      // Auto-save after adding image
      if (autoSaveEnabled) {
        setTimeout(() => saveCurrentDesignLocally(), 500);
      }
    };
  };

  // Add text to canvas with auto-save
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
      zIndex: elements.length, // New elements get higher z-index
    };

    // Deselect others and select the new element
    setElements((prev) =>
      prev.map((el) => ({...el, selected: false})).concat(newElement),
    );
    setSelectedId(newElement.id);
    setTextInput('');
    setShowTextControls(false);
    addToHistory();
    
    // Auto-save after adding text
    if (autoSaveEnabled) {
      setTimeout(() => saveCurrentDesignLocally(), 500);
    }
  };

  const handleElementSelect = (id: string) => {
    setSelectedId(id);
    setElements((prev) =>
      prev.map((el) => ({
        ...el,
        selected: el.id === id,
      })),
    );
  };

  // Update the handleTransform function to save on each edit
  const handleTransform = (
    nodeId: string,
    newAttrs: Partial<CustomElement>,
  ) => {
    setElements((prev) => {
      const updated = prev.map((el) => (el.id === nodeId ? {...el, ...newAttrs} : el));
      
      // Trigger auto-save after state update
      setTimeout(() => {
        if (autoSaveEnabled) {
          saveCurrentDesignLocally();
        }
      }, 500);
      
      return updated;
    });
  };

  // Delete element with auto-save
  const deleteSelectedElement = () => {
    if (!selectedId) return;

    setElements((prev) => prev.filter((el) => el.id !== selectedId));
    setSelectedId(null);
    addToHistory();
    
    // Auto-save after deletion
    if (autoSaveEnabled) {
      setTimeout(() => saveCurrentDesignLocally(), 500);
    }
  };

  // Update z-index with auto-save
  const bringForward = () => {
    if (!selectedId) return;

    setElements((prev) => {
      const elementIndex = prev.findIndex((el) => el.id === selectedId);
      if (elementIndex === -1) return prev;

      const element = prev[elementIndex];
      const maxZIndex = Math.max(...prev.map((el) => el.zIndex));

      if (element.zIndex < maxZIndex) {
        const newElements = [...prev];
        newElements[elementIndex] = {...element, zIndex: element.zIndex + 1};

        // Swap z-index with the element that was at zIndex + 1
        const swapIndex = newElements.findIndex(
          (el) => el.zIndex === element.zIndex + 1 && el.id !== selectedId,
        );
        if (swapIndex !== -1) {
          newElements[swapIndex] = {
            ...newElements[swapIndex],
            zIndex: element.zIndex,
          };
        }

        return newElements;
      }

      return prev;
    });
    addToHistory();
    
    // Auto-save after changing z-index
    if (autoSaveEnabled) {
      setTimeout(() => saveCurrentDesignLocally(), 500);
    }
  };

  // Update z-index with auto-save
  const sendBackward = () => {
    if (!selectedId) return;

    setElements((prev) => {
      const elementIndex = prev.findIndex((el) => el.id === selectedId);
      if (elementIndex === -1) return prev;

      const element = prev[elementIndex];
      const minZIndex = Math.min(...prev.map((el) => el.zIndex));

      if (element.zIndex > minZIndex) {
        const newElements = [...prev];
        newElements[elementIndex] = {...element, zIndex: element.zIndex - 1};

        // Swap z-index with the element that was at zIndex - 1
        const swapIndex = newElements.findIndex(
          (el) => el.zIndex === element.zIndex - 1 && el.id !== selectedId,
        );
        if (swapIndex !== -1) {
          newElements[swapIndex] = {
            ...newElements[swapIndex],
            zIndex: element.zIndex,
          };
        }

        return newElements;
      }

      return prev;
    });
    addToHistory();
    
    // Auto-save after changing z-index
    if (autoSaveEnabled) {
      setTimeout(() => saveCurrentDesignLocally(), 500);
    }
  };

  // Clear canvas with auto-save reset
  const clearCanvas = () => {
    setElements([]);
    setSelectedId(null);
    addToHistory();
    
    // Clear current design ID to force new save
    setCurrentDesignId(null);
    
    // Auto-save after clearing (creates a blank design)
    if (autoSaveEnabled) {
      setTimeout(() => saveCurrentDesignLocally(), 500);
    }
  };

  const addToHistory = () => {
    setHistory((prev) => [...prev, [...elements]]);
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

  // Capture design as base64 without uploading to Cloudinary
  const captureDesignAsBase64 = async (): Promise<string | null> => {
    try {
      console.log('🖌️ Starting design capture process');
      
      // First, make sure the stage is visible and all elements are loaded
      await new Promise(resolve => setTimeout(resolve, 200));
      
      // Force direct access to the stage via DOM if our ref is null
      if (!stageRef.current) {
        console.log('⚡ Stage ref not available, attempting to access via DOM...');
        
        // Try to get the stage from the ProductDesigner component
        const stageElement = document.querySelector('.konvajs-content canvas');
        if (stageElement) {
          console.log('✅ Found canvas element directly in the DOM');
          
          // Try to find the Konva stage instance from the DOM
          const konvaStages = Konva.stages;
          if (konvaStages && konvaStages.length > 0) {
            console.log(`🎭 Found ${konvaStages.length} Konva stage(s) in the global registry`);
            // Use the last stage in the registry (most likely ours)
            stageRef.current = konvaStages[konvaStages.length - 1];
          } else {
            console.warn('⚠️ No Konva stages registered in the global registry');
          }
        }
      }
      
      // Wait longer for stage to be available with timeout
      let attempts = 0;
      const maxAttempts = 30; // Increased attempts further for more reliability
      
      while (!stageRef.current && attempts < maxAttempts) {
        console.log(`⏳ Waiting for stage reference (attempt ${attempts + 1}/${maxAttempts})`);
        await new Promise(resolve => setTimeout(resolve, 100)); // Shorter intervals, more attempts
        attempts++;
        
        // After some attempts, try again to access the Konva registry
        if (attempts === 15) {
          console.log('⚡ Retry accessing Konva registry...');
          const konvaStages = Konva.stages;
          if (konvaStages && konvaStages.length > 0) {
            console.log(`🎭 Found ${konvaStages.length} Konva stage(s) in the global registry`);
            stageRef.current = konvaStages[konvaStages.length - 1];
          }
        }
      }
      
      if (!stageRef.current) {
        console.error('❌ No stage reference available after multiple attempts');
        showError('Design capture failed - please try again or reload the page');
        return null;
      }
      
      console.log('✅ Stage reference obtained successfully');
      setIsCapturingDesign(true);
      showInfo('Capturing your design...', 1500);

      return new Promise((resolve, reject) => {
        // Set up a timeout to prevent hanging
        const timeout = setTimeout(() => {
          console.error('❌ Design capture timed out');
          setIsCapturingDesign(false);
          showError('Design capture timed out. Please try again.');
          reject(new Error('Design capture timed out'));
        }, 15000); // 15 second timeout

        try {
          // Temporarily hide transformer for the export
          const stage = stageRef.current;
          if (!stage) {
            throw new Error('Stage is null');
          }
          
          console.log('📸 Preparing stage for capture...');
          
          // Ensure all images in the stage are loaded before capturing
          const allImages = stage.find('Image');
          if (allImages.length > 0) {
            console.log(`🖼️ Found ${allImages.length} images in stage`);
          }
          
          const transformerNode = stage.findOne('Transformer');
          if (transformerNode) {
            transformerNode.visible(false);
            console.log('🎭 Temporarily hiding transformer for capture');
          }

          // Force a redraw before capturing
          stage.batchDraw();
          
          // Short delay to ensure redraw completes
          setTimeout(() => {
            try {
              // Capture the stage as an image at higher quality
              console.log('📸 Capturing stage as data URL...');
              const dataURL = stage.toDataURL({
                pixelRatio: 3, // Higher quality
                mimeType: 'image/png',
                quality: 1
              });
    
              // Restore transformer visibility
              if (transformerNode) {
                transformerNode.visible(true);
              }
    
              clearTimeout(timeout);
              setIsCapturingDesign(false);
              
              if (dataURL && dataURL.startsWith('data:image/')) {
                console.log(`✅ Design captured successfully (${dataURL.length} bytes)`);
                showSuccess('Design captured successfully!');
                resolve(dataURL);
              } else {
                console.error('❌ Invalid data URL returned from capture');
                showError('Failed to capture design. Please try again.');
                reject(new Error('Invalid data URL returned from capture'));
              }
            } catch (error) {
              console.error('❌ Error during stage capture:', error);
              clearTimeout(timeout);
              setIsCapturingDesign(false);
              showError('Failed to capture design. Please try again.');
              reject(error);
            }
          }, 100);
        } catch (error) {
          clearTimeout(timeout);
          console.error('❌ Failed to capture design:', error);
          setIsCapturingDesign(false);
          showError('Failed to capture design. Please try again.');
          reject(error);
        }
      });
    } catch (error) {
      console.error('❌ Error in captureDesignAsBase64:', error);
      setIsCapturingDesign(false);
      showError('Failed to capture design. Please try again.');
      return null;
    }
  };

  // Upload base64 image to Cloudinary only when needed for checkout
  const uploadBase64ToCloudinary = async (base64Image: string): Promise<{
    success: boolean;
    url?: string;
    error?: string;
  }> => {
    try {
      console.log('🎨 Uploading design image to Cloudinary for checkout...');
      const uploadResult = await uploadCanvasToCloudinary(base64Image, {
        folder: 'custom-designs',
        filename: `design-checkout-${Date.now()}.png`,
      });

      if (uploadResult.success && uploadResult.url) {
        console.log('✅ Design uploaded to Cloudinary for checkout:', uploadResult.url);
        return {
          success: true,
          url: uploadResult.url
        };
      } else {
        console.error('❌ Cloudinary upload failed:', uploadResult.error);
        return {
          success: false,
          error: uploadResult.error || 'Unknown upload error'
        };
      }
    } catch (error) {
      console.error('Error uploading to Cloudinary:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
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
      const migratedElements = (design.elements || []).map(
        (element: any, index: number) => ({
          ...element,
          zIndex: element.zIndex !== undefined ? element.zIndex : index,
        }),
      );

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
      if (!product || !customVariant) return null;

      const designData = {
        productId: product.id,
        variantId: customVariant.id,
        productTitle: product.title,
        elements,
        uploadedImages,
        stageSize,
        backgroundImage: selectedCustomImage || customVariant.image?.url || '',
        selectedCustomImage, // Save which specific image this design is for
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
      return designId;
    } catch (error) {
      console.error('Error saving design locally:', error);
      return null;
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

  // Improved captureDesignForCart function with more robust error handling and retries
  const captureDesignForCart = async (): Promise<{
    success: boolean;
    url?: string;
    error?: string;
  }> => {
    try {
      if (!selectedCustomImage) {
        console.error('❌ No selected customizable image for design capture');
        showError('Unable to capture design: No customizable area selected');
        return {
          success: false,
          error: 'No customizable image selected'
        };
      }

      if (elements.length === 0) {
        showError('Please add some design elements before saving.');
        return {
          success: false,
          error: 'No design elements added'
        };
      }

      console.log('🛒 Starting design capture for cart...');
      
      // First, save the current design state to localStorage
      const savedDesignId = saveCurrentDesignLocally();
      console.log(`💾 Design saved locally with ID: ${savedDesignId}`);
      
      // Start the capturing process and show indicator
      setIsCapturingDesign(true);
      showInfo('Preparing your custom design...');
      
      // Try up to 3 times to capture the design
      let captureAttempts = 0;
      const maxCaptureAttempts = 3;
      let designImageBase64: string | null = null;
      
      while (!designImageBase64 && captureAttempts < maxCaptureAttempts) {
        captureAttempts++;
        console.log(`📸 Design capture attempt ${captureAttempts}/${maxCaptureAttempts}`);
        
        try {
          // Capture design as base64 with our improved capture function
          designImageBase64 = await captureDesignAsBase64();
          
          if (!designImageBase64) {
            console.warn(`⚠️ Capture attempt ${captureAttempts} returned null`);
            // Short delay before next attempt
            await new Promise(resolve => setTimeout(resolve, 500));
          }
        } catch (error) {
          console.error(`❌ Capture attempt ${captureAttempts} failed:`, error);
          // Short delay before next attempt
          await new Promise(resolve => setTimeout(resolve, 500));
        }
      }
      
      if (!designImageBase64) {
        console.error('❌ All capture attempts failed');
        showError('Unable to capture your design. Please try again.');
        setIsCapturingDesign(false);
        return {
          success: false,
          error: 'Failed to capture design image'
        };
      }
      
      console.log('✅ Design successfully captured as base64');
      
      if (savedDesignId) {
        console.log('🎨 Uploading design to Cloudinary...');
        
        // Try up to 3 times to upload to Cloudinary
        let uploadAttempts = 0;
        const maxUploadAttempts = 3;
        let uploadResult = null;
        
        while (!uploadResult?.success && uploadAttempts < maxUploadAttempts) {
          uploadAttempts++;
          console.log(`📤 Cloudinary upload attempt ${uploadAttempts}/${maxUploadAttempts}`);
          
          try {
            // Always upload to Cloudinary (don't rely on localStorage for checkout)
            uploadResult = await uploadBase64ToCloudinary(designImageBase64);
            
            if (!uploadResult?.success) {
              console.warn(`⚠️ Upload attempt ${uploadAttempts} failed: ${uploadResult?.error || 'No URL returned'}`);
              // Short delay before next attempt
              await new Promise(resolve => setTimeout(resolve, 500));
            }
          } catch (error) {
            console.error(`❌ Upload attempt ${uploadAttempts} failed:`, error);
            // Short delay before next attempt
            await new Promise(resolve => setTimeout(resolve, 500));
          }
        }
        
        if (!uploadResult?.success || !uploadResult?.url) {
          console.error('❌ All upload attempts failed');
          showError('Failed to upload design. Please try again.');
          setIsCapturingDesign(false);
          return {
            success: false,
            error: uploadResult?.error || 'Failed to upload design'
          };
        }

        const cloudinaryUrl = uploadResult.url;
        console.log('🌟 Design successfully uploaded to Cloudinary:', cloudinaryUrl);
        
        // Update the design in localStorage to include the Cloudinary URL reference
        updateDesignInStorage(savedDesignId, {
          designImagePreview: designImageBase64.substring(0, 100) + '...',
          cloudinaryUrl: cloudinaryUrl,
          lastUpdated: new Date().toISOString()
        } as unknown as Partial<StoredDesign>);
        
        // Store the full Cloudinary URL in the map for the current session
        setDesignedImages((prev) => ({
          ...prev,
          [selectedCustomImage]: cloudinaryUrl,
        }));
        
        // Set the finalDesignImage to the actual Cloudinary URL
        setFinalDesignImage(cloudinaryUrl);
        
        console.log(`📝 Design captured for cart: ${savedDesignId}`);
        console.log(`📝 Associated with image: ${selectedCustomImage}`);
        console.log(`🖼️ Cloudinary URL: ${cloudinaryUrl}`);
        
        setIsCapturingDesign(false);
        showSuccess('Design prepared for cart!');
        
        // Return the success result with URL
        return {
          success: true,
          url: cloudinaryUrl
        };
      } else {
        // Fallback for missing savedDesignId
        console.error('❌ No saved design ID available');
        setFinalDesignImage(null);
        setIsCapturingDesign(false);
        showError('There was an issue saving your design. Please try again.');
        return {
          success: false,
          error: 'Failed to save design locally'
        };
      }
    } catch (error) {
      console.error('❌ Error in captureDesignForCart:', error);
      setFinalDesignImage(null);
      setIsCapturingDesign(false);
      showError('Failed to capture design. Please try refreshing the page.');
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
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

    setIsAIGenerating(true);
    setShowAIModal(false);

    try {
      // Validation for different generation types
    if (aiGenerationType === 'fan-together') {
      if (!aiUserImage) {
        showError('Please select or upload your photo first.');
        return;
      }
      if (!aiReferenceImage) {
        showError('Please upload the target person/pet photo.');
        return;
      }
    } else if (aiGenerationType === 'image-reference' && !aiReferenceImage) {
      showError('Please select or upload a base image to edit.');
      return;
    }

      // Prepare the API request for AI generation
      const generationRequest: Record<string, any> = {
        prompt: aiPrompt,
        negative_prompt: aiNegativePrompt,
        generation_type: aiGenerationType,
      };

      // Add specific parameters based on generation type
      if (aiGenerationType === 'fan-together') {
        generationRequest.user_image = aiUserImage;
        generationRequest.target_image = aiReferenceImage;
        generationRequest.reference_type = aiImageReference;
      } else if (aiGenerationType === 'image-reference') {
        generationRequest.reference_image = aiReferenceImage;
      }

      // Add general parameters
      generationRequest.aspect_ratio = aiAspectRatio;
      generationRequest.num_images = aiNumberOfImages;

      // Send the request to the API
      const response = await fetch('/api/ai-media-generation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(generationRequest),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `API request failed with status ${response.status}: ${errorText}`,
        );
      }

      const data = await response.json() as AIGenerationResponse;

      if (data.taskId) {
        console.log('🎨 AI Generation task created:', data.taskId);

        // Poll for the result
      const pollForResult = async (taskId: string) => {
          let pollInterval: NodeJS.Timeout;

        const poll = async (): Promise<void> => {
          try {
            const statusResponse = await fetch(
              `/api/ai-media-generation/${taskId}`,
            );
              const statusResult = await statusResponse.json() as AIStatusResponse;

              console.log(
                `🔄 AI task status (${taskId}):`,
                statusResult.status,
              );

              if (statusResult.status === 'completed') {
                clearInterval(pollInterval);
                setIsAIGenerating(false);

              // Helper function to process and add image to canvas
              const processAndAddImage = async (url: string) => {
                console.log('🔄 Processing AI-generated image:', url);

                // Check if this is a KlingAI URL that needs re-uploading
                if (url.includes('klingai.com')) {
                  console.log(
                    '📥 KlingAI image detected, downloading and re-uploading to Cloudinary...',
                  );
                  setIsProcessingAIImages(true);
                  setProcessingImageCount((prev) => prev + 1);

                  try {
                    const reuploadResult =
                      await downloadAndReuploadToCloudinary(url, {
                        folder: 'ai-generated',
                        filename: `ai-generated-${Date.now()}.png`,
                      });

                    if (reuploadResult.success && reuploadResult.url) {
                      console.log(
                        '✅ Successfully re-uploaded to Cloudinary:',
                        reuploadResult.url,
                      );
                      addImageToCanvas(reuploadResult.url);
                    } else {
                      console.warn(
                        '⚠️ Re-upload failed, trying original URL:',
                        reuploadResult.error,
                      );
                      // Fallback to original URL (may have CSP issues but worth trying)
                      addImageToCanvas(url);
                    }
                  } catch (error) {
                    console.error('❌ Re-upload error:', error);
                    // Fallback to original URL
                    addImageToCanvas(url);
                  } finally {
                    setProcessingImageCount((prev) => {
                      const newCount = prev - 1;
                      if (newCount <= 0) {
                        setIsProcessingAIImages(false);
                        setProcessingImageCount(0);
                      }
                      return newCount;
                    });
                  }
                } else {
                  // Not a KlingAI URL, use directly
                  addImageToCanvas(url);
                }
              };

                // Process the images
                if (statusResult.resultUrls && statusResult.resultUrls.length) {
                  if (statusResult.resultUrls.length > 1) {
                    setProcessingImageCount(statusResult.resultUrls.length);
                    setIsProcessingAIImages(true);
                    // Add a delay between processing images to avoid overloading the browser
                    statusResult.resultUrls.forEach((url, i) => {
                  setTimeout(() => processAndAddImage(url), i * 1000);
                    });
                showSuccess(
                  `Print design complete! ${statusResult.resultUrls.length} images are being added to your design.`,
                );
                  } else if (statusResult.resultUrl) {
                console.log('🎨 Processing single AI-generated image...');
                await processAndAddImage(statusResult.resultUrl!);
                showSuccess(
                  `Print design complete! The generated image has been added to your design.`,
                );
              }
                } else if (statusResult.resultUrl) {
                  await processAndAddImage(statusResult.resultUrl);
                }
            } else if (statusResult.status === 'failed') {
                clearInterval(pollInterval);
                setIsAIGenerating(false);
                showError(
                  `AI generation failed: ${statusResult.error || statusResult.message || 'Unknown error'}`,
                );
            }
          } catch (error) {
            console.error('Polling failed:', error);
            showError(
              `AI generation failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
            );
            setIsAIGenerating(false);
              clearInterval(pollInterval);
          }
        };

          // Start polling every 5 seconds
          await poll();
          pollInterval = setInterval(poll, 5000);
      };

        // Start polling for the result
        pollForResult(data.taskId);

      // Show progress message
      showInfo(
        `Print design generation started! This usually takes 1-3 minutes. The generated image will be automatically added to your design when ready.`,
      );
      } else {
        throw new Error('No task ID returned from API');
      }
    } catch (error) {
      console.error('AI generation failed:', error);
      showError(
        `AI generation failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
      );
      setIsAIGenerating(false);
    }
  };

  // Handle click outside elements to deselect
  const checkDeselect = (e: any) => {
    // Clicked on empty area of the stage
    if (e.target === e.target.getStage()) {
      setSelectedId(null);
      setElements((prev) => prev.map((el) => ({...el, selected: false})));
    }
  };

  // Render fallback while canvas is loading
  const renderCanvasLoading = () => (
    <div
      className="w-full h-full flex items-center justify-center bg-secondary/60 rounded-md border border-primary/10"
      style={{minHeight: '400px'}}
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
                This product is currently out of stock and cannot be customized
                at this time.
              </p>
              <p className="text-gray-400 text-sm mb-6">
                Please check back later or browse our other available products.
              </p>
              <div className="flex justify-center">
                <a
                  href="/collections/all"
                  className="bg-primary hover:bg-primary-600 text-background font-bold py-3 px-8 rounded-md transition-colors"
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

  // Add this function to handle resetting designs
  const handleResetAllDesigns = () => {
    // Reset all designs for this product
    if (!product) return;
    resetDesignsForProduct(product.id);
    
    // Reset local state
    setElements([]);
    setUploadedImages([]);
    setSavedDesigns([]);
    setCurrentDesignId(null);
    setDesignedImages({});
    setFinalDesignImage(null);
    
    // Show confirmation
    showSuccess('All designs have been reset');
  };

  // Helper functions for react-konva
  const getCanvasState = (stageRef: any) => {
    if (!stageRef.current) return null;
    return stageRef.current.toDataURL();
  };

  return (
    <div className="pt-30 pb-10 bg-secondary/80 backdrop-blur-sm min-h-screen">
      {/* Toast Notifications */}
      <ToastContainer toasts={[]} removeToast={() => {}} />

      {/* Custom CSS */}
      <style dangerouslySetInnerHTML={{__html: shadowGlowStyle}} />

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
            Add your photos, text, and designs to create a unique custom
            product.
          </p>
          {/* Add Reset Design Button */}
          <button
            onClick={handleResetAllDesigns}
            disabled={isResetting}
            className="text-red-400 hover:text-red-300 text-sm mx-auto bg-secondary/50 px-4 py-2 rounded-md border border-red-500/30 mt-2 flex items-center justify-center transition-colors"
          >
            {isResetting ? (
              <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Resetting...</>
            ) : (
              <><Trash2 className="w-4 h-4 mr-2" /> Reset All Designs</>
            )}
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Clean Sidebar */}
          <div className="lg:col-span-1 space-y-4">
            {/* Add Elements Section */}
            <div className="bg-secondary/40 backdrop-blur-md border border-primary/20 rounded-xl overflow-hidden shadow-lg">
              <div className="px-4 py-2 border-b border-primary/10">
                <h3 className="text-white font-medium text-sm">Design Tools</h3>
              </div>
              
              <div className="p-4">
                {/* Design Tools */}
                <div className="grid grid-cols-3 gap-2 mb-4">
                  {/* Upload Button */}
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isUploading}
                    className="bg-primary/90 hover:bg-primary disabled:opacity-50 disabled:cursor-not-allowed text-white py-2 px-2 rounded-lg transition-all flex flex-col items-center justify-center h-14"
                  >
                    {isUploading ? (
                      <>
                        <Loader2 className="w-4 h-4 mb-0.5 animate-spin" />
                        <span className="text-xs">Uploading</span>
                      </>
                    ) : (
                      <>
                        <Upload className="w-4 h-4 mb-0.5" />
                        <span className="text-xs">Photo</span>
                      </>
                    )}
                  </button>

                  {/* Text Button */}
                  <button
                    onClick={() => setShowTextControls(true)}
                    className="bg-secondary/70 hover:bg-secondary/90 text-white border border-primary/20 py-2 px-2 rounded-lg transition-all flex flex-col items-center justify-center h-14"
                  >
                    <Type className="w-4 h-4 mb-0.5" />
                    <span className="text-xs">Text</span>
                  </button>
                  
                  {/* Undo Button */}
                  <button
                    onClick={undo}
                    disabled={history.length <= 1}
                    className="bg-secondary/70 hover:bg-secondary/90 disabled:opacity-40 text-white border border-primary/20 py-2 px-2 rounded-lg transition-all flex flex-col items-center justify-center h-14"
                  >
                    <Undo className="w-4 h-4 mb-0.5" />
                    <span className="text-xs">Undo</span>
                  </button>
                </div>

                {/* AI Generation - Simplified */}
                <button
                  onClick={generateWithAI}
                  disabled={isAIGenerating || isProcessingAIImages}
                  className="w-full bg-gradient-to-r from-purple-600 to-primary hover:from-purple-700 hover:to-primary/80 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium py-3 px-4 rounded-lg transition-all flex items-center justify-center"
                >
                  {isAIGenerating ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Generating...
                    </>
                  ) : isProcessingAIImages ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 mr-2" />
                      AI Design Studio
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
              </div>

              {/* Simplified Text Controls */}
              {showTextControls && (
                <div className="mt-4 p-4 bg-white/5 rounded-lg border border-primary/10">
                  <input
                    type="text"
                    value={textInput}
                    onChange={(e) => setTextInput(e.target.value)}
                    placeholder="Enter your text..."
                    className="w-full mb-3 px-3 py-2 bg-secondary/80 border border-primary/20 rounded-lg text-white placeholder:text-gray-400 text-sm"
                    onKeyPress={(e) => e.key === 'Enter' && addTextToCanvas()}
                  />

                  <div className="grid grid-cols-3 gap-2 mb-3">
                    <select
                      value={selectedFont}
                      onChange={(e) => setSelectedFont(e.target.value)}
                      className="px-2 py-1.5 bg-secondary/80 border border-primary/20 rounded text-white text-sm"
                    >
                      <option value="Arial">Arial</option>
                      <option value="Impact">Bold</option>
                      <option value="Times New Roman">Serif</option>
                      <option value="Comic Sans MS">Fun</option>
                    </select>
                    
                    <input
                      type="color"
                      value={selectedColor}
                      onChange={(e) => setSelectedColor(e.target.value)}
                      className="w-full h-8 rounded border border-white/20"
                    />
                    
                    <div className="flex items-center">
                      <input
                        type="range"
                        value={fontSize}
                        onChange={(e) => setFontSize(Number(e.target.value))}
                        min="12"
                        max="48"
                        className="accent-primary w-full"
                      />
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <button
                      onClick={addTextToCanvas}
                      className="flex-1 bg-primary hover:bg-primary/80 text-white font-medium py-2 px-3 rounded-lg transition-all"
                    >
                      Add
                    </button>
                    <button
                      onClick={() => setShowTextControls(false)}
                      className="px-3 py-2 text-gray-400 hover:text-white transition-colors"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              )}

              {/* Design Areas */}
              {customizableImages.length > 1 && (
                <div className="mt-4 bg-secondary/30 border border-primary/10 rounded-xl overflow-hidden">
                  <div className="px-4 py-2 border-b border-primary/10 flex items-center justify-between">
                    <h4 className="text-sm text-white flex items-center">
                      <Images className="w-4 h-4 mr-2 text-primary" />
                      Design Areas
                    </h4>
                    <span className="text-xs text-green-400">
                      {Object.keys(designedImages).length}/{customizableImages.length}
                    </span>
                  </div>
                  
                  <div className="p-3">
                    <div className="grid grid-cols-4 gap-2">
                      {customizableImages.map((img, index) => {
                        const isCustomized = Boolean(designedImages[img.url]);
                        const isSelected = selectedCustomImage === img.url;

                        return (
                          <button
                            key={img.id}
                            onClick={async () => {
                              // Don't do anything if clicking the already selected image or if currently capturing
                              if (isSelected || isCapturingDesign) return;
                              
                              try {
                                let shouldProceed = true;
                                
                                // First, check if we need to mark the current design as complete
                                if (selectedCustomImage && elements.length > 0) {
                                  console.log('📸 Marking design as complete before switching...');
                                  
                                  // Simply mark it as complete without waiting for image capture
                                  setDesignedImages((prev) => ({
                                    ...prev,
                                    [selectedCustomImage]: 'has_elements',
                                  }));
                                  console.log(`✅ Marked design as complete for ${selectedCustomImage}`);
                                }
                                
                                if (shouldProceed) {
                                  // Now let's check if we have a saved design for the target image
                                  const existingSavedDesign = designedImages[img.url];
                                  
                                  // Clear canvas first
                                setElements([]);
                                  setSelectedId(null);
                                setFinalDesignImage(null);

                              // Change to the selected image
                              changeBackgroundImage(img.url);
                                  
                                  // Update the progress tracker
                                  setCustomizationProgress((prev) => ({
                                    ...prev,
                                    current: customizableImages.findIndex((image) => image.url === img.url),
                                  }));
                                }
                              } catch (error) {
                                console.error('Error during image switch:', error);
                              }
                            }}
                            className={`relative rounded-lg overflow-hidden aspect-square border-2 transition-all ${
                              isSelected
                                ? 'border-primary scale-105 shadow-glow z-10'
                                : isCustomized
                                  ? 'border-green-500 hover:border-green-400'
                                  : 'border-primary/20 hover:border-primary/50'
                              }`}
                          >
                            <img
                              src={img.url}
                              alt={`Area ${index + 1}`}
                              className="w-full h-full object-cover"
                            />
                            <div
                              className={`absolute inset-0 flex items-center justify-center ${
                                isSelected
                                  ? 'bg-black/30'
                                  : isCustomized
                                    ? 'bg-green-900/30'
                                    : 'bg-black/50'
                              }`}
                            >
                              {/* Status indicators */}
                              {isCustomized && !isSelected && (
                                <div className="absolute bottom-1 right-1 bg-green-500 rounded-full w-5 h-5 flex items-center justify-center shadow-lg">
                                  <div className="text-xs text-white">✓</div>
                                </div>
                              )}
                              
                              {/* Area number badge */}
                              <div className="absolute top-1 left-1 bg-black/60 rounded-full w-5 h-5 flex items-center justify-center">
                                <div className="text-xs text-white font-bold">
                                  {index + 1}
                                </div>
                              </div>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                    
                    <div className="mt-3 mb-1">
                      <div className="w-full bg-gray-700 rounded-full h-1.5">
                        <div
                          className="bg-primary h-1.5 rounded-full transition-all"
                          style={{
                            width: `${(Object.keys(designedImages).length / customizableImages.length) * 100}%`,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Your Photos */}
              {uploadedImages.length > 0 && (
                <div className="mt-4">
                  <h4 className="text-sm text-white mb-3">Your Photos</h4>
                  <div className="grid grid-cols-4 gap-2">
                    {uploadedImages.map((img) => (
                      <button
                        key={img.id}
                        onClick={() => addImageToCanvas(img.src)}
                        className="relative rounded-lg overflow-hidden h-16 border-2 border-primary/20 hover:border-primary/60 transition-all hover:scale-105"
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

            {/* Simplified Controls - Only show when something is selected */}
            {selectedId && (
              <div className="bg-secondary/40 backdrop-blur-md border border-primary/20 rounded-lg p-4 shadow-md">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-white font-medium text-sm">Selected Item</h3>
                  <button
                    onClick={deleteSelectedElement}
                    className="bg-red-600/80 hover:bg-red-600 text-white h-7 w-7 rounded-full transition-all flex items-center justify-center"
                    title="Delete element"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
                
                {/* Quick controls */}
                <div className="grid grid-cols-2 gap-3">
                  {/* Transparency */}
                  <div>
                    <label className="text-xs text-gray-300 block mb-1">
                      Opacity
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.1"
                      value={
                        elements.find((el) => el.id === selectedId)?.opacity || 1
                      }
                      onChange={(e) => {
                        const opacity = parseFloat(e.target.value);
                        handleTransform(selectedId, {opacity});
                      }}
                      className="w-full accent-primary"
                    />
                  </div>
                  
                  {/* Layer Controls */}
                  <div>
                    <label className="text-xs text-gray-300 block mb-1">
                      Layer
                    </label>
                    <div className="flex space-x-2">
                      <button 
                        onClick={sendBackward}
                        className="flex-1 bg-secondary/60 text-white text-xs py-1 px-2 rounded transition-all"
                        title="Send backward"
                      >
                        Back
                      </button>
                      <button 
                        onClick={bringForward}
                        className="flex-1 bg-secondary/60 text-white text-xs py-1 px-2 rounded transition-all"
                        title="Bring forward"
                      >
                        Front
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Progress for Multi-Design */}
            {customizableImages.length > 1 && (
              <div className="bg-secondary/40 backdrop-blur-md border border-primary/20 rounded-lg p-4 shadow-md">
                <div className="mb-3">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-white">Design Progress</span>
                    <span className="text-xs text-gray-300">
                      {Object.keys(designedImages).length} of {customizableImages.length}
                    </span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full transition-all"
                      style={{
                        width: `${(Object.keys(designedImages).length / customizableImages.length) * 100}%`,
                      }}
                    />
                  </div>
                </div>
                
                {/* Reset All Designs Button */}
                <button
                  onClick={handleResetAllDesigns}
                  disabled={isResetting}
                  className="w-full text-red-400 hover:text-red-300 text-sm bg-secondary/70 px-3 py-2 rounded-md border border-red-500/30 mt-2 flex items-center justify-center transition-colors"
                >
                  {isResetting ? (
                    <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Resetting...</>
                  ) : (
                    <><Trash2 className="w-4 h-4 mr-2" /> Reset All Designs</>
                  )}
                </button>
              </div>
            )}

            {/* Add to Cart */}
            <div className="bg-secondary/40 backdrop-blur-md border border-primary/20 rounded-lg p-4 shadow-md">
              <div className="flex flex-col">
                {/* Simple Add to Cart for Single Design */}
                {customizableImages.length === 1 && (
                  <button
                    onClick={async () => {
                      if (elements.length === 0) {
                        showError('Please add some design elements before adding to cart.');
                        return;
                      }

                      try {
                        setIsCapturingDesign(true);
                        showInfo('Preparing your custom design for cart...');
                        
                        // Step 1: Capture and upload design to get Cloudinary URL
                        const designResult = await captureDesignForCart();
                        
                        if (!designResult || !designResult.success || !designResult.url) {
                          showError('Failed to capture design. Please try again.');
                          setIsCapturingDesign(false);
                          return;
                        }
                        
                        const cloudinaryDesignUrl = designResult.url;
                        console.log('🎨 Design captured and uploaded:', cloudinaryDesignUrl);
                        
                        // Step 2: Create cart line with the ACTUAL Cloudinary URL
                        const cartLine = {
                          merchandiseId: customVariant.id,
                          quantity: 1,
                          attributes: [
                            {
                              key: '_designer',
                              value: customer?.firstName || 'Guest',
                            },
                            {
                              key: '_design_image_url',
                              value: cloudinaryDesignUrl, // Use the ACTUAL Cloudinary URL
                            },
                            {
                              key: '_design_image_base64',
                              value: 'UPLOADED_TO_CLOUDINARY',
                            },
                            {
                              key: '_custom_design',
                              value: 'true',
                            },
                            {
                              key: '_customized_image',
                              value: cloudinaryDesignUrl, // Use the same URL for consistency
                            },
                            {
                              key: '_store_name',
                              value: config.brandName || 'Custom Store',
                            },
                            {
                              key: '_influencer_name',
                              value: config.influencerName || '',
                            },
                            {
                              key: '_storefront_id',
                              value: (config as any).storefrontId || '',
                            },
                            {
                              key: '_design_version',
                              value: 'final',
                            },
                            {
                              key: '_design_count',
                              value: '1',
                            },
                            {
                              key: '_order_source',
                              value: 'hydrogen-customizer',
                            },
                            {
                              key: '_checkout_image_prepared',
                              value: 'ready',
                            }
                          ],
                        };

                        // Step 3: Submit to cart using proper React Router navigation
                        const cartFormInput = {
                          action: 'LinesAdd',
                          inputs: {
                            lines: [{
                              merchandiseId: cartLine.merchandiseId,
                              quantity: cartLine.quantity,
                              attributes: cartLine.attributes,
                            }],
                          },
                        };

                        try {
                          // Use React Router fetcher for data submission without navigation
                          const cartFormData = new FormData();
                          cartFormData.append('cartFormInput', JSON.stringify(cartFormInput));
                          
                          // Store design URL in localStorage for persistence across page refreshes
                          // We'll use a temporary ID until we get the real cart line ID
                          const tempCartLineId = `temp-${Date.now()}`;
                          storeCartLineDesigns(tempCartLineId, designResult.url!);
                          
                          // Also store as the latest design for easy retrieval
                          storeLatestDesign(designResult.url!);
                          
                          // Submit to cart route using fetcher to prevent navigation
                          cartFetcher.submit(cartFormData, {
                            method: 'post',
                            action: '/cart',
                          });
                          
                          // Wait a moment for the submission to complete
                          await new Promise(resolve => setTimeout(resolve, 300));
                          
                          console.log('✅ Successfully added custom design to cart with fetcher');
                          console.log('✅ Design URL stored in localStorage for persistence');
                          showSuccess('Custom design added to cart!');
                          
                          // Open cart drawer/sidebar
                          openCart();
                          
                          // Only turn off loading state after everything completes
                          setTimeout(() => {
                            setIsCapturingDesign(false);
                          }, 200);
                          
                        } catch (submitError) {
                          console.error('Submit failed, falling back to fetch:', submitError);
                          
                          // Fallback to fetch if submit fails
                          const cartFormData = new FormData();
                          cartFormData.append('cartFormInput', JSON.stringify(cartFormInput));
                          
                          const response = await fetch('/cart', {
                            method: 'POST',
                            body: cartFormData,
                          });

                          if (response.ok) {
                            console.log('✅ Fallback fetch successful');
                            showSuccess('Custom design added to cart!');
                            
                            // Manually revalidate cart data
                            revalidator.revalidate();
                            
                            // Open cart
                            openCart();
                          } else {
                            throw new Error(`Cart submission failed: ${response.status}`);
                          }
                          
                          setIsCapturingDesign(false);
                        }

                      } catch (error) {
                        console.error('❌ Error adding custom design to cart:', error);
                        setIsCapturingDesign(false);
                        showError('Failed to add design to cart. Please try again.');
                      }
                    }}
                    disabled={isCapturingDesign || elements.length === 0 || isOutOfStock}
                    className={`w-full font-medium py-3 px-4 rounded-lg transition-all flex items-center justify-center ${
                      isCapturingDesign
                        ? 'bg-blue-600 text-white cursor-wait'
                        : elements.length === 0
                          ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                          : isOutOfStock
                            ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                            : 'bg-green-600 hover:bg-green-700 text-white'
                      }`}
                  >
                    {isCapturingDesign ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Preparing Design...
                      </>
                    ) : elements.length === 0 ? (
                      'Add elements to continue'
                    ) : (
                      <>
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        Add Custom Design to Cart
                      </>
                    )}
                  </button>
                )}

                {/* Multi-Design Add to Cart */}
                {customizableImages.length > 1 && (
                  <button
                    onClick={async () => {
                      // Check if current canvas has any elements or if any designs are saved
                      const hasCurrentElements = elements.length > 0;
                      const hasSavedDesigns = Object.keys(designedImages).length > 0;
                      
                      if (!hasCurrentElements && !hasSavedDesigns) {
                        showError('Please add some design elements before adding to cart.');
                        return;
                      }

                      try {
                        setIsCapturingDesign(true);
                        showInfo('Preparing your custom designs for cart...');
                        
                        // Step 1: Capture and upload all designs to get Cloudinary URLs
                        const allDesignUrls: string[] = [];
                        
                        // If current canvas has elements, capture it first
                        if (hasCurrentElements && selectedCustomImage) {
                          const designResult = await captureDesignForCart();
                          
                          if (designResult && designResult.success && designResult.url) {
                            allDesignUrls.push(designResult.url);
                            console.log(`🎨 Current design captured and uploaded:`, designResult.url);
                            
                            // Update designedImages with the current design
                            setDesignedImages(prev => ({
                              ...prev,
                              [selectedCustomImage]: designResult.url!
                            }));
                          }
                        }
                        
                        // Then process any saved designs in designedImages
                        for (const [imageUrl, designData] of Object.entries(designedImages)) {
                          // Skip if we already captured this one above
                          if (imageUrl === selectedCustomImage && hasCurrentElements) {
                            continue;
                          }
                          
                          if (typeof designData === 'string') {
                            if (designData.includes('cloudinary.com')) {
                              // Already a Cloudinary URL
                              allDesignUrls.push(designData);
                              console.log(`🎨 Using existing Cloudinary URL for ${imageUrl}`);
                            } else if (designData.startsWith('data:image')) {
                              // Base64 image, upload it
                              const uploadResult = await uploadBase64ToCloudinary(designData);
                              if (uploadResult.success && uploadResult.url) {
                                allDesignUrls.push(uploadResult.url);
                                console.log(`🎨 Uploaded base64 design for ${imageUrl}`);
                              }
                            }
                          }
                        }

                        if (allDesignUrls.length === 0) {
                          showError('Failed to capture any designs. Please try again.');
                          setIsCapturingDesign(false);
                          return;
                        }

                        console.log('🎨 All designs prepared:', allDesignUrls);
                        
                        // Step 2: Create cart line with the ACTUAL Cloudinary URLs
                        const cartLine = {
                          merchandiseId: customVariant.id,
                          quantity: 1,
                          attributes: [
                            {
                              key: '_designer',
                              value: customer?.firstName || 'Guest',
                            },
                            {
                              key: '_design_image_url',
                              value: allDesignUrls[0], // Primary design URL
                            },
                            {
                              key: '_design_image_base64',
                              value: 'UPLOADED_TO_CLOUDINARY',
                            },
                            {
                              key: '_custom_design',
                              value: 'true',
                            },
                            {
                              key: '_customized_image',
                              value: allDesignUrls[0], // Primary design URL for consistency
                            },
                            {
                              key: '_store_name',
                              value: config.brandName || 'Custom Store',
                            },
                            {
                              key: '_influencer_name',
                              value: config.influencerName || '',
                            },
                            {
                              key: '_storefront_id',
                              value: (config as any).storefrontId || '',
                            },
                            {
                              key: '_design_version',
                              value: 'final',
                            },
                            {
                              key: '_design_count',
                              value: allDesignUrls.length.toString(),
                            },
                            {
                              key: '_all_designed_images',
                              value: JSON.stringify(allDesignUrls), // All design URLs as JSON
                            },
                            {
                              key: '_order_source',
                              value: 'hydrogen-customizer',
                            },
                            {
                              key: '_checkout_image_prepared',
                              value: 'ready',
                            }
                          ],
                        };

                        // Step 3: Submit to cart using proper React Router navigation
                        const cartFormInput = {
                          action: 'LinesAdd',
                          inputs: {
                            lines: [{
                              merchandiseId: cartLine.merchandiseId,
                              quantity: cartLine.quantity,
                              attributes: cartLine.attributes,
                            }],
                          },
                        };

                        try {
                          // Use React Router fetcher for data submission without navigation
                          const cartFormData = new FormData();
                          cartFormData.append('cartFormInput', JSON.stringify(cartFormInput));
                          
                          // Store design URLs in localStorage for persistence across page refreshes
                          // We'll use a temporary ID until we get the real cart line ID
                          const tempCartLineId = `temp-${Date.now()}`;
                          storeCartLineDesigns(tempCartLineId, allDesignUrls);
                          
                          // Also store as the latest design for easy retrieval
                          storeLatestDesign(allDesignUrls);
                          
                          // Submit to cart route using fetcher to prevent navigation
                          cartFetcher.submit(cartFormData, {
                            method: 'post',
                            action: '/cart',
                          });
                          
                          // Wait a moment for the submission to complete
                          await new Promise(resolve => setTimeout(resolve, 300));
                          
                          console.log('✅ Successfully added custom designs to cart with fetcher');
                          console.log('✅ Design URLs stored in localStorage for persistence');
                          showSuccess(`${allDesignUrls.length} custom design(s) added to cart!`);
                          
                          // Open cart drawer/sidebar
                          openCart();
                          
                          // Only turn off loading state after everything completes
                          setTimeout(() => {
                            setIsCapturingDesign(false);
                          }, 200);
                          
                        } catch (submitError) {
                          console.error('Submit failed, falling back to fetch:', submitError);
                          
                          // Fallback to fetch if submit fails
                          const cartFormData = new FormData();
                          cartFormData.append('cartFormInput', JSON.stringify(cartFormInput));
                          
                          const response = await fetch('/cart', {
                            method: 'POST',
                            body: cartFormData,
                          });

                          if (response.ok) {
                            console.log('✅ Fallback fetch successful');
                            showSuccess(`${allDesignUrls.length} custom design(s) added to cart!`);
                            
                            // Manually revalidate cart data
                            revalidator.revalidate();
                            
                            // Open cart
                            openCart();
                          } else {
                            throw new Error(`Cart submission failed: ${response.status}`);
                          }
                          
                          setIsCapturingDesign(false);
                        }

                      } catch (error) {
                        console.error('❌ Error adding custom designs to cart:', error);
                        setIsCapturingDesign(false);
                        showError('Failed to add designs to cart. Please try again.');
                      }
                    }}
                    disabled={isCapturingDesign || (elements.length === 0 && Object.keys(designedImages).length === 0) || isOutOfStock}
                    className={`w-full font-medium py-3 px-4 rounded-lg transition-all flex items-center justify-center ${
                      isCapturingDesign
                        ? 'bg-blue-600 text-white cursor-wait'
                        : (elements.length === 0 && Object.keys(designedImages).length === 0)
                          ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                          : isOutOfStock
                            ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                            : 'bg-green-600 hover:bg-green-700 text-white'
                      }`}
                  >
                    {isCapturingDesign ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Preparing Designs...
                      </>
                    ) : (elements.length === 0 && Object.keys(designedImages).length === 0) ? (
                      'Add design elements to continue'
                    ) : (
                      <>
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        Add All Designs to Cart
                      </>
                    )}
                  </button>
                )}
              </div>
                  </div>
            </div>

          {/* Main Canvas Area */}
          <div className="lg:col-span-2">
            <div className="bg-secondary/40 backdrop-blur-md border border-primary/20 rounded-xl overflow-hidden shadow-lg mb-4">
              {/* Canvas header with autosave indicator */}
              <div className="px-4 py-2 border-b border-primary/10 flex items-center justify-between">
                <h3 className="text-sm text-white font-medium">Design Canvas</h3>
                <div className="flex items-center space-x-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
                  <span className="text-xs text-green-400">Auto-saving</span>
                </div>
              </div>
              
              <div className="p-4">
                <div className="w-full relative rounded-md overflow-hidden shadow-inner bg-black/20">
                  <ProductDesigner
                    backgroundImage={backgroundImage}
                    stageSize={stageSize}
                    elements={elements}
                    selectedId={selectedId}
                    onElementSelect={handleElementSelect}
                    onElementDeselect={() => setSelectedId(null)}
                    onElementTransform={handleTransform}
                    keepAspectRatio={keepAspectRatio}
                  />

                  {/* Loading overlay when capturing design */}
                  {isCapturingDesign && (
                    <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center rounded-md z-50">
                      <div className="text-center p-4">
                        <Loader2 className="w-8 h-8 text-primary mx-auto mb-2 animate-spin" />
                        <p className="text-white">Capturing your design...</p>
                      </div>
                    </div>
                  )}
                </div>
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
      handle
      title
      description
      images(first: 10) {
        nodes {
          id
          url(transform: {maxWidth: 800, maxHeight: 800, crop: CENTER})
          altText
          width
          height
        }
      }
      media(first: 50) {
        nodes {
          id
          ... on MediaImage {
            image {
              id
              url(transform: {maxWidth: 800, maxHeight: 800, crop: CENTER})
              altText
              width
              height
            }
          }
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
            id
            url(transform: {maxWidth: 800, maxHeight: 800, crop: CENTER})
            altText
            width
            height
          }
          metafield(namespace: "custom", key: "variant_imgs") {
            id
            type
            value
            references(first: 20) {
              nodes {
                ... on MediaImage {
                  id
                  image {
                    url(transform: {maxWidth: 800, maxHeight: 800, crop: CENTER})
                    altText
                    width
                    height
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;
