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

  return new Response(JSON.stringify({ 
    product,
    customVariant,
    isOutOfStock: !customVariant.availableForSale
  }), { 
    headers: { 'Content-Type': 'application/json' }
  });
}

export default function ProductCustomizer() {
  const { product, customVariant, isOutOfStock } = useLoaderData<LoaderData>();
  const config = useConfig();
  const params = useParams();
  
  // Debug customVariant
  console.log('CustomVariant details:', {
    id: customVariant.id,
    title: customVariant.title,
    availableForSale: customVariant.availableForSale,
    price: customVariant.price,
    isOutOfStock
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
  const [isAIGenerating, setIsAIGenerating] = useState(false);
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
      // Upload to Cloudinary first
      const uploadResult = await uploadFileToCloudinary(file, {
        folder: 'user-uploads'
      });
      
      if (uploadResult.success && uploadResult.url) {
        const newImage = {
          id: `image-${Date.now()}`,
          src: uploadResult.url, // Use Cloudinary URL instead of data URL
          name: file.name
        };
        
        setUploadedImages(prev => [...prev, newImage]);
      } else {
        console.error('Failed to upload image:', uploadResult.error);
        alert('Failed to upload image. Please try again.');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Failed to upload image. Please try again.');
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
      
      // Add image to center of stage
      const newElement: CustomElement = {
        id: `canvas-image-${Date.now()}`,
        type: 'image',
        x: stageSize.width / 2,
        y: stageSize.height / 2,
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
        alert('Failed to capture design. This may be due to image loading issues. Please try refreshing the page and re-uploading your images.');
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
    // This would trigger the AI generation flow
    // For now just show the auth prompt
    setShowAIPrompt(true);
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
            <div className="bg-secondary/40 backdrop-blur-md border border-primary/20 rounded-lg p-6 shadow-md">
              <AuthPrompt
                title="Sign In Required for AI Generation"
                message={`Sign in to generate AI customized products with ${config.influencerName}.`}
                returnUrl={`/customize-product/${params.productHandle}`}
              />
            </div>
          </div>
        </div>
      </section>
    );
  }

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
            Customize Your {product.title}
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto mb-6">
            Add your photos, text, and designs to create a unique custom product.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Sidebar - Tools */}
          <div className="lg:col-span-1 space-y-4">
            {/* Media Tools Panel */}
            <div className="bg-secondary/40 backdrop-blur-md border border-primary/20 rounded-lg p-4 shadow-md">
              <h3 className="text-lg font-bold text-white mb-4">Add Media</h3>
              
              {/* Upload Button */}
              <button 
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploading}
                className="w-full mb-3 bg-secondary hover:bg-secondary/60 disabled:opacity-50 disabled:cursor-not-allowed text-white border border-primary/20 py-2 px-4 rounded-md transition-colors flex items-center justify-center"
              >
                {isUploading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Uploading...
                  </>
                ) : (
                  <>
                    <Upload className="w-4 h-4 mr-2" />
                    Upload Image
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

              {/* Text Button */}
              <button 
                onClick={() => setShowTextControls(true)}
                className="w-full mb-3 bg-secondary hover:bg-secondary/60 text-white border border-primary/20 py-2 px-4 rounded-md transition-colors flex items-center justify-center"
              >
                <Type className="w-4 h-4 mr-2" />
                Add Text
              </button>

              {/* AI Generation - Requires Auth */}
              <button 
                onClick={generateWithAI}
                className="w-full mb-3 bg-primary hover:bg-primary-600 text-background font-bold py-2 px-4 rounded-md transition-colors flex items-center justify-center"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                Generate with AI
              </button>
              
              {/* Show Text Controls when active */}
              {showTextControls && (
                <div className="mt-4 p-3 bg-secondary/60 rounded-md border border-primary/10">
                  <input
                    type="text"
                    value={textInput}
                    onChange={(e) => setTextInput(e.target.value)}
                    placeholder="Enter your text..."
                    className="w-full mb-2 px-3 py-2 bg-secondary/80 border border-primary/20 rounded-md text-white placeholder:text-gray-400"
                  />
                  
                  <div className="grid grid-cols-2 gap-2 mb-2">
                    <div>
                      <label className="text-xs text-gray-300 block mb-1">Font</label>
                      <select
                        value={selectedFont}
                        onChange={(e) => setSelectedFont(e.target.value)}
                        className="w-full px-2 py-1 bg-secondary/80 border border-primary/20 rounded-md text-white text-sm"
                      >
                        <option value="Arial">Arial</option>
                        <option value="Verdana">Verdana</option>
                        <option value="Times New Roman">Times New Roman</option>
                        <option value="Impact">Impact</option>
                        <option value="Comic Sans MS">Comic Sans</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-xs text-gray-300 block mb-1">Size</label>
                      <input
                        type="number"
                        value={fontSize}
                        onChange={(e) => setFontSize(Number(e.target.value))}
                        min="8"
                        max="72"
                        className="w-full px-2 py-1 bg-secondary/80 border border-primary/20 rounded-md text-white text-sm"
                      />
                    </div>
                  </div>
                  
                  <div className="mb-3">
                    <label className="text-xs text-gray-300 block mb-1">Color</label>
                    <div className="flex space-x-2">
                      {['#ffffff', '#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff'].map(color => (
                        <div 
                          key={color}
                          onClick={() => setSelectedColor(color)}
                          className={`w-6 h-6 rounded-full cursor-pointer ${selectedColor === color ? 'ring-2 ring-primary' : ''}`}
                          style={{ backgroundColor: color }}
                        />
                      ))}
                      <input
                        type="color"
                        value={selectedColor}
                        onChange={(e) => setSelectedColor(e.target.value)}
                        className="w-6 h-6 rounded-full"
                      />
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <button
                      onClick={addTextToCanvas}
                      className="flex-1 bg-primary hover:bg-primary-600 text-background font-bold py-1 px-3 rounded-md text-sm"
                    >
                      Add
                    </button>
                    <button
                      onClick={() => setShowTextControls(false)}
                      className="flex-1 bg-secondary hover:bg-secondary/80 text-white border border-primary/10 py-1 px-3 rounded-md text-sm"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
              
              {/* Uploaded Images Gallery */}
              {uploadedImages.length > 0 && (
                <div className="mt-4">
                  <h4 className="text-sm font-bold text-white mb-2">Your Images</h4>
                  <div className="grid grid-cols-3 gap-2">
                    {uploadedImages.map((img) => (
                      <div 
                        key={img.id}
                        onClick={() => addImageToCanvas(img.src)}
                        className="relative rounded overflow-hidden h-16 border border-primary/20 cursor-pointer hover:border-primary/50 transition-all"
                      >
                        <img 
                          src={img.src} 
                          alt={img.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            {/* Element Controls Panel */}
            <div className="bg-secondary/40 backdrop-blur-md border border-primary/20 rounded-lg p-4 shadow-md">
              <h3 className="text-lg font-bold text-white mb-4">Element Controls</h3>
              
              {selectedId ? (
                <div className="space-y-3">
                  {/* Layer Controls */}
                                      <div className="mb-2">
                      <div className="flex items-center justify-between mb-1">
                        <label className="text-xs text-gray-300">Layer Position</label>
                        <span className="text-xs text-primary font-semibold">
                          {elements.find(el => el.id === selectedId)?.zIndex !== undefined ? (elements.find(el => el.id === selectedId)!.zIndex + 1) : 0} of {elements.length}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          onClick={bringForward}
                          disabled={elements.length === 0 || !selectedId || (elements.length > 0 && elements.find(el => el.id === selectedId)?.zIndex === Math.max(...elements.map(el => el.zIndex)))}
                          className="bg-secondary hover:bg-secondary/60 disabled:opacity-50 disabled:cursor-not-allowed text-white border border-primary/20 py-2 px-3 rounded-md transition-colors flex items-center justify-center text-sm"
                        >
                          ↑ Forward
                        </button>
                        <button
                          onClick={sendBackward}
                          disabled={elements.length === 0 || !selectedId || (elements.length > 0 && elements.find(el => el.id === selectedId)?.zIndex === Math.min(...elements.map(el => el.zIndex)))}
                          className="bg-secondary hover:bg-secondary/60 disabled:opacity-50 disabled:cursor-not-allowed text-white border border-primary/20 py-2 px-3 rounded-md transition-colors flex items-center justify-center text-sm"
                        >
                          ↓ Backward
                        </button>
                      </div>
                    </div>
                  
                  <button
                    onClick={deleteSelectedElement}
                    className="w-full bg-red-600/70 hover:bg-red-600/90 text-white py-2 px-4 rounded-md transition-colors flex items-center justify-center"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete Element
                  </button>
                  
                  {/* Aspect Ratio Lock */}
                  <div className="mb-3">
                    <label className="flex items-center justify-between text-xs text-gray-300">
                      <span>Aspect Ratio Lock</span>
                      <button
                        onClick={() => setKeepAspectRatio(!keepAspectRatio)}
                        className={`text-xs px-2 py-1 rounded ${keepAspectRatio ? 'bg-primary text-background' : 'bg-secondary/60 text-white border border-primary/20'}`}
                      >
                        {keepAspectRatio ? '🔒 Locked' : '🔓 Unlocked'}
                      </button>
                    </label>
                    <p className="text-xs text-gray-400 mt-1">
                      {keepAspectRatio 
                        ? 'Maintain width-to-height ratio when resizing' 
                        : 'Freely adjust width and height independently'}
                    </p>
                  </div>

                  {/* Opacity control */}
                  <div>
                    <label className="text-xs text-gray-300 block mb-1">Opacity</label>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.05"
                      value={elements.find(el => el.id === selectedId)?.opacity || 1}
                      onChange={(e) => {
                        const opacity = parseFloat(e.target.value);
                        handleTransform(selectedId, { opacity });
                      }}
                      className="w-full"
                    />
                  </div>
                </div>
              ) : (
                <p className="text-gray-400 text-sm italic">Select an element to edit its properties</p>
              )}
            </div>
            
            {/* Saved Designs Panel */}
            {savedDesigns.length > 0 && (
              <div className="bg-secondary/40 backdrop-blur-md border border-primary/20 rounded-lg p-4 shadow-md">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-white">Saved Designs</h3>
                  <button
                    onClick={() => setShowSavedDesigns(!showSavedDesigns)}
                    className="text-primary hover:text-primary-600 text-sm"
                  >
                    {showSavedDesigns ? 'Hide' : 'Show'} ({savedDesigns.length})
                  </button>
                </div>
                
                {showSavedDesigns && (
                  <div className="space-y-2 max-h-40 overflow-y-auto">
                    {savedDesigns.map((design) => (
                      <div key={design.id} className="flex items-center justify-between bg-secondary/60 rounded-md p-2 border border-primary/10">
                        <div className="flex-1">
                          <div className="text-white text-xs font-medium">
                            {new Date(design.lastModified).toLocaleDateString()}
                          </div>
                          <div className="text-gray-300 text-xs">
                            {design.elements.length} elements
                          </div>
                        </div>
                        <div className="flex space-x-1">
                          <button
                            onClick={() => loadDesignFromStorage(design.id)}
                            className="bg-primary hover:bg-primary-600 text-background text-xs py-1 px-2 rounded"
                            title="Load design"
                          >
                            Load
                          </button>
                          <button
                            onClick={() => deleteDesign(design.id)}
                            className="bg-red-600/70 hover:bg-red-600/90 text-white text-xs py-1 px-2 rounded"
                            title="Delete design"
                          >
                            ×
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Design Actions Panel */}
            <div className="bg-secondary/40 backdrop-blur-md border border-primary/20 rounded-lg p-4 shadow-md">
              <h3 className="text-lg font-bold text-white mb-4">Actions</h3>
              
              <div className="grid grid-cols-2 gap-2 mb-3">
                <button
                  onClick={undo}
                  disabled={history.length <= 1}
                  className="bg-secondary hover:bg-secondary/60 disabled:opacity-50 disabled:cursor-not-allowed text-white border border-primary/20 py-2 px-3 rounded-md transition-colors flex items-center justify-center"
                >
                  <Undo className="w-4 h-4 mr-2" />
                  Undo
                </button>
                
                <button
                  onClick={clearCanvas}
                  disabled={elements.length === 0}
                  className="bg-secondary hover:bg-secondary/60 disabled:opacity-50 disabled:cursor-not-allowed text-white border border-primary/20 py-2 px-3 rounded-md transition-colors flex items-center justify-center"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Clear All
                </button>
              </div>
              
              <button
                onClick={saveCurrentDesignLocally}
                disabled={elements.length === 0 && uploadedImages.length === 0}
                className="w-full bg-secondary hover:bg-secondary/60 disabled:opacity-50 disabled:cursor-not-allowed text-white border border-primary/20 py-2 px-3 rounded-md transition-colors flex items-center justify-center text-sm mb-2"
              >
                <Save className="w-4 h-4 mr-1" />
                Save Design
              </button>
              
              {/* Auto-save indicator */}
              {autoSaveEnabled && (elements.length > 0 || uploadedImages.length > 0) && (
                <div className="mb-2 text-center">
                  <span className="text-green-400 text-xs">
                    ✓ Auto-saving locally every 15s
                  </span>
                </div>
              )}
              
              {/* Add to Cart Section */}
              <div className="bg-primary/10 border border-primary/30 rounded-md p-3">
                <h4 className="text-primary font-semibold text-sm mb-2">Ready to Order?</h4>
                <p className="text-gray-300 text-xs mb-3">
                  Add your custom design to cart and proceed to checkout.
                </p>
                
                {!finalDesignImage ? (
                  <button
                    onClick={captureDesignForCart}
                    disabled={elements.length === 0 || isCapturingDesign}
                    className="w-full bg-primary hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed text-background font-bold py-2 px-4 rounded-md transition-colors flex items-center justify-center mb-2"
                  >
                    {isCapturingDesign ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Preparing...
                      </>
                    ) : (
                      <>
                        <Image className="w-4 h-4 mr-2" />
                        Prepare for Cart
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
                    className={`w-full font-bold py-2 px-4 rounded-md transition-colors flex items-center justify-center ${
                      isOutOfStock 
                        ? 'bg-gray-600 text-gray-400 cursor-not-allowed' 
                        : 'bg-primary hover:bg-primary-600 text-background'
                    }`}
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    {isOutOfStock ? 'Out of Stock' : 'Add Custom Design to Cart'}
                  </AddToCartButton>
                )}
              </div>
            </div>
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
                
                <div className="space-y-3">
                  <div className="bg-green-600/20 border border-green-600/30 rounded-md p-3">
                    <div className="flex items-center mb-2">
                      <Save className="w-4 h-4 text-green-400 mr-2" />
                      <p className="text-green-400 text-sm font-semibold">Auto-Save Active</p>
                    </div>
                    <p className="text-green-300 text-xs">
                      Your work is automatically saved locally every 15 seconds. You can close this page and return later to continue your design.
                    </p>
                  </div>
                  
                                      <div className="bg-secondary/60 rounded-md p-3 border border-primary/10">
                    <p className="text-white text-sm font-semibold">Instructions:</p>
                    <ul className="text-gray-300 text-xs mt-1 space-y-1 list-disc pl-4">
                      <li>Upload your images or add text using the tools on the left</li>
                      <li>Images are automatically saved to the cloud for persistence</li>
                      <li>Your design progress is auto-saved locally every 15 seconds</li>
                      <li>Click on elements to select them, then resize or rotate them</li>
                      <li>The product image appears on top - your designs show through transparent areas</li>
                      <li>Use "Forward/Backward" buttons to layer multiple elements</li>
                      <li>Use "Save Design" to manually save your current progress</li>
                      <li>When ready, click "Prepare for Cart" then "Add to Cart" to order!</li>
                    </ul>
                  </div>
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