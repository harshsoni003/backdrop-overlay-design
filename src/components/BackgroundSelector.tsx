import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Check, Image as ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

// Import default background only
import defaultBg from "@/assets/default-bg.jpg";

export interface BackgroundOption {
  id: string;
  name: string;
  image: string;
  category: string;
}

const backgroundOptions: BackgroundOption[] = [
  {
    id: "mountain-hiker",
    name: "Mountain Hiker",
    image: "/lovable-uploads/24711e9d-7e61-42fe-8fa0-71748aa71822.png",
    category: "Adventure"
  },
  {
    id: "ocean-sunset",
    name: "Ocean Sunset",
    image: "/lovable-uploads/4ea1b169-b31c-4d23-900f-31b093972a0b.png",
    category: "Nature"
  },
  {
    id: "balloon-night",
    name: "Balloon Night",
    image: "/lovable-uploads/2b43ed90-a252-4cd1-927e-192dd4ee1a1e.png",
    category: "Fantasy"
  },
  {
    id: "mountain-lake",
    name: "Mountain Lake",
    image: "/lovable-uploads/f6118879-64aa-4984-ab90-69c7010b893e.png",
    category: "Nature"
  },
  {
    id: "mountain-layers",
    name: "Mountain Layers",
    image: "/lovable-uploads/eb405c2d-69ef-4ac9-98fc-0c773030109f.png",
    category: "Nature"
  },
  {
    id: "snowy-peaks",
    name: "Snowy Peaks",
    image: "/lovable-uploads/14ec5711-4b96-47c2-846b-a2ef8da0f58d.png",
    category: "Nature"
  },
  {
    id: "desert-gradient",
    name: "Desert Vista",
    image: "/lovable-uploads/c2db0ae4-c657-480c-82ae-7cfc8e9d7f08.png",
    category: "Landscape"
  },
  {
    id: "mountain-sunset",
    name: "Mountain Sunset",
    image: "/lovable-uploads/4e5516e4-daef-4db6-8d3a-7c6a4b16ed26.png",
    category: "Nature"
  },
  {
    id: "ocean-waves",
    name: "Ocean Waves",
    image: "/lovable-uploads/20c14ad3-7de0-476a-a6f5-e46ffb8e8257.png",
    category: "Nature"
  },
  {
    id: "valley-golden",
    name: "Valley Golden",
    image: "/lovable-uploads/e3bb28ea-89fb-445e-a12c-da9bb9daec73.png",
    category: "Nature"
  }
];

interface BackgroundSelectorProps {
  selectedBackground: string;
  onBackgroundSelect: (background: BackgroundOption) => void;
}

export const BackgroundSelector = ({ selectedBackground, onBackgroundSelect }: BackgroundSelectorProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  
  const categories = ["All", ...Array.from(new Set(backgroundOptions.map(bg => bg.category)))];
  
  const filteredBackgrounds = selectedCategory === "All" 
    ? backgroundOptions 
    : backgroundOptions.filter(bg => bg.category === selectedCategory);

  return (
    <Card className="py-4 pr-4 pl-2 bg-card border-border/50 shadow-sm">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-1.5 bg-primary/10 rounded-md">
          <ImageIcon className="w-4 h-4 text-primary" />
        </div>
        <div>
          <h4 className="font-medium text-card-foreground">Background Gallery</h4>
          <p className="text-xs text-muted-foreground">Choose from preset backgrounds</p>
        </div>
      </div>
      
      {/* Category Filter */}
      <div className="flex gap-1 mb-4 overflow-x-auto pb-1">
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory(category)}
            className="text-xs whitespace-nowrap h-7 px-3"
          >
            {category}
          </Button>
        ))}
      </div>

      {/* Background Grid - Optimized for 1280x720 (16:9) */}
      <ScrollArea className="h-80">
        <div className="grid grid-cols-1 gap-3 pr-2">
          {filteredBackgrounds.map((background) => (
            <div
              key={background.id}
              className={cn(
                "relative aspect-video rounded-lg overflow-hidden cursor-pointer border transition-all duration-300 hover:scale-[1.02] hover:shadow-md",
                selectedBackground === background.id 
                  ? "border-primary ring-2 ring-primary/30 shadow-lg" 
                  : "border-border/50 hover:border-primary/50"
              )}
              onClick={() => onBackgroundSelect(background)}
            >
              <img
                src={background.image}
                alt={background.name}
                className="w-full h-full object-cover"
              />
              
              {/* Selected indicator */}
              {selectedBackground === background.id && (
                <div className="absolute inset-0 bg-primary/10 flex items-center justify-center backdrop-blur-[1px]">
                  <div className="bg-primary text-primary-foreground rounded-full p-1.5 shadow-lg">
                    <Check className="w-3 h-3" />
                  </div>
                </div>
              )}
              
              {/* Background name and info */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-3">
                <p className="text-white text-sm font-medium leading-tight">
                  {background.name}
                </p>
                <p className="text-white/80 text-xs mt-0.5">
                  {background.category}
                </p>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </Card>
  );
};