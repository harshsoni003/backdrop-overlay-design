import { useEffect, useRef, useState } from "react";
import { Canvas as FabricCanvas, FabricImage, Rect, FabricObject, Path } from "fabric";
import { Upload, Download, Move, RotateCcw, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { BackgroundSelector, BackgroundOption } from "@/components/BackgroundSelector";
import { EditorPanel } from "@/components/EditorPanel";
import defaultBg from "@/assets/default-bg.jpg";

// Image Editor Component - Refactored to remove video functionality
export const ImageEditor = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fabricCanvas, setFabricCanvas] = useState<FabricCanvas | null>(null);
  const [activeObject, setActiveObject] = useState<any>(null);
  const [selectedBackgroundId, setSelectedBackgroundId] = useState("mountain-hiker");
  const [borderRadius, setBorderRadius] = useState([0]);

  // Initialize canvas
  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = new FabricCanvas(canvasRef.current, {
      width: 1280,
      height: 720,
      backgroundColor: "#ffffff",
    });

    // Set default background with proper scaling
    FabricImage.fromURL("/lovable-uploads/24711e9d-7e61-42fe-8fa0-71748aa71822.png").then((img) => {
      // Scale image to fit canvas while maintaining aspect ratio
      const canvasWidth = canvas.getWidth();
      const canvasHeight = canvas.getHeight();
      const scaleX = canvasWidth / img.width!;
      const scaleY = canvasHeight / img.height!;
      const scale = Math.max(scaleX, scaleY); // Use max to cover entire canvas
      
      img.set({
        selectable: false,
        evented: false,
        scaleX: scale,
        scaleY: scale,
        left: canvasWidth / 2,
        top: canvasHeight / 2,
        originX: 'center',
        originY: 'center',
      });
      canvas.backgroundImage = img;
      canvas.renderAll();
      setSelectedBackgroundId("mountain-hiker");
    });

    // Handle object selection
    canvas.on('selection:created', (e) => {
      setActiveObject(e.selected[0]);
    });

    canvas.on('selection:updated', (e) => {
      setActiveObject(e.selected[0]);
    });

    canvas.on('selection:cleared', () => {
      setActiveObject(null);
    });

    setFabricCanvas(canvas);
    toast({
      title: "Canvas Ready!",
      description: "Upload an image to get started",
    });

    return () => {
      canvas.dispose();
    };
  }, []);

  // Handle file upload (images only)
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !fabricCanvas) return;

    const isImage = file.type.startsWith('image/');

    if (!isImage) {
      toast({
        title: "Invalid file type",
        description: "Please upload an image file",
        variant: "destructive",
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const fileUrl = e.target?.result as string;
      
      // Handle image upload
      FabricImage.fromURL(fileUrl).then((img) => {
        // Scale image to fit canvas while maintaining aspect ratio
        const canvasWidth = fabricCanvas.getWidth();
        const canvasHeight = fabricCanvas.getHeight();
        const scale = Math.min(canvasWidth / img.width!, canvasHeight / img.height!) * 0.7;
        
        img.set({
          left: canvasWidth / 2,
          top: canvasHeight / 2,
          originX: 'center',
          originY: 'center',
          scaleX: scale,
          scaleY: scale,
        });

        fabricCanvas.add(img);
        fabricCanvas.setActiveObject(img);
        fabricCanvas.renderAll();
        
        toast({
          title: "Image uploaded!",
          description: "Your image has been added to the canvas",
        });
      });
    };
    reader.readAsDataURL(file);
  };


  // Apply border radius to active image using fabric.js clipPath
  useEffect(() => {
    if (activeObject && activeObject.type === 'image' && fabricCanvas) {
      const radius = borderRadius[0];
      
      if (radius > 0) {
        // Use fabric.js clipPath approach with Rect and rx/ry for curved borders
        const clipPath = new Rect({
          rx: radius,
          ry: radius,
          width: activeObject.width,
          height: activeObject.height,
          originX: 'center',
          originY: 'center'
        });
        
        activeObject.set({
          clipPath: clipPath,
        });
      } else {
        // Remove clipPath if radius is 0
        activeObject.set({
          clipPath: undefined,
        });
      }
      
      fabricCanvas.renderAll();
    }
  }, [borderRadius, activeObject, fabricCanvas]);

  // Delete active object
  const deleteActiveObject = () => {
    if (!fabricCanvas || !activeObject) return;
    
    fabricCanvas.remove(activeObject);
    fabricCanvas.renderAll();
    setActiveObject(null);
    
    toast({
      title: "Object deleted",
      description: "The selected object has been removed",
    });
  };

  // Handle background selection
  const handleBackgroundSelect = (background: BackgroundOption) => {
    if (!fabricCanvas) return;
    
    FabricImage.fromURL(background.image).then((img) => {
      // Scale image to fit canvas while maintaining aspect ratio
      const canvasWidth = fabricCanvas.getWidth();
      const canvasHeight = fabricCanvas.getHeight();
      const scaleX = canvasWidth / img.width!;
      const scaleY = canvasHeight / img.height!;
      const scale = Math.max(scaleX, scaleY); // Use max to cover entire canvas
      
      img.set({
        selectable: false,
        evented: false,
        scaleX: scale,
        scaleY: scale,
        left: canvasWidth / 2,
        top: canvasHeight / 2,
        originX: 'center',
        originY: 'center',
      });
      fabricCanvas.backgroundImage = img;
      fabricCanvas.renderAll();
      setSelectedBackgroundId(background.id);
      
      toast({
        title: "Background changed!",
        description: `Applied ${background.name} background`,
      });
    });
  };

  // Reset canvas
  const resetCanvas = () => {
    if (!fabricCanvas) return;
    
    fabricCanvas.clear();
    // Restore the Mountain Hiker background with proper scaling
    FabricImage.fromURL("/lovable-uploads/24711e9d-7e61-42fe-8fa0-71748aa71822.png").then((img) => {
      const canvasWidth = fabricCanvas.getWidth();
      const canvasHeight = fabricCanvas.getHeight();
      const scaleX = canvasWidth / img.width!;
      const scaleY = canvasHeight / img.height!;
      const scale = Math.max(scaleX, scaleY);
      
      img.set({
        selectable: false,
        evented: false,
        scaleX: scale,
        scaleY: scale,
        left: canvasWidth / 2,
        top: canvasHeight / 2,
        originX: 'center',
        originY: 'center',
      });
      fabricCanvas.backgroundImage = img;
      fabricCanvas.renderAll();
    });
    
    toast({
      title: "Canvas reset",
      description: "All objects have been cleared",
    });
  };

  // Download image
  const downloadImage = () => {
    if (!fabricCanvas) return;

    const dataURL = fabricCanvas.toDataURL({
      format: 'png',
      quality: 1,
      multiplier: 2,
    });

    const link = document.createElement('a');
    link.download = 'edited-image.png';
    link.href = dataURL;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast({
      title: "Image downloaded!",
      description: "Your edited image has been saved",
    });
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Editor Panel */}
      <EditorPanel
        selectedBackgroundId={selectedBackgroundId}
        onBackgroundSelect={handleBackgroundSelect}
        activeObject={activeObject}
        borderRadius={borderRadius}
        setBorderRadius={setBorderRadius}
      />

      {/* Canvas Area */}
      <div className="flex-1 pl-1 -mr-2 py-6 gradient-canvas ml-[360px]">
        <div className="h-full flex flex-col">
          {/* Toolbar */}
          <div className="mb-4 flex justify-start ml-0">
            <Card className="p-3 bg-white border-border w-fit">
              <div className="flex items-center gap-2">
                <Button
                  onClick={() => fileInputRef.current?.click()}
                  variant="default"
                  size="sm"
                  className="bg-purple-600 hover:bg-purple-700 text-white"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Upload Image
                </Button>
                
                {activeObject && (
                  <Button
                    onClick={deleteActiveObject}
                    variant="destructive"
                    size="sm"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete
                  </Button>
                )}
                
                <Button
                  onClick={resetCanvas}
                  variant="outline"
                  size="sm"
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Reset
                </Button>
                
                <Button
                  onClick={downloadImage}
                  variant="default"
                  size="sm"
                  className="bg-cyan-500 hover:bg-cyan-600 text-white"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
              </div>
            </Card>
          </div>

          {/* Canvas Container */}
          <div className="flex-1 flex items-center justify-start ml-0">
            <div 
              className="shadow-soft rounded-2xl overflow-hidden border border-border transform origin-center"
              style={{ 
                transform: 'scale(0.65)',
                borderRadius: '16px'
              }}
            >
              <canvas ref={canvasRef} className="block rounded-2xl" style={{ borderRadius: '16px' }} />
            </div>
          </div>
        </div>
      </div>

       {/* Hidden file input */}
       <input
         ref={fileInputRef}
         type="file"
         accept="image/*"
         onChange={handleFileUpload}
         className="hidden"
       />
     </div>
   );
 };