import React, { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';

// Define the interface for props
export interface ProductDesignerProps {
  backgroundImage: HTMLImageElement | null;
  stageSize: { width: number; height: number };
  elements: Array<{
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
  }>;
  selectedId: string | null;
  onElementSelect: (id: string) => void;
  onElementDeselect: () => void;
  onElementTransform: (id: string, attrs: any) => void;
  keepAspectRatio?: boolean;
}

/**
 * This is a client-side only component that dynamically imports
 * the actual ProductDesigner component to avoid SSR issues with Konva
 */
export function EnhancedProductDesigner(props: ProductDesignerProps) {
  const [KonvaDesigner, setKonvaDesigner] = useState<React.ComponentType<ProductDesignerProps> | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Function to handle export image request
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Listen for save design events
      const handleCaptureDesign = () => {
        // We'll pass this to the Konva component once it's loaded
        console.log('Capture design event received');
      };

      window.addEventListener('capture-design', handleCaptureDesign);
      return () => {
        window.removeEventListener('capture-design', handleCaptureDesign);
      };
    }
  }, []);

  useEffect(() => {
    // Only import on the client side
    if (typeof window !== 'undefined') {
      // Use dynamic import to load the Konva component
      import('./ProductDesigner')
        .then(module => {
          if (module.ProductDesigner) {
            // ProductDesigner is exported as a named export
            setKonvaDesigner(() => module.ProductDesigner);
          } else {
            setError('ProductDesigner component not found in module');
          }
        })
        .catch(err => {
          console.error('Error loading ProductDesigner:', err);
          setError('Failed to load design editor');
        });
    }
  }, []);

  if (error) {
    return (
      <div
        className="w-full h-full flex items-center justify-center bg-secondary/60 rounded-md border border-primary/10"
        style={{ minHeight: '400px' }}
      >
        <div className="text-center p-4">
          <p className="text-red-400 font-bold">Error: {error}</p>
          <p className="text-white mt-2">Please refresh the page to try again</p>
        </div>
      </div>
    );
  }

  if (!KonvaDesigner) {
    return (
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
  }

  // When Konva is loaded, render the actual designer component
  return <KonvaDesigner {...props} />;
} 