import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Twitter, Sparkles, Zap, Image } from "lucide-react";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="flex items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-pink-500 rounded-lg flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              text-in-between
            </h1>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <Link to="#" className="text-gray-600 hover:text-gray-900 transition-colors font-medium">
            Pricing
          </Link>
          <Twitter className="w-5 h-5 text-gray-600 hover:text-blue-500 transition-colors cursor-pointer" />
          <Button variant="default" className="bg-gray-900 text-white hover:bg-gray-800 shadow-sm">
            Sign In
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-6 py-16 lg:py-24">
        <div className="text-center mb-20">
          <div className="mb-6">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-red-50 text-red-700 rounded-full text-sm font-medium border border-red-200">
              <Zap className="w-4 h-4" />
              Create Viral Content
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            Auto Insert{" "}
            <span className="relative">
              <span className="text-red-600">text between</span>
              <div className="absolute -bottom-2 left-0 right-0 h-1 bg-red-600 rounded-full"></div>
            </span>{" "}
            your images
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
            Create engaging social media posts, YouTube thumbnails, and viral content with our AI-powered text overlay tool. 
            Perfect for creators, marketers, and social media managers.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/editor">
              <Button size="lg" className="bg-gray-900 text-white hover:bg-gray-800 px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all">
                <Sparkles className="w-5 h-5 mr-2" />
                Try Now - Free
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="px-8 py-4 text-lg font-semibold border-2 hover:bg-gray-50">
              <Image className="w-5 h-5 mr-2" />
              View Demo
            </Button>
          </div>
          <p className="text-sm text-gray-500 mt-4">
            No signup required • Create unlimited designs • Export in HD
          </p>
        </div>

        {/* Features Section */}
        <div className="mb-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Zap className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Lightning Fast</h3>
              <p className="text-gray-600">Generate professional designs in seconds with our AI-powered editor</p>
            </div>
            <div className="text-center p-6">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Viral Templates</h3>
              <p className="text-gray-600">Use proven templates that have generated millions of views</p>
            </div>
            <div className="text-center p-6">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Image className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">High Quality</h3>
              <p className="text-gray-600">Export in high resolution perfect for all social platforms</p>
            </div>
          </div>
        </div>

        {/* Examples Section */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            See What's Possible
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            From YouTube thumbnails to Instagram posts, create content that stops the scroll
          </p>
        </div>

        {/* Image Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          <div className="group relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
            <img 
              src="/lovable-uploads/431cfbb8-3173-4425-9c6e-6e6b67c1c00e.png" 
              alt="POV style thumbnail example" 
              className="w-full h-64 lg:h-72 object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute bottom-4 left-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <p className="font-semibold">POV Style</p>
              <p className="text-sm text-gray-200">Perfect for storytelling</p>
            </div>
          </div>
          <div className="group relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
            <img 
              src="/lovable-uploads/00c27498-06df-4160-b69e-d88926b9fda1.png" 
              alt="Motivational content example" 
              className="w-full h-64 lg:h-72 object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute bottom-4 left-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <p className="font-semibold">Motivational</p>
              <p className="text-sm text-gray-200">Inspire your audience</p>
            </div>
          </div>
          <div className="group relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
            <img 
              src="/lovable-uploads/bf20a559-ddbd-4d6f-bca9-8f238979fcb1.png" 
              alt="Social media profile example" 
              className="w-full h-64 lg:h-72 object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute bottom-4 left-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <p className="font-semibold">Social Posts</p>
              <p className="text-sm text-gray-200">Boost engagement</p>
            </div>
          </div>
          <div className="group relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
            <img 
              src="/lovable-uploads/3fe44c63-cd4d-479a-bb87-6667ea8a0a8e.png" 
              alt="Professional profile example" 
              className="w-full h-64 lg:h-72 object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute bottom-4 left-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <p className="font-semibold">Professional</p>
              <p className="text-sm text-gray-200">Build your brand</p>
            </div>
          </div>
          <div className="group relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
            <img 
              src="/lovable-uploads/c8c53bed-e823-4e3c-88c5-fa6a2802b755.png" 
              alt="Business content example" 
              className="w-full h-64 lg:h-72 object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute bottom-4 left-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <p className="font-semibold">Business</p>
              <p className="text-sm text-gray-200">Professional growth</p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-20 bg-gradient-to-r from-gray-900 to-gray-800 rounded-3xl p-12 text-white">
          <h3 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Create Viral Content?
          </h3>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of creators who are already using our tool to boost their social media presence
          </p>
          <Link to="/editor">
            <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-100 px-8 py-4 text-lg font-semibold">
              <Sparkles className="w-5 h-5 mr-2" />
              Start Creating Now
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;