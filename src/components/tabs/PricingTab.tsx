import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";
import AddCardDialog from './AddCardDialog';
import { Check } from "lucide-react";

const PricingTab = () => {
  const [currentPlan, setCurrentPlan] = useState("Professional");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [status, setStatus] = useState("");
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [newPlan, setNewPlan] = useState("");
  const [formData, setFormData] = useState({
    number: "",
    expiry: "",
    cvv: ""
  });
  const [errors, setErrors] = useState({});

  const plans = {
    Free: {
      price: { amount: "Free", currency: "" },
      features: ["5 calls/month", "Basic legal templates"]
    },
    Basic: {
      price: { amount: "29", currency: "$" },
      features: ["50 calls/month", "Basic legal templates", "Email support"]
    },
    Professional: {
      price: { amount: "79", currency: "$" },
      features: ["150 calls/month", "All legal templates", "Priority support", "Document review"]
    }
  };

  const handleChoosePlan = async (plan: string) => {
    if (plan === currentPlan) {
      toast.info("You are already on this plan");
      return;
    }

    setNewPlan(plan);
    setStatus("Checking payment methods...");

    try {
      // Simulate checking payment methods
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (paymentMethods.length === 0) {
        setIsDialogOpen(true);
      } else {
        handleUpgradePlan(plan);
      }
    } catch (error) {
      toast.error("Failed to process plan change");
    } finally {
      setStatus("");
    }
  };

  const handleUpgradePlan = async (plan: string) => {
    setStatus("Processing plan change...");
    
    toast.promise(
      new Promise((resolve, reject) => {
        setTimeout(() => {
          if (Math.random() > 0.1) {
            setCurrentPlan(plan);
            resolve(true);
          } else {
            reject(new Error("Payment failed"));
          }
        }, 1500);
      }),
      {
        loading: 'Updating your subscription...',
        success: `Successfully upgraded to ${plan} plan!`,
        error: 'Failed to update subscription. Please try again.',
      }
    );

    setNewPlan("");
    setStatus("");
    setIsDialogOpen(false);
  };

  return (
    <div className="space-y-4">
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Subscription Plans</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Object.entries(plans).map(([planName, planDetails]) => (
            <Card key={planName} className="p-6 border flex flex-col relative">
              {planName === "Basic" && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-white px-3 py-1 rounded-full text-sm">
                  Popular
                </div>
              )}
              <div className="text-center flex-grow">
                <h4 className="text-xl font-semibold mb-2">{planName}</h4>
                <div className="text-3xl font-bold mb-4">
                  {planDetails.price.currency}{planDetails.price.amount}
                  <span className="text-sm font-normal">/mo</span>
                </div>
                <ul className="text-sm space-y-2 mb-6">
                  {planDetails.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              <Button 
                className="w-full" 
                onClick={() => handleChoosePlan(planName)}
                disabled={currentPlan === planName}
                variant={currentPlan === planName ? "outline" : "default"}
              >
                {currentPlan === planName ? "Current Plan" : "Choose Plan"}
              </Button>
            </Card>
          ))}
        </div>
      </Card>

      <AddCardDialog 
        open={isDialogOpen} 
        onOpenChange={setIsDialogOpen} 
        formData={formData} 
        setFormData={setFormData} 
        errors={errors} 
        handleAddCard={() => handleUpgradePlan(newPlan)} 
      />
    </div>
  );
};

export default PricingTab;