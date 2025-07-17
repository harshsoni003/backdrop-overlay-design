import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "./Navbar";
import { FeatureDemo } from "@/components/ui/demo";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <div className="max-w-6xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-gray-900 mb-6">
            Add Mac Background and  <span className="text-red-600 underline decoration-2">Make your post viral</span>
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Make your post look professional and reach millions of views using a Mac-style background.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link to="/editor">
              <Button size="lg" className="bg-black text-white hover:bg-gray-800 px-8">
                Try Now
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="px-8">
              Demo
            </Button>
          </div>
        </div>

        {/* Image Grid */}
        <div className="space-y-8">
          {/* Five new images in a grid layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="rounded-lg overflow-hidden shadow-lg">
              <img 
                src="/lovable-uploads/0b4f2337-862e-4468-ad34-1a557a76b023.png" 
                alt="Code snippet in Twitter/X post" 
                className="w-full h-auto"
              />
            </div>
            <div className="rounded-lg overflow-hidden shadow-lg">
              <img 
                src="/lovable-uploads/356940fd-7911-4c56-aafa-72d68cb4e4f5.png" 
                alt="MVP launch Twitter profile" 
                className="w-full h-auto"
              />
            </div>
            <div className="rounded-lg overflow-hidden shadow-lg">
              <img 
                src="/lovable-uploads/917ef09a-53be-46db-93c6-0de4514fe637.png" 
                alt="Developer profile with stats" 
                className="w-full h-auto"
              />
            </div>
            <div className="rounded-lg overflow-hidden shadow-lg md:col-span-2 lg:col-span-1">
              <img 
                src="/lovable-uploads/5378329f-9d75-4b00-b789-1bc454ae4f71.png" 
                alt="LinkedIn AI developer profile" 
                className="w-full h-auto"
              />
            </div>
            <div className="rounded-lg overflow-hidden shadow-lg md:col-span-2">
              <img 
                src="/lovable-uploads/5f61b4cc-138b-40be-b672-e132d1d5609f.png" 
                alt="Building brains for bots LinkedIn banner" 
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
        
        {/* Feature Section */}
        <div className="mt-20">
          <FeatureDemo />
        </div>
      </div>
    </div>
  );
};

export default LandingPage;