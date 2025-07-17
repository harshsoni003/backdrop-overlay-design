import { User } from "lucide-react";
import { Badge } from "@/components/ui/badge";

function Feature() {
  return (
    <div className="w-full py-20 lg:py-40">
      <div className="container mx-auto">
        <div className="flex flex-col gap-10">
          <div className="flex gap-4 flex-col items-start">
            <div>
              <Badge>Platform</Badge>
            </div>
            <div className="flex gap-2 flex-col">
              <h2 className="text-3xl md:text-5xl tracking-tighter max-w-xl font-regular text-left">
                Create Viral Posts!
              </h2>
              <p className="text-lg max-w-xl lg:max-w-lg leading-relaxed tracking-tight text-muted-foreground  text-left">
                Transform your content with professional Mac-style backgrounds and make your posts go viral.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-muted rounded-md h-full lg:col-span-2 p-6 aspect-square lg:aspect-auto flex justify-between flex-col overflow-hidden">
              <User className="w-8 h-8 stroke-1" />
              <div className="flex flex-col">
                <h3 className="text-xl tracking-tight">Professional Twitter Posts</h3>
                <p className="text-muted-foreground max-w-xs text-base">
                  Create engaging Twitter posts that stand out with professional backgrounds and layouts.
                </p>
              </div>
              <img 
                src="/lovable-uploads/d2f412c7-f82d-4385-bb17-b525908a021c.png" 
                alt="Twitter profile with engagement stats" 
                className="w-full h-auto mt-4 rounded-md"
              />
            </div>
            <div className="bg-muted rounded-md aspect-square p-6 flex justify-between flex-col overflow-hidden">
              <User className="w-8 h-8 stroke-1" />
              <div className="flex flex-col">
                <h3 className="text-xl tracking-tight">Community Engagement</h3>
                <p className="text-muted-foreground max-w-xs text-base">
                  Build communities and share valuable content that drives engagement.
                </p>
              </div>
              <img 
                src="/lovable-uploads/4ee6aa6e-1d81-46c4-94b5-15a3009afde0.png" 
                alt="Community post about SaaS launch" 
                className="w-full h-auto mt-4 rounded-md"
              />
            </div>

            <div className="bg-muted rounded-md aspect-square p-6 flex justify-between flex-col">
              <User className="w-8 h-8 stroke-1" />
              <div className="flex flex-col">
                <h3 className="text-xl tracking-tight">Easy to Use</h3>
                <p className="text-muted-foreground max-w-xs text-base">
                  Simple drag-and-drop interface to create professional posts in minutes.
                </p>
              </div>
            </div>
            <div className="bg-muted rounded-md h-full lg:col-span-2 p-6 aspect-square lg:aspect-auto flex justify-between flex-col">
              <User className="w-8 h-8 stroke-1" />
              <div className="flex flex-col">
                <h3 className="text-xl tracking-tight">Viral Content Templates</h3>
                <p className="text-muted-foreground max-w-xs text-base">
                  Choose from professionally designed templates that are proven to increase engagement and reach.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export { Feature };