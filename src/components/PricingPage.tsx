import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";
import Navbar from "./Navbar";

const PricingPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Pricing Section */}
      <div className="max-w-6xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Simple Pricing
          </h2>
          <p className="text-xl text-gray-600">
            Choose the plan that works best for you
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">

          {/* Monthly Plan */}
          <Card className="relative bg-white">
            <CardHeader>
              <CardTitle className="text-xl text-gray-900">Monthly</CardTitle>
              <CardDescription className="text-gray-600">For regular content creators</CardDescription>
              <div className="text-3xl font-bold text-gray-900">$22<span className="text-lg font-normal text-gray-600">/month</span></div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-600" />
                  <span className="text-gray-700">Unlimited posts</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-600" />
                  <span className="text-gray-700">Weekly updates</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-600" />
                  <span className="text-gray-700">Limited Mac backgrounds</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-600" />
                  <span className="text-gray-700">Priority support</span>
                </li>
              </ul>
              <Button className="w-full mt-6 bg-black text-white hover:bg-gray-800">
                Choose Monthly
              </Button>
            </CardContent>
          </Card>

          {/* Lifetime Plan */}
          <Card className="relative bg-white">
            <CardHeader>
              <CardTitle className="text-xl text-gray-900">Lifetime</CardTitle>
              <CardDescription className="text-gray-600">One-time payment, forever access</CardDescription>
              <div className="text-3xl font-bold text-gray-900">$67<span className="text-lg font-normal text-gray-600"> once</span></div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-600" />
                  <span className="text-gray-700">Unlimited posts</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-600" />
                  <span className="text-gray-700">Weekly updates</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-600" />
                  <span className="text-gray-700">Unlimited Mac backgrounds</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-600" />
                  <span className="text-gray-700">Priority support</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-600" />
                  <span className="text-gray-700">Lifetime access</span>
                </li>
              </ul>
              <Button className="w-full mt-6" variant="outline">
                Get Lifetime
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* FAQ Section */}
        <div className="text-center mt-20">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Have questions?
          </h3>
          <p className="text-gray-600">
            Contact us at support@framepost.com for any questions about our pricing plans.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PricingPage;