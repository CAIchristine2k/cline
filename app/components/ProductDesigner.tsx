import React, {useState, useRef, useEffect} from 'react';
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
} from 'lucide-react';
import Konva from 'konva';
import {
  Stage,
  Layer,
  Image as KonvaImage,
  Text,
  Transformer,
  Group,
} from 'react-konva';

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

interface ProductDesignerProps {
  backgroundImage: HTMLImageElement | null;
  stageSize: {width: number; height: number};
  elements: CustomElement[];
  selectedId: string | null;
  onElementSelect: (id: string) => void;
  onElementDeselect: () => void;
  onElementTransform: (id: string, attrs: Partial<CustomElement>) => void;
  keepAspectRatio?: boolean;
}

// Helper function to check if a value is a valid number
const isValidNumber = (value: any): boolean => {
  return typeof value === 'number' && !isNaN(value) && isFinite(value);
};

// Helper function to safely get numeric attributes
const getSafeNumber = (value: any, defaultValue: number = 0): number => {
  return isValidNumber(value) ? value : defaultValue;
};

export function ProductDesigner({
  backgroundImage,
  stageSize,
  elements,
  selectedId,
  onElementSelect,
  onElementDeselect,
  onElementTransform,
  keepAspectRatio = true,
}: ProductDesignerProps) {
  const stageRef = useRef<StageType | null>(null);
  const transformerRef = useRef<TransformerType | null>(null);
  const imageCache = useRef<Map<string, HTMLImageElement>>(new Map());

  // Function to get or load an image
  const getImage = (src: string): HTMLImageElement | null => {
    if (imageCache.current.has(src)) {
      return imageCache.current.get(src)!;
    }

    const img = new window.Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      // Force re-render when image loads
      if (stageRef.current) {
        stageRef.current.batchDraw();
      }
    };
    img.src = src;
    imageCache.current.set(src, img);
    return img;
  };

  // Update transformer when selection changes
  useEffect(() => {
    if (transformerRef.current && stageRef.current) {
      const transformer = transformerRef.current;
      
      try {
        const selectedNode = selectedId ? stageRef.current.findOne('#' + selectedId) : null;

      if (selectedNode) {
        transformer.nodes([selectedNode as NodeType]);
        transformer.getLayer()?.batchDraw();
      } else {
          transformer.nodes([]);
          transformer.getLayer()?.batchDraw();
        }
      } catch (error) {
        console.error('Error updating transformer:', error);
        // Reset transformer if there's an error
        transformer.nodes([]);
        transformer.getLayer()?.batchDraw();
      }
    }
  }, [selectedId]);

  // Handle image export when requested
  useEffect(() => {
    const handleCaptureDesign = () => {
      if (stageRef.current) {
        const stage = stageRef.current;

        // Temporarily hide transformer for the export
        const transformerNode = stage.findOne('Transformer');
        if (transformerNode) {
          transformerNode.visible(false);
        }

        try {
          // Capture the stage as an image
          const dataURL = stage.toDataURL({
            pixelRatio: 2,
            mimeType: 'image/png',
          });

          // Call the capture handler that was set up by the parent component
          if (
            typeof window !== 'undefined' &&
            (window as any).handleDesignCapture
          ) {
            (window as any).handleDesignCapture(dataURL);
          }
        } catch (error) {
          console.error('Failed to capture design:', error);

          // Call the error handler if available
          if (
            typeof window !== 'undefined' &&
            (window as any).handleDesignCaptureError
          ) {
            (window as any).handleDesignCaptureError(error);
          } else {
            // Fallback error handling
            alert(
              'Failed to capture design. This may be due to cross-origin image restrictions. Please try refreshing the page and re-uploading your images.',
            );
          }
        } finally {
          // Restore transformer visibility
          if (transformerNode) {
            transformerNode.visible(true);
          }
        }
      }
    };

    // Listen for the capture event from parent component
    window.addEventListener('capture-design', handleCaptureDesign);

    return () => {
      window.removeEventListener('capture-design', handleCaptureDesign);
    };
  }, []);

  // Handle click outside elements to deselect
  const checkDeselect = (e: any) => {
    // Clicked on empty area of the stage
    if (e.target === e.target.getStage()) {
      onElementDeselect();
    }
  };

  if (!backgroundImage) {
    return (
      <div
        className="w-full h-full flex items-center justify-center bg-secondary/60 rounded-md border border-primary/10"
        style={{minHeight: '400px'}}
      >
        <div className="text-center p-4">
          <Loader2 className="w-10 h-10 text-primary mx-auto mb-4 animate-spin" />
          <p className="text-white">Loading product template...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full flex justify-center">
      <Stage
        ref={stageRef}
        width={stageSize.width}
        height={stageSize.height}
        onMouseDown={checkDeselect}
        onTouchStart={checkDeselect}
        className="bg-neutral-800 max-w-full"
      >
        <Layer>
          {/* First layer: User Elements - Sorted by zIndex (lowest to highest) */}
          {elements
            .sort((a, b) => a.zIndex - b.zIndex)
            .map((element) => {
              // Ensure coordinates are valid numbers
              const safeX = getSafeNumber(element.x, stageSize.width / 2);
              const safeY = getSafeNumber(element.y, stageSize.height / 2);
              const safeRotation = getSafeNumber(element.rotation, 0);
              const safeScaleX = getSafeNumber(element.scaleX, 1);
              const safeScaleY = getSafeNumber(element.scaleY, 1);
              
              if (element.type === 'image' && element.src) {
                return (
                  <Group
                    key={element.id}
                    id={element.id}
                    x={safeX}
                    y={safeY}
                    rotation={safeRotation}
                    scaleX={safeScaleX}
                    scaleY={safeScaleY}
                    draggable
                    onClick={() => onElementSelect(element.id)}
                    onTap={() => onElementSelect(element.id)}
                    onDragEnd={(e) => {
                      const node = e.target;
                      const newX = node.x();
                      const newY = node.y();
                      
                      // Only update if values are valid
                      if (isValidNumber(newX) && isValidNumber(newY)) {
                      onElementTransform(element.id, {
                          x: newX,
                          y: newY,
                      });
                      }
                    }}
                    onTransformEnd={(e) => {
                      const node = e.target;

                      // Get new position and scale values
                      const newX = node.x();
                      const newY = node.y();
                      const newRotation = node.rotation();
                      const newScaleX = Math.abs(node.scaleX());
                      const newScaleY = Math.abs(node.scaleY());
                      
                      // Only update if all values are valid
                      if (
                        isValidNumber(newX) && 
                        isValidNumber(newY) && 
                        isValidNumber(newRotation) && 
                        isValidNumber(newScaleX) && 
                        isValidNumber(newScaleY)
                      ) {
                      onElementTransform(element.id, {
                          x: newX,
                          y: newY,
                          rotation: newRotation,
                          scaleX: newScaleX,
                          scaleY: newScaleY,
                      });
                      }
                    }}
                  >
                    <KonvaImage
                      image={getImage(element.src) || undefined}
                      width={element.width}
                      height={element.height}
                      opacity={element.opacity}
                    />
                  </Group>
                );
              } else if (element.type === 'text') {
                return (
                  <Text
                    key={element.id}
                    id={element.id}
                    x={safeX}
                    y={safeY}
                    text={element.text || ''}
                    fontSize={element.fontSize}
                    fontFamily={element.fontFamily}
                    fill={element.fill}
                    rotation={safeRotation}
                    scaleX={safeScaleX}
                    scaleY={safeScaleY}
                    opacity={element.opacity}
                    draggable
                    onClick={() => onElementSelect(element.id)}
                    onTap={() => onElementSelect(element.id)}
                    onDragEnd={(e) => {
                      const node = e.target;
                      const newX = node.x();
                      const newY = node.y();
                      
                      // Only update if values are valid
                      if (isValidNumber(newX) && isValidNumber(newY)) {
                      onElementTransform(element.id, {
                          x: newX,
                          y: newY,
                      });
                      }
                    }}
                    onTransformEnd={(e) => {
                      const node = e.target;

                      // Get new values
                      const newX = node.x();
                      const newY = node.y();
                      const newRotation = node.rotation();
                      const newScaleX = Math.abs(node.scaleX());
                      const newScaleY = Math.abs(node.scaleY());
                      
                      // Only update if all values are valid
                      if (
                        isValidNumber(newX) && 
                        isValidNumber(newY) && 
                        isValidNumber(newRotation) && 
                        isValidNumber(newScaleX) && 
                        isValidNumber(newScaleY)
                      ) {
                      onElementTransform(element.id, {
                          x: newX,
                          y: newY,
                          rotation: newRotation,
                          scaleX: newScaleX,
                          scaleY: newScaleY,
                      });
                      }
                    }}
                  />
                );
              }
              return null;
            })}

          {/* Top layer: Background Product Image with transparent cutouts */}
          <KonvaImage
            image={backgroundImage}
            width={stageSize.width}
            height={stageSize.height}
            listening={false}
          />
          
          {/* Transformer for selected elements */}
          <Transformer
            ref={transformerRef}
            boundBoxFunc={(oldBox, newBox) => {
              // Prevent scaling to zero or negative
              if (newBox.width < 5 || newBox.height < 5) {
                return oldBox;
              }

              // Honor aspect ratio if needed
              if (keepAspectRatio) {
                const aspect = oldBox.width / oldBox.height;
                
                // If width changes more than height, adjust height to match aspect ratio
                if (Math.abs(newBox.width - oldBox.width) > Math.abs(newBox.height - oldBox.height)) {
                  newBox.height = newBox.width / aspect;
                } else {
                  // Otherwise, adjust width to match aspect ratio
                  newBox.width = newBox.height * aspect;
                }
              }

              return newBox;
            }}
          />
        </Layer>
      </Stage>
    </div>
  );
}
