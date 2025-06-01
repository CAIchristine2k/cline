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
    <Stage
      ref={stageRef}
      width={stageSize.width}
      height={stageSize.height}
      onMouseDown={checkDeselect}
      onTouchStart={checkDeselect}
      className="bg-neutral-800"
    >
      <Layer>
        {/* User Elements - Sorted by zIndex (lowest to highest) */}
        {elements
          .sort((a, b) => a.zIndex - b.zIndex)
          .map((element) => {
            if (element.type === 'image' && element.src) {
              return (
                <Group
                  key={element.id}
                  id={element.id}
                  x={element.x}
                  y={element.y}
                  rotation={element.rotation}
                  scaleX={element.scaleX}
                  scaleY={element.scaleY}
                  draggable
                  onClick={() => onElementSelect(element.id)}
                  onTap={() => onElementSelect(element.id)}
                  onDragEnd={(e) => {
                    onElementTransform(element.id, {
                      x: e.target.x(),
                      y: e.target.y(),
                    });
                  }}
                  onTransformEnd={(e) => {
                    const node = e.target;

                    // Use the absolute values of scale to prevent negative scaling
                    // and avoid multiplying by the existing scale which causes shrinking
                    onElementTransform(element.id, {
                      x: node.x(),
                      y: node.y(),
                      rotation: node.rotation(),
                      scaleX: Math.abs(node.scaleX()),
                      scaleY: Math.abs(node.scaleY()),
                    });
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
                  x={element.x}
                  y={element.y}
                  text={element.text || ''}
                  fontSize={element.fontSize}
                  fontFamily={element.fontFamily}
                  fill={element.fill}
                  scaleX={element.scaleX}
                  scaleY={element.scaleY}
                  rotation={element.rotation}
                  opacity={element.opacity}
                  draggable
                  onClick={() => onElementSelect(element.id)}
                  onTap={() => onElementSelect(element.id)}
                  onDragEnd={(e) => {
                    onElementTransform(element.id, {
                      x: e.target.x(),
                      y: e.target.y(),
                    });
                  }}
                  onTransformEnd={(e) => {
                    const node = e.target;

                    // Use the absolute values of scale to prevent negative scaling
                    // and avoid multiplying by the existing scale which causes shrinking
                    onElementTransform(element.id, {
                      x: node.x(),
                      y: node.y(),
                      rotation: node.rotation(),
                      scaleX: Math.abs(node.scaleX()),
                      scaleY: Math.abs(node.scaleY()),
                    });
                  }}
                />
              );
            }
            return null;
          })}

        {/* Product Template Image - Always on top for cutout effect */}
        <KonvaImage
          image={backgroundImage}
          width={stageSize.width}
          height={stageSize.height}
          listening={false} // Don't interfere with user element selection
        />

        {/* Transformer for selected elements */}
        <Transformer
          ref={transformerRef}
          keepRatio={keepAspectRatio}
          enabledAnchors={[
            'top-left',
            'top-right',
            'bottom-left',
            'bottom-right',
          ]}
          rotateAnchorOffset={60}
          borderStroke="var(--color-primary)"
          borderStrokeWidth={2}
          anchorStroke="var(--color-primary)"
          anchorFill="var(--color-background)"
          anchorSize={8}
          boundBoxFunc={(oldBox, newBox) => {
            // Limit resizing to maintain minimum dimensions
            if (newBox.width < 10 || newBox.height < 10) {
              return oldBox;
            }

            // Constrain to stage boundaries
            if (newBox.x < 0) {
              newBox.x = 0;
            }
            if (newBox.y < 0) {
              newBox.y = 0;
            }
            if (newBox.x + newBox.width > stageSize.width) {
              newBox.width = stageSize.width - newBox.x;
            }
            if (newBox.y + newBox.height > stageSize.height) {
              newBox.height = stageSize.height - newBox.y;
            }

            return newBox;
          }}
        />
      </Layer>
    </Stage>
  );
}
