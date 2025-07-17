import { Settings2, ImageIcon, Crop } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BackgroundSelector, BackgroundOption } from "@/components/BackgroundSelector";

interface EditorPanelProps {
  selectedBackgroundId: string;
  onBackgroundSelect: (background: BackgroundOption) => void;
  activeObject: any;
  borderRadius: number[];
  setBorderRadius: (value: number[]) => void;
  canvasAspectRatio: string;
  onAspectRatioChange: (aspectRatio: string) => void;
  canvasSizes: { [key: string]: { width: number; height: number } };
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
}: EditorPanelProps) => {
  return (
    <div className="w-[360px] min-w-[360px] max-w-[360px] flex-shrink-0 bg-white border-r border-gray-200 shadow-sm h-screen overflow-y-auto fixed left-0 top-0 z-10">
      {/* Panel Header */}
      <div className="p-6 border-b border-gray-100 bg-white">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-50 rounded-lg">
            <img src="/icons8-mac-logo-48.png" alt="Mac Logo" className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Mac iFrame</h2>
            <p className="text-sm text-gray-600">Customize your design</p>
          </div>
        </div>
      </div>

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

        {/* Background Selection */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 pb-2">
            <div className="w-1 h-6 bg-gradient-to-b from-blue-500 to-blue-400 rounded-full"></div>
            <h3 className="font-medium text-gray-900">Background</h3>
          </div>
          <BackgroundSelector
            selectedBackground={selectedBackgroundId}
            onBackgroundSelect={onBackgroundSelect}
          />
        </div>

      </div>
    </div>
  );
};