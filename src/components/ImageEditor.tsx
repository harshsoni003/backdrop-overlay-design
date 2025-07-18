import { useEffect, useRef, useState } from "react";
import { Canvas as FabricCanvas, FabricImage, Rect, FabricObject, Path } from "fabric";
import { Upload, Download, Move, RotateCcw, Trash2, ZoomIn, ZoomOut, Maximize2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { BackgroundSelector, BackgroundOption } from "@/components/BackgroundSelector";
import { EditorPanel } from "@/components/EditorPanel";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";
import { User } from "@supabase/supabase-js";
import defaultBg from "@/assets/default-bg.jpg";

// Image Editor Component - Refactored to remove video functionality
export const ImageEditor = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fabricCanvas, setFabricCanvas] = useState<FabricCanvas | null>(null);
  const [activeObject, setActiveObject] = useState<any>(null);
  const [selectedBackgroundId, setSelectedBackgroundId] = useState("mountain-hiker");
  const [borderRadius, setBorderRadius] = useState([0]);
  const [canvasAspectRatio, setCanvasAspectRatio] = useState("16:9");
  const [zoomLevel, setZoomLevel] = useState(0.55);
  
  // Authentication state
  const [user, setUser] = useState<User | null>(null);
  const [showSignInDialog, setShowSignInDialog] = useState(false);
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Canvas dimension presets
  const canvasSizes = {
    "16:9": { width: 1280, height: 720 },
    "1:1": { width: 720, height: 720 },
    "4:3": { width: 960, height: 720 },
    "9:16": { width: 720, height: 1280 },
    "21:9": { width: 1680, height: 720 },
  };

  // Zoom functions
  const zoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 0.1, 2.0)); // Max zoom 200%
  };

  const zoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 0.1, 0.3)); // Min zoom 30%
  };

  const resetZoom = () => {
    setZoomLevel(0.55); // Reset to default zoom
  };

  // Set up authentication listener
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Initialize canvas
  useEffect(() => {
    if (!canvasRef.current) return;

    const currentSize = canvasSizes[canvasAspectRatio as keyof typeof canvasSizes];
    const canvas = new FabricCanvas(canvasRef.current, {
      width: currentSize.width,
      height: currentSize.height,
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
  }, [canvasAspectRatio]);

  // Handle canvas aspect ratio change
  const handleAspectRatioChange = (aspectRatio: string) => {
    setCanvasAspectRatio(aspectRatio);
  };

  // Add keyboard shortcuts for zoom
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey || event.metaKey) {
        switch (event.key) {
          case '=':
          case '+':
            event.preventDefault();
            zoomIn();
            break;
          case '-':
            event.preventDefault();
            zoomOut();
            break;
          case '0':
            event.preventDefault();
            resetZoom();
            break;
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Handle upload button click with authentication check
  const handleUploadClick = () => {
    if (!user) {
      setShowSignInDialog(true);
      toast({
        title: "Sign in required",
        description: "Please sign in to upload images",
        variant: "destructive",
      });
      return;
    }
    fileInputRef.current?.click();
  };

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

  // Handle sign in
  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSigningIn(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Success",
          description: "Signed in successfully!",
        });
        setShowSignInDialog(false);
        setEmail("");
        setPassword("");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setIsSigningIn(false);
    }
  };

  // Handle Google sign in
  const handleGoogleSignIn = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/`,
        },
      });

      if (error) {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to sign in with Google",
        variant: "destructive",
      });
    }
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
        canvasAspectRatio={canvasAspectRatio}
        onAspectRatioChange={handleAspectRatioChange}
        canvasSizes={canvasSizes}
      />

      {/* Canvas Area */}
      <div className="flex-1 py-6 ml-[360px] relative bg-white dark:bg-black overflow-x-auto overflow-y-hidden">
        {/* Dot Background Pattern */}
        <div
          className={cn(
            "absolute inset-0",
            "[background-size:20px_20px]",
            "[background-image:radial-gradient(#555555_1px,transparent_1px)]",
            "dark:[background-image:radial-gradient(#888888_1px,transparent_1px)]",
          )}
        />
        {/* Radial gradient for the container to give a faded look */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-black"></div>
        
        <div className="h-full flex flex-col relative z-10 min-w-max">
          {/* Toolbar */}
          <div className="mb-4 mt-8 flex justify-start ml-8 relative z-20">
            <Card className="p-3 bg-white border-border w-fit">
              <div className="flex items-center gap-2">
                <Button
                  onClick={handleUploadClick}
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
                
                {/* Zoom Controls */}
                <div className="flex items-center gap-1 ml-2 border-l pl-2">
                  <Button
                    onClick={zoomOut}
                    variant="outline"
                    size="sm"
                    title="Zoom Out"
                  >
                    <ZoomOut className="w-4 h-4" />
                  </Button>
                  
                  <span className="text-sm font-mono px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-md min-w-[3.5rem] text-center border border-gray-200 dark:border-gray-700">
                    {Math.round(zoomLevel * 100)}%
                  </span>
                  
                  <Button
                    onClick={zoomIn}
                    variant="outline"
                    size="sm"
                    title="Zoom In"
                  >
                    <ZoomIn className="w-4 h-4" />
                  </Button>
                  
                  <Button
                    onClick={resetZoom}
                    variant="outline"
                    size="sm"
                    title="Reset Zoom"
                  >
                    <Maximize2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          </div>

          {/* Canvas Container */}
          <div className={cn(
            "flex-1 flex items-center justify-start min-w-max",
            {
              "-ml-36 -mt-24": canvasAspectRatio === "16:9",
              "-ml-8 -mt-12": canvasAspectRatio === "1:1",
              "-ml-16 -mt-16": canvasAspectRatio === "4:3", 
              "ml-31 -mt-52": canvasAspectRatio === "9:16",
              "-ml-72 -mt-24": canvasAspectRatio === "21:9"
            }
          )}>
            <div 
              className="shadow-soft rounded-2xl overflow-hidden border border-border transform origin-center transition-transform duration-200 ease-in-out"
              style={{ 
                transform: `scale(${zoomLevel})`,
                borderRadius: '16px',
                minWidth: 'fit-content'
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

       {/* Sign In Dialog */}
       <Dialog open={showSignInDialog} onOpenChange={setShowSignInDialog}>
         <DialogContent className="sm:max-w-md">
           <div className="w-full max-w-md bg-white border border-neutral-200 rounded-lg shadow-sm p-6">
             <div className="space-y-1 mb-6">
               <h2 className="text-2xl font-bold text-center text-black">Sign In</h2>
               <p className="text-center text-neutral-600">
                 Enter your email and password to access your account
               </p>
             </div>
             <div className="space-y-4">
               <Button
                 variant="outline"
                 className="w-full bg-white border-neutral-300 text-black hover:bg-neutral-50"
                 onClick={handleGoogleSignIn}
                 type="button"
               >
                 Continue with Google
               </Button>
               
               <div className="relative">
                 <div className="absolute inset-0 flex items-center">
                   <span className="w-full border-t border-neutral-300" />
                 </div>
                 <div className="relative flex justify-center text-xs uppercase">
                   <span className="bg-white px-2 text-neutral-600 z-10">
                     Or continue with
                   </span>
                 </div>
               </div>

               <form onSubmit={handleSignIn} className="space-y-4">
                 <div className="space-y-2">
                   <Label htmlFor="dialog-email" className="text-black">Email</Label>
                   <Input
                     id="dialog-email"
                     type="email"
                     placeholder="Enter your email"
                     value={email}
                     onChange={(e) => setEmail(e.target.value)}
                     className="bg-white border-neutral-300 text-black placeholder:text-neutral-500"
                     required
                   />
                 </div>
                 <div className="space-y-2">
                   <Label htmlFor="dialog-password" className="text-black">Password</Label>
                   <Input
                     id="dialog-password"
                     type="password"
                     placeholder="Enter your password"
                     value={password}
                     onChange={(e) => setPassword(e.target.value)}
                     className="bg-white border-neutral-300 text-black placeholder:text-neutral-500"
                     required
                   />
                 </div>
                 <Button type="submit" className="w-full bg-black text-white hover:bg-neutral-800" disabled={isSigningIn}>
                   {isSigningIn ? "Signing in..." : "Sign In"}
                 </Button>
               </form>
             </div>
           </div>
         </DialogContent>
       </Dialog>
     </div>
   );
 };