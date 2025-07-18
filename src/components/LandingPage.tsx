import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "./Navbar";

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
          
          <div className="flex justify-center mb-8">
            <Link to="/editor">
              <Button size="lg" className="bg-black text-white hover:bg-gray-800 px-8">
                Try Now
              </Button>
            </Link>
          </div>

          {/* Video Container */}
          <div className="flex justify-center">
            <div className="w-full max-w-4xl rounded-lg overflow-hidden shadow-lg">
              <iframe
                src="https://player.cloudinary.com/embed/?cloud_name=dhea2aqxb&public_id=maciframe_fxpusi&profile=mac"
                width="100%"
                height="450"
                allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
                allowFullScreen
                frameBorder="0"
                className="w-full"
              ></iframe>
            </div>
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
                className="w-full"
              />
            </div>
            <div className="rounded-lg overflow-hidden shadow-lg">
              <img 
                src="/lovable-uploads/3fe44c63-cd4d-479a-bb87-6667ea8a0a8e.png" 
                alt="Profile example" 
                className="w-full"
              />
            </div>
          </div>
          
          {/* Second row with 3 images */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-lg overflow-hidden shadow-lg">
              <img 
                src="/lovable-uploads/71aff636-01a3-4877-a510-d7f4600c8945.png" 
                alt="Lovable profile with mountain background" 
                className="w-full"
              />
            </div>
            
            <div className="rounded-lg overflow-hidden shadow-lg">
              <img 
                src="/lovable-uploads/7ebf5c66-78aa-46c6-989f-85a3b509c587.png" 
                alt="Harsh Soni profile with blue mountain background" 
                className="w-full"
              />
            </div>
            
            <div className="rounded-lg overflow-hidden shadow-lg">
              <img 
                src="/lovable-uploads/e04386aa-8cf1-416d-8531-6b615fcfaf6e.png" 
                alt="Profile with stats visualization" 
                className="w-full"
              />
            </div>
          </div>
          
          {/* Third row with 2 images */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="rounded-lg overflow-hidden shadow-lg">
              <img 
                src="/lovable-uploads/bb1be333-f32b-48d9-b65e-f5bbccc4d96f.png" 
                alt="Professional LinkedIn profile" 
                className="w-full"
              />
            </div>
            <div className="rounded-lg overflow-hidden shadow-lg">
              <img 
                src="/lovable-uploads/0e448bf4-706a-4006-9ebe-077a112fe3e2.png" 
                alt="Tanmay Kapurkar LinkedIn profile with hexagon pattern" 
                className="w-full"
              />
            </div>
          </div>
          
          {/* Fourth row with 1 image */}
          <div className="flex justify-center">
            <div className="rounded-lg overflow-hidden shadow-lg w-full md:w-2/3">
              <img 
                src="/lovable-uploads/d9b200c0-d91f-41d8-86c4-4ab204508f4c.png" 
                alt="SaaS launch guide with starry background" 
                className="w-full"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;