import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import AddCardDialog from './AddCardDialog';
import { Check } from "lucide-react";
import { useAppSelector } from "@/store/hooks";
import { setCurrentPlan } from "@/store/slices/plansSlice";
import { addCard } from "@/store/slices/paymentMethodsSlice";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogOverlay,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";

const PricingTab = () => {
  const availablePlans = useAppSelector((state) => state.plans.availablePlans);
  const currentPlan = useAppSelector((state) => state.plans.currentPlan);
  const paymentMethods = useAppSelector((state) => state.paymentMethods);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState('');
  const [status, setStatus] = useState("");
  const [newPlan, setNewPlan] = useState("");
  const [formData, setFormData] = useState({
    number: "",
    expiry: "",
    cvv: ""
  });
  const [errors, setErrors] = useState({});

  const handleChoosePlan = async (plan: string) => {
    setNewPlan(plan);
    setStatus("Checking payment methods...");

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (paymentMethods.length === 0) {
        setDialogMessage("No payment methods available.");
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
    setDialogMessage("Processing plan change...");

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
          {Object.entries(availablePlans).map(([planName, planDetails]) => (
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
        handleAddCard={() => {
          addCard({
            ...formData,
              id: Array(10)
                .fill('')
                .map(() => String.fromCharCode(97 + Math.floor(Math.random() * 26)))
                .join(''),
              last4: formData.number.slice(-4),
              expiryMonth: formData.expiry.split('/')[0],
              expiryYear: formData.expiry.split('/')[1],
              isPreferred: false,
              brand: "visa",
          });
          handleUpgradePlan(newPlan)
        }} 
      />

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogOverlay />
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Status</DialogTitle>
          </DialogHeader>
          <DialogDescription>{dialogMessage}</DialogDescription>
          <DialogClose onClick={() => setIsDialogOpen(false)}>Close</DialogClose>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PricingTab;