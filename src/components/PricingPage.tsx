import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";
import { useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import Navbar from "./Navbar";

const PricingPage = () => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Check current user
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handlePayment = (paymentUrl: string) => {
    if (!user) {
      toast({
        title: "Sign in required",
        description: "Please sign in to purchase a subscription",
        variant: "destructive",
      });
      navigate('/signin');
      return;
    }
    
    // Add user ID to the payment URL for tracking
    const urlWithUserId = `${paymentUrl}&custom_data=${user.id}`;
    window.open(urlWithUserId, '_blank');
  };

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
              <div className="text-3xl font-bold text-gray-900">$11<span className="text-lg font-normal text-gray-600">/month</span></div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-600" />
                  <span className="text-gray-700">Unlimited image editing</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-600" />
                  <span className="text-gray-700">No credit limits</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-600" />
                  <span className="text-gray-700">All backgrounds included</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-600" />
                  <span className="text-gray-700">Priority support</span>
                </li>
              </ul>
              <Button 
                className="w-full mt-6 bg-black text-white hover:bg-gray-800"
                onClick={() => handlePayment('https://checkout.dodopayments.com/buy/pdt_qTqiT2IJ8IpwtLFOIrplE?quantity=1&redirect_url=https://maciframe.lovable.app%2Feditor')}
              >
                Choose Monthly
              </Button>
            </CardContent>
          </Card>

          {/* Lifetime Plan */}
          <Card className="relative bg-white">
            <CardHeader>
              <CardTitle className="text-xl text-gray-900">Lifetime</CardTitle>
              <CardDescription className="text-gray-600">One-time payment, forever access</CardDescription>
              <div className="text-3xl font-bold text-gray-900">$49<span className="text-lg font-normal text-gray-600"> once</span></div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-600" />
                  <span className="text-gray-700">Unlimited image editing</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-600" />
                  <span className="text-gray-700">No credit limits</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-600" />
                  <span className="text-gray-700">All backgrounds included</span>
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
              <Button 
                className="w-full mt-6" 
                variant="outline"
                onClick={() => handlePayment('https://checkout.dodopayments.com/buy/pdt_Hnxf8C6pkmQ8oixcS9ESe?quantity=1&redirect_url=https://maciframe.lovable.app%2Feditor')}
              >
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