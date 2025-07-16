import { useEffect, useRef, useState } from "react";
import { Canvas as FabricCanvas, FabricImage, Textbox, Rect, FabricObject } from "fabric";
import { Upload, Download, Type, Move, RotateCcw, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { toast } from "@/hooks/use-toast";
import { BackgroundSelector, BackgroundOption } from "@/components/BackgroundSelector";
import defaultBg from "@/assets/default-bg.jpg";

// Image Editor Component - Refactored to remove video functionality
export const ImageEditor = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fabricCanvas, setFabricCanvas] = useState<FabricCanvas | null>(null);
  const [activeObject, setActiveObject] = useState<any>(null);
  const [textContent, setTextContent] = useState("Sample Text");
  const [fontSize, setFontSize] = useState([24]);
  const [borderRadius, setBorderRadius] = useState([0]);
  const [selectedBackgroundId, setSelectedBackgroundId] = useState("abstract");

  // Initialize canvas
  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = new FabricCanvas(canvasRef.current, {
      width: 1280,
      height: 720,
      backgroundColor: "#ffffff",
    });

    // Set default background with proper scaling
    FabricImage.fromURL(defaultBg).then((img) => {
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
      setSelectedBackgroundId("abstract");
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
      description: "Upload an image or add text to get started",
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

  // Add text to canvas
  const addText = () => {
    if (!fabricCanvas) return;

    const text = new Textbox(textContent, {
      left: fabricCanvas.getWidth() / 2,
      top: fabricCanvas.getHeight() / 2,
      originX: 'center',
      originY: 'center',
      fontSize: fontSize[0],
      fill: '#ffffff',
      fontFamily: 'Arial',
      textAlign: 'center',
      // Remove shadow for now to avoid type issues
    });

    fabricCanvas.add(text);
    fabricCanvas.setActiveObject(text);
    fabricCanvas.renderAll();
    
    toast({
      title: "Text added!",
      description: "You can now edit and position your text",
    });
  };

  // Update active text properties
  useEffect(() => {
    if (activeObject && activeObject.type === 'textbox') {
      activeObject.set({
        text: textContent,
        fontSize: fontSize[0],
      });
      fabricCanvas?.renderAll();
    }
  }, [textContent, fontSize, activeObject, fabricCanvas]);

  // Update active image border radius using clipPath
  useEffect(() => {
    if (activeObject && activeObject.type === 'image') {
      if (borderRadius[0] > 0) {
        // Calculate actual visible dimensions
        const imageWidth = activeObject.width * activeObject.scaleX;
        const imageHeight = activeObject.height * activeObject.scaleY;
        
        console.log('Image dimensions:', {
          originalWidth: activeObject.width,
          originalHeight: activeObject.height,
          scaleX: activeObject.scaleX,
          scaleY: activeObject.scaleY,
          calculatedWidth: imageWidth,
          calculatedHeight: imageHeight,
          borderRadius: borderRadius[0]
        });
        
        // Create a rounded rectangle for clipping that matches the image exactly
        const clipPath = new Rect({
          left: -imageWidth / 2,
          top: -imageHeight / 2,
          width: imageWidth,
          height: imageHeight,
          rx: borderRadius[0],
          ry: borderRadius[0],
          originX: 'center',
          originY: 'center',
        });
        
        activeObject.set({
          clipPath: clipPath,
        });
      } else {
        // Remove clipping when radius is 0
        activeObject.set({
          clipPath: null,
        });
      }
      fabricCanvas?.renderAll();
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
    // Restore the currently selected background with proper scaling
    FabricImage.fromURL(defaultBg).then((img) => {
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
    <div className="h-screen bg-background flex overflow-hidden">
      {/* Canvas Area */}
      <div className="flex-1 p-6 gradient-canvas overflow-hidden">
        <div className="h-full flex flex-col">
          {/* Toolbar */}
          <Card className="mb-6 p-4 bg-editor-toolbar border-border">
            <div className="flex items-center gap-4">
              <Button
                onClick={() => fileInputRef.current?.click()}
                variant="default"
                className="gradient-primary shadow-elegant"
              >
                <Upload className="w-4 h-4 mr-2" />
                Upload Image
              </Button>
              
              <Button
                onClick={addText}
                variant="secondary"
              >
                <Type className="w-4 h-4 mr-2" />
                Add Text
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
              
              <div className="ml-auto">
                <Button
                  onClick={downloadImage}
                  variant="default"
                  className="gradient-accent shadow-glow"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
              </div>
            </div>
          </Card>

          {/* Canvas Container */}
          <div className="flex-1 flex items-center justify-center overflow-hidden">
            <div className="shadow-soft rounded-lg overflow-hidden border border-border max-w-full max-h-full">
              <canvas ref={canvasRef} className="block max-w-full max-h-full object-contain" style={{ width: '100%', height: 'auto', maxWidth: '960px', maxHeight: '540px' }} />
            </div>
          </div>
        </div>
      </div>

      {/* Editor Panel */}
      <div className="w-80 bg-editor-panel border-l border-border p-6 overflow-auto shrink-0">
        <h2 className="text-xl font-semibold mb-6 text-foreground">Editor Panel</h2>
        
        {/* Background Selection */}
        <BackgroundSelector
          selectedBackground={selectedBackgroundId}
          onBackgroundSelect={handleBackgroundSelect}
        />

        {/* Text Controls */}
        <Card className="p-4 mb-6 bg-card">
          <h3 className="font-medium mb-4 text-card-foreground">Text Settings</h3>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="text-content" className="text-sm font-medium">
                Text Content
              </Label>
              <Input
                id="text-content"
                value={textContent}
                onChange={(e) => setTextContent(e.target.value)}
                placeholder="Enter your text"
                className="mt-1"
              />
            </div>
            
            <div>
              <Label className="text-sm font-medium">
                Font Size: {fontSize[0]}px
              </Label>
              <Slider
                value={fontSize}
                onValueChange={setFontSize}
                max={100}
                min={12}
                step={1}
                className="mt-2"
              />
            </div>
          </div>
        </Card>

         {/* Media Controls */}
         {activeObject && activeObject.type === 'image' && (
           <Card className="p-4 mb-6 bg-card">
             <h3 className="font-medium mb-4 text-card-foreground">
               Image Settings
             </h3>
            
            <div>
              <Label className="text-sm font-medium">
                Border Radius: {borderRadius[0]}px
              </Label>
              <Slider
                value={borderRadius}
                onValueChange={setBorderRadius}
                max={100}
                min={0}
                step={1}
                className="mt-2"
              />
            </div>
          </Card>
        )}

        {/* Object Info */}
        {activeObject && (
          <Card className="p-4 mb-6 bg-card">
            <h3 className="font-medium mb-2 text-card-foreground">Selected Object</h3>
            <p className="text-sm text-muted-foreground">
              Type: {activeObject.type}
            </p>
            <p className="text-sm text-muted-foreground">
              Position: ({Math.round(activeObject.left)}, {Math.round(activeObject.top)})
            </p>
          </Card>
        )}

        {/* Instructions */}
        <Card className="p-4 bg-muted">
          <h3 className="font-medium mb-2 text-muted-foreground">Instructions</h3>
           <div className="text-sm text-muted-foreground space-y-1">
             <p>• Upload images to overlay on the background</p>
             <p>• Add text and customize it</p>
             <p>• Apply border radius to images</p>
             <p>• Drag objects to reposition them</p>
             <p>• Use corner handles to resize</p>
             <p>• Double-click text to edit inline</p>
           </div>
        </Card>
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