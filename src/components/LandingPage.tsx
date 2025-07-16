import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Twitter } from "lucide-react";
import macCodingBg from "@/assets/mac-coding-bg.jpg";
import macWorkspaceBg from "@/assets/mac-workspace-bg.jpg";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-6 py-4 border-b">
        <div className="flex items-center">
          <h1 className="text-xl font-bold text-gray-900">text-in-between</h1>
        </div>
        <div className="flex items-center gap-6">
          <Link to="#" className="text-gray-600 hover:text-gray-900">
            Pricing
          </Link>
          <Twitter className="w-5 h-5 text-gray-600" />
          <Button variant="default" className="bg-black text-white hover:bg-gray-800">
            Sign In
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-6xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-gray-900 mb-6 animate-fade-in">
            Add Mac Background to <span className="text-red-600 underline decoration-2">Your Image</span>
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto animate-fade-in">
            Transform your photos with stunning Mac computer backgrounds for professional presentations and social media.
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="rounded-lg overflow-hidden shadow-lg hover-scale animate-fade-in">
            <img 
              src={macCodingBg} 
              alt="Mac with code background example" 
              className="w-full h-64 object-cover transition-transform duration-300 hover:scale-110"
            />
          </div>
          <div className="rounded-lg overflow-hidden shadow-lg hover-scale animate-fade-in">
            <img 
              src={macWorkspaceBg} 
              alt="Mac workspace background example" 
              className="w-full h-64 object-cover transition-transform duration-300 hover:scale-110"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;