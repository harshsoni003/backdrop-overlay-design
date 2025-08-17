import { Settings2, ImageIcon, Crop, User, Coins, Square, Circle as CircleIcon, Triangle, Star, ArrowRight, Diamond, Hexagon, Pentagon, Heart, Plus, Ellipsis, Zap } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BackgroundSelector, BackgroundOption } from "@/components/BackgroundSelector";
import { User as SupabaseUser } from "@supabase/supabase-js";
import { useUserCredits } from "@/hooks/useUserCredits";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

interface EditorPanelProps {
  selectedBackgroundId: string;
  onBackgroundSelect: (background: BackgroundOption) => void;
  activeObject: any;
  borderRadius: number[];
  setBorderRadius: (value: number[]) => void;
  canvasAspectRatio: string;
  onAspectRatioChange: (aspectRatio: string) => void;
  canvasSizes: { [key: string]: { width: number; height: number } };
  user: SupabaseUser | null;
  // New props for shapes and background controls
  onAddShape: (type: "rect" | "circle" | "triangle" | "star" | "arrow" | "diamond" | "hexagon" | "pentagon" | "heart" | "plus" | "ellipse" | "lightning") => void;
  shapeColor: string;
  onShapeColorChange: (color: string) => void;
  strokeWidth: number;
  onStrokeWidthChange: (width: number) => void;
  onApplyColorToSelection: () => void;
  backgroundColor: string;
  onBackgroundColorChange: (color: string) => void;
  showBackdrop: boolean;
  onToggleBackdrop: (show: boolean) => void;
}

export const EditorPanel = ({
  selectedBackgroundId,
  onBackgroundSelect,
  activeObject,
  borderRadius,
  setBorderRadius,
  canvasAspectRatio,
  onAspectRatioChange,
  canvasSizes,
  user,
  onAddShape,
  shapeColor,
  onShapeColorChange,
  strokeWidth,
  onStrokeWidthChange,
  onApplyColorToSelection,
  backgroundColor,
  onBackgroundColorChange,
  showBackdrop,
  onToggleBackdrop,
}: EditorPanelProps) => {
  const { credits, hasUnlimitedCredits } = useUserCredits(user);

  const getUserDisplayName = () => {
    if (user?.user_metadata?.full_name) {
      return user.user_metadata.full_name;
    }
    if (user?.email) {
      return user.email.split('@')[0];
    }
    return "User";
  };

  const getUserInitials = () => {
    const displayName = getUserDisplayName();
    return displayName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };
  return (
    <div className="w-[360px] min-w-[360px] max-w-[360px] flex-shrink-0 bg-white border-r border-gray-200 shadow-sm h-screen overflow-y-auto fixed left-0 top-0 z-10">
      {/* Panel Header */}
      <div className="p-6 border-b border-gray-100 bg-white">
        <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
          <div className="p-2 bg-blue-50 rounded-lg">
            <img src="/icons8-mac-logo-48.png" alt="Mac Logo" className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Mac iFrame</h2>
            <p className="text-sm text-gray-600">Customize your design</p>
          </div>
        </Link>
      </div>

      {/* User Profile - Show when signed in */}
      {user && (
        <div className="px-6 pb-4 border-b border-gray-100">
          <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg shadow-sm">
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10">
                <AvatarImage 
                  src={user.user_metadata?.avatar_url} 
                  alt={getUserDisplayName()} 
                />
                <AvatarFallback className="bg-black text-white text-sm">
                  {getUserInitials()}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-gray-900 truncate">{getUserDisplayName()}</p>
                <p className="text-sm text-gray-500 truncate">{user.email}</p>
              </div>
            </div>
            
            {/* Credits Display */}
            <div className="mt-3 p-3 bg-white border border-gray-200 rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Coins className="w-4 h-4 text-yellow-600" />
                  <span className="text-sm font-medium text-gray-700">Download Credits</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-lg font-bold text-gray-900">
                    {hasUnlimitedCredits ? "unlimited" : (credits?.credits_remaining ?? 0)}
                  </span>
                  {!hasUnlimitedCredits && <span className="text-sm text-gray-500">left</span>}
                </div>
              </div>
              {credits && !hasUnlimitedCredits && credits.credits_remaining <= 2 && (
                <p className="text-xs text-orange-600 mt-1">
                  {credits.credits_remaining === 0 
                    ? "No credits remaining! Contact admin to upgrade."
                    : "Running low on credits!"}
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Panel Content */}
      <div className="p-6 pl-8 space-y-6">
        {/* Canvas Settings */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 pb-2">
            <div className="w-1 h-6 bg-gradient-to-b from-green-500 to-green-400 rounded-full"></div>
            <h3 className="font-medium text-gray-900">Canvas Settings</h3>
          </div>
          <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-1.5 bg-green-50 rounded-md">
                <Crop className="w-4 h-4 text-green-600" />
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Aspect Ratio</h4>
                <p className="text-xs text-gray-600">Adjust the canvas size</p>
              </div>
            </div>
            <Select onValueChange={onAspectRatioChange} defaultValue={canvasAspectRatio}>
              <SelectTrigger className="w-full bg-white text-gray-900">
                <SelectValue placeholder="Select a ratio" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                {Object.entries(canvasSizes).map(([ratio, dimensions]) => (
                  <SelectItem 
                    key={ratio} 
                    value={ratio}
                    className="hover:bg-gray-100 data-[state=checked]:bg-white data-[state=checked]:text-gray-900 text-gray-900"
                  >
                    {ratio} ({dimensions.width}×{dimensions.height})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {/* Page backdrop toggle */}
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
              <Label className="text-sm font-medium text-gray-700">Show page background</Label>
              <Switch checked={showBackdrop} onCheckedChange={onToggleBackdrop} />
            </div>
          </div>
        </div>

        {/* Image Controls */}
        {activeObject && activeObject.type === 'image' && (
        <div className="space-y-4">
          <div className="flex items-center gap-2 pb-2">
            <div className="w-1 h-6 bg-gradient-to-b from-purple-500 to-purple-400 rounded-full"></div>
            <h3 className="font-medium text-gray-900">Image Settings</h3>
          </div>
          
          <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-1.5 bg-purple-50 rounded-md">
                <ImageIcon className="w-4 h-4 text-purple-600" />
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Border Radius</h4>
                <p className="text-xs text-gray-600">Round the corners of your image</p>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-medium text-gray-700">
                  Radius
                </Label>
                <span className="text-sm font-mono bg-gray-100 px-2 py-1 rounded text-gray-800">
                  {borderRadius[0]}px
                </span>
              </div>
              <Slider
                value={borderRadius}
                onValueChange={setBorderRadius}
                max={50}
                min={0}
                step={1}
                className="w-full"
              />
            </div>
          </div>
        </div>
        )}

        {/* Shapes */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 pb-2">
            <div className="w-1 h-6 bg-gradient-to-b from-indigo-500 to-indigo-400 rounded-full"></div>
            <h3 className="font-medium text-gray-900">Shapes</h3>
          </div>
          <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-medium text-gray-700">Color</Label>
              <input
                type="color"
                value={shapeColor}
                onChange={(e) => onShapeColorChange(e.target.value)}
                className="h-8 w-12 rounded border border-gray-300 cursor-pointer"
                aria-label="Shape color picker"
              />
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-medium text-gray-700">
                  Stroke Width
                </Label>
                <span className="text-sm font-mono bg-gray-100 px-2 py-1 rounded text-gray-800">
                  {strokeWidth}px
                </span>
              </div>
              <Slider
                value={[strokeWidth]}
                onValueChange={(value) => onStrokeWidthChange(value[0])}
                max={10}
                min={1}
                step={1}
                className="w-full"
              />
            </div>
            <div className="grid grid-cols-3 gap-2">
              <Button variant="outline" className="h-12 flex-col gap-1" onClick={() => onAddShape("rect")}> 
                <Square className="w-4 h-4" />
                <span className="text-xs">Rectangle</span>
              </Button>
              <Button variant="outline" className="h-12 flex-col gap-1" onClick={() => onAddShape("circle")}>
                <CircleIcon className="w-4 h-4" />
                <span className="text-xs">Circle</span>
              </Button>
              <Button variant="outline" className="h-12 flex-col gap-1" onClick={() => onAddShape("triangle")}>
                <Triangle className="w-4 h-4" />
                <span className="text-xs">Triangle</span>
              </Button>
              <Button variant="outline" className="h-12 flex-col gap-1" onClick={() => onAddShape("star")}>
                <Star className="w-4 h-4" />
                <span className="text-xs">Star</span>
              </Button>
              <Button variant="outline" className="h-12 flex-col gap-1" onClick={() => onAddShape("arrow")}>
                <ArrowRight className="w-4 h-4" />
                <span className="text-xs">Arrow</span>
              </Button>
              <Button variant="outline" className="h-12 flex-col gap-1" onClick={() => onAddShape("diamond")}>
                <Diamond className="w-4 h-4" />
                <span className="text-xs">Diamond</span>
              </Button>
              <Button variant="outline" className="h-12 flex-col gap-1" onClick={() => onAddShape("hexagon")}>
                <Hexagon className="w-4 h-4" />
                <span className="text-xs">Hexagon</span>
              </Button>
              <Button variant="outline" className="h-12 flex-col gap-1" onClick={() => onAddShape("pentagon")}>
                <Pentagon className="w-4 h-4" />
                <span className="text-xs">Pentagon</span>
              </Button>
              <Button variant="outline" className="h-12 flex-col gap-1" onClick={() => onAddShape("heart")}>
                <Heart className="w-4 h-4" />
                <span className="text-xs">Heart</span>
              </Button>
              <Button variant="outline" className="h-12 flex-col gap-1" onClick={() => onAddShape("plus")}>
                <Plus className="w-4 h-4" />
                <span className="text-xs">Plus</span>
              </Button>
              <Button variant="outline" className="h-12 flex-col gap-1" onClick={() => onAddShape("ellipse")}>
                <Ellipsis className="w-4 h-4" />
                <span className="text-xs">Ellipse</span>
              </Button>
              <Button variant="outline" className="h-12 flex-col gap-1" onClick={() => onAddShape("lightning")}>
                <Zap className="w-4 h-4" />
                <span className="text-xs">Lightning</span>
              </Button>
            </div>
            {activeObject && (
              <Button variant="secondary" onClick={onApplyColorToSelection} className="w-full">
                Apply color to selected shape
              </Button>
            )}
          </div>
        </div>

        {/* Background Selection */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 pb-2">
            <div className="w-1 h-6 bg-gradient-to-b from-blue-500 to-blue-400 rounded-full"></div>
            <h3 className="font-medium text-gray-900">Background</h3>
          </div>
          <div className="space-y-4">
            <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg shadow-sm">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-medium text-gray-700">Background Color</Label>
                <input
                  type="color"
                  value={backgroundColor}
                  onChange={(e) => onBackgroundColorChange(e.target.value)}
                  className="h-8 w-12 rounded border border-gray-300 cursor-pointer"
                  aria-label="Background color picker"
                />
              </div>
            </div>
            <BackgroundSelector
              selectedBackground={selectedBackgroundId}
              onBackgroundSelect={onBackgroundSelect}
            />
          </div>
        </div>

      </div>
    </div>
  );
};