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
    id: "abstract",
    name: "Abstract Gradient",
    image: defaultBg,
    category: "Abstract"
  },
  {
    id: "starry-night",
    name: "Starry Night",
    image: "/lovable-uploads/acda846d-1310-4de5-ab2a-ff890515b8f6.png",
    category: "Night"
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
  },
  {
    id: "mountain-hiker",
    name: "Mountain Hiker",
    image: "/lovable-uploads/24711e9d-7e61-42fe-8fa0-71748aa71822.png",
    category: "Adventure"
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

      {/* Background Grid - Larger size to show original images */}
      <ScrollArea className="h-96">
        <div className="grid grid-cols-1 gap-4">
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
              
              {/* Background name and info */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
                <p className="text-white text-sm font-medium">
                  {background.name}
                </p>
                <p className="text-white/70 text-xs">
                  {background.category} • Original Quality
                </p>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </Card>
  );
};