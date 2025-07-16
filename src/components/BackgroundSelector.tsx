import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Check, Image as ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

// Import background images
import oceanSunset from "@/assets/backgrounds/ocean-sunset.jpg";
import balloonNight from "@/assets/backgrounds/balloon-night.jpg";
import mountainLake from "@/assets/backgrounds/mountain-lake.jpg";
import mountainLayers from "@/assets/backgrounds/mountain-layers.jpg";
import desertGradient from "@/assets/backgrounds/desert-gradient.jpg";
import mountainSunrise from "@/assets/backgrounds/mountain-sunrise.jpg";
import defaultBg from "@/assets/default-bg.jpg";

export interface BackgroundOption {
  id: string;
  name: string;
  image: string;
  category: string;
}

const backgroundOptions: BackgroundOption[] = [
  {
    id: "abstract",
    name: "Abstract Gradient",
    image: defaultBg,
    category: "Abstract"
  },
  {
    id: "ocean-sunset",
    name: "Ocean Sunset",
    image: oceanSunset,
    category: "Nature"
  },
  {
    id: "balloon-night",
    name: "Balloon Night",
    image: balloonNight,
    category: "Fantasy"
  },
  {
    id: "mountain-lake",
    name: "Mountain Lake",
    image: mountainLake,
    category: "Nature"
  },
  {
    id: "mountain-layers",
    name: "Mountain Layers",
    image: mountainLayers,
    category: "Nature"
  },
  {
    id: "desert-gradient",
    name: "Desert Vista",
    image: desertGradient,
    category: "Landscape"
  },
  {
    id: "mountain-sunrise",
    name: "Mountain Sunrise",
    image: mountainSunrise,
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
    <Card className="p-4 bg-card">
      <div className="flex items-center gap-2 mb-4">
        <ImageIcon className="w-4 h-4" />
        <h3 className="font-medium text-card-foreground">Background Gallery</h3>
      </div>
      
      {/* Category Filter */}
      <div className="flex gap-1 mb-4 overflow-x-auto">
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory(category)}
            className="text-xs whitespace-nowrap"
          >
            {category}
          </Button>
        ))}
      </div>

      {/* Background Grid */}
      <ScrollArea className="h-64">
        <div className="grid grid-cols-2 gap-2">
          {filteredBackgrounds.map((background) => (
            <div
              key={background.id}
              className={cn(
                "relative aspect-video rounded-lg overflow-hidden cursor-pointer border-2 transition-all duration-200 hover:scale-105",
                selectedBackground === background.id 
                  ? "border-primary ring-2 ring-primary/20" 
                  : "border-border hover:border-primary/50"
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
                <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
                  <div className="bg-primary text-primary-foreground rounded-full p-1">
                    <Check className="w-3 h-3" />
                  </div>
                </div>
              )}
              
              {/* Background name */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-2">
                <p className="text-white text-xs font-medium truncate">
                  {background.name}
                </p>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </Card>
  );
};