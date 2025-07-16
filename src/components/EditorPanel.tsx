import { Settings2, ImageIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { BackgroundSelector, BackgroundOption } from "@/components/BackgroundSelector";

interface EditorPanelProps {
  selectedBackgroundId: string;
  onBackgroundSelect: (background: BackgroundOption) => void;
  activeObject: any;
  borderRadius: number[];
  setBorderRadius: (value: number[]) => void;
}

export const EditorPanel = ({
  selectedBackgroundId,
  onBackgroundSelect,
  activeObject,
  borderRadius,
  setBorderRadius,
}: EditorPanelProps) => {
  return (
    <div className="w-80 bg-white border-r border-gray-200 shadow-sm">
      {/* Panel Header */}
      <div className="p-6 border-b border-gray-100 bg-white">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-50 rounded-lg">
            <Settings2 className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Editor Panel</h2>
            <p className="text-sm text-gray-600">Customize your design</p>
          </div>
        </div>
      </div>

      {/* Panel Content */}
      <div className="p-6 space-y-6">
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

        {/* Empty State */}
        {!activeObject && (
          <div className="text-center py-12 px-4">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <ImageIcon className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="font-medium text-gray-700 mb-2">No Object Selected</h3>
            <p className="text-sm text-gray-500">
              Upload an image or select an object to see editing options
            </p>
          </div>
        )}
      </div>
    </div>
  );
};