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
    <div className="w-80 bg-editor-panel border-r border-border">
      {/* Panel Header */}
      <div className="p-6 border-b border-border bg-gradient-to-r from-background/50 to-background/30">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Settings2 className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-foreground">Editor Panel</h2>
            <p className="text-sm text-muted-foreground">Customize your design</p>
          </div>
        </div>
      </div>

      {/* Panel Content */}
      <div className="p-6 space-y-6">
        {/* Background Selection */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 pb-2">
            <div className="w-1 h-6 bg-gradient-to-b from-primary to-primary/50 rounded-full"></div>
            <h3 className="font-medium text-foreground">Background</h3>
          </div>
          <BackgroundSelector
            selectedBackground={selectedBackgroundId}
            onBackgroundSelect={onBackgroundSelect}
          />
        </div>

        {/* Image Controls */}
        {activeObject && activeObject.type === 'image' && (
          <div className="space-y-4">
            <div className="flex items-center gap-2 pb-2">
              <div className="w-1 h-6 bg-gradient-to-b from-accent to-accent/50 rounded-full"></div>
              <h3 className="font-medium text-foreground">Image Settings</h3>
            </div>
            
            <Card className="p-4 bg-card border-border/50 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-1.5 bg-accent/10 rounded-md">
                  <ImageIcon className="w-4 h-4 text-accent" />
                </div>
                <div>
                  <h4 className="font-medium text-card-foreground">Border Radius</h4>
                  <p className="text-xs text-muted-foreground">Round the corners of your image</p>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="text-sm font-medium text-muted-foreground">
                    Radius
                  </Label>
                  <span className="text-sm font-mono bg-muted/50 px-2 py-1 rounded text-foreground">
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
            </Card>
          </div>
        )}

        {/* Empty State */}
        {!activeObject && (
          <div className="text-center py-12 px-4">
            <div className="w-16 h-16 bg-muted/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <ImageIcon className="w-8 h-8 text-muted-foreground/50" />
            </div>
            <h3 className="font-medium text-muted-foreground mb-2">No Object Selected</h3>
            <p className="text-sm text-muted-foreground/70">
              Upload an image or select an object to see editing options
            </p>
          </div>
        )}
      </div>
    </div>
  );
};