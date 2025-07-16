import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Twitter } from "lucide-react";

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
          <h2 className="text-5xl font-bold text-gray-900 mb-6">
            Add Mac Background and <span className="text-red-600 underline decoration-2">Make your post viral</span>
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
          {/* First row with 2 images */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="rounded-lg overflow-hidden shadow-lg">
              <img 
                src="/lovable-uploads/bf20a559-ddbd-4d6f-bca9-8f238979fcb1.png" 
                alt="MVP launch example" 
                className="w-full h-80 object-cover"
              />
            </div>
            <div className="rounded-lg overflow-hidden shadow-lg">
              <img 
                src="/lovable-uploads/3fe44c63-cd4d-479a-bb87-6667ea8a0a8e.png" 
                alt="Profile example" 
                className="w-full h-80 object-cover"
              />
            </div>
          </div>
          
          {/* Second row with 1 image */}
          <div className="flex justify-center">
            <div className="rounded-lg overflow-hidden shadow-lg w-full md:w-1/2">
              <img 
                src="/lovable-uploads/c8c53bed-e823-4e3c-88c5-fa6a2802b755.png" 
                alt="SaaS launch example" 
                className="w-full h-80 object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;