import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "react-toastify";
import AddCardDialog from './AddCardDialog';

const PricingTab = () => {
  const [currentPlan, setCurrentPlan] = useState("Professional");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [status, setStatus] = useState(""); // New state for status
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [newPlan, setNewPlan] = useState("");
  const [formData, setFormData] = useState({
    number: "",
    expiry: "",
    cvv: ""
  });
  const [errors, setErrors] = useState({});

  const freePlanPrice = { amount: "Free", currency: "" };
  const basicPlanPrice = { amount: "29", currency: "$" };
  const professionalPlanPrice = { amount: "79", currency: "$" };

  const handleChoosePlan = (plan) => {
    setNewPlan(plan)
    setIsDialogOpen(true);
    
    checkPaymentMethod()
  };

  const checkPaymentMethod = async () => {
    setStatus("Checking for payment methods...");

    const promise = new Promise((resolve, reject) => {
      const hasPaymentMethod = !!paymentMethods.length;
      resolve(hasPaymentMethod)
      setStatus(""); // Reset status
    });
    const hasPaymentMethodSet = await promise;
    if (!hasPaymentMethodSet) {
      setIsDialogOpen(true);
    }
  };

  const makePayment = async (newPlan) => {
    console.log("Switching to new plan: ", newPlan)
    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        const canUpgrade = Math.random() > 0.2;
        if (!canUpgrade) {
          reject(false);
        } else {
          resolve(true);
        }
      }, 1000);
    });
    const result = await promise;
    return result;
  }

  const handleUpgradePlan = async () => {
    setStatus("Processing payment..."); // Set status to processing payment


    // Simulate payment call
    setTimeout(async () => {
      const paymentSuccess = await makePayment(newPlan);

      if (paymentSuccess) {
        setCurrentPlan(newPlan);
        toast.success("Plan upgraded successfully!");
      } else {
        toast.error("Payment failed. Please try again.");
      }
      setNewPlan("");
      setStatus("");
    }, 1000);
  };

  return (
    <div className="space-y-4">
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Subscription Plans</h3>
        <div className="grid grid-cols-3 gap-4">
          <Card className="p-6 border flex flex-col">
            <div className="text-center flex-grow">
              <h4 className="text-xl font-semibold mb-2">Free</h4>
              <div className="text-3xl font-bold mb-4">{freePlanPrice.currency}{freePlanPrice.amount}<span className="text-sm font-normal">/mo</span></div>
              <ul className="text-sm space-y-2 mb-6">
                <li>5 calls/month</li>
                <li>Basic legal templates</li>
              </ul>
            </div>
            <Button 
              className="w-full" 
              onClick={() => handleChoosePlan("Free")}
              disabled={currentPlan === "Free"}
            >
              {currentPlan === "Free" ? "Current Plan" : "Choose Plan"}
            </Button>
          </Card>
          <Card className="p-6 border relative flex flex-col">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-white px-3 py-1 rounded-full text-sm">
              Popular
            </div>
            <div className="text-center flex-grow">
              <h4 className="text-xl font-semibold mb-2">Basic</h4>
              <div className="text-3xl font-bold mb-4">{basicPlanPrice.currency}{basicPlanPrice.amount}<span className="text-sm font-normal">/mo</span></div>
              <ul className="text-sm space-y-2 mb-6">
                <li>50 calls/month</li>
                <li>Basic legal templates</li>
                <li>Email support</li>
              </ul>
            </div>
            <Button 
              className="w-full" 
              onClick={() => handleChoosePlan("Basic")}
              disabled={currentPlan === "Basic"}
            >
              {currentPlan === "Basic" ? "Current Plan" : "Choose Plan"}
            </Button>
          </Card>
          <Card className="p-6 border relative flex flex-col">
            <div className="text-center flex-grow">
              <h4 className="text-xl font-semibold mb-2">Professional</h4>
              <div className="text-3xl font-bold mb-4">{professionalPlanPrice.currency}{professionalPlanPrice.amount}<span className="text-sm font-normal">/mo</span></div>
              <ul className="text-sm space-y-2 mb-6">
                <li>150 calls/month</li>
                <li>All legal templates</li>
                <li>Priority support</li>
                <li>Document review</li>
              </ul>
            </div>
            <Button 
              className="w-full" 
              onClick={() => handleChoosePlan("Professional")}
              disabled={currentPlan === "Professional"}
            >
              {currentPlan === "Professional" ? "Current Plan" : "Choose Plan"}
            </Button>
          </Card>
        </div>
      </Card>

      <AddCardDialog 
        open={isDialogOpen} 
        onOpenChange={setIsDialogOpen} 
        formData={formData} 
        setFormData={setFormData} 
        errors={errors} 
        handleAddCard={handleUpgradePlan} 
      />
    </div>
  );
};

export default PricingTab;