import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch"; 
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { setAutoRenewal } from "@/store/slices/billingSlice";
import PaymentMethodsTab from "./PaymentMethodsTab";

const BillingTab = () => {
  const isAutoRenewalEnabled = useAppSelector((state) => state.billing.isAutoRenewalEnabled);
  const nextBillingDate = useAppSelector((state) => state.billing.nextBillingDate);
  const billingHistory = useAppSelector((state) => state.billing.billingHistory);
  const dispatch = useAppDispatch();

  const handleToggleAutoRenewal = () => {
    dispatch(setAutoRenewal(!isAutoRenewalEnabled));
  };
  const availablePlans = useAppSelector((state) => state.plans.availablePlans);
  const currentPlan = useAppSelector((state) => state.plans.currentPlan);

  const handlePayment = (entry: { date: string; plan: string; amount: string }) => {
    toast.promise(
      new Promise((resolve) => setTimeout(resolve, 1500)), // Simulate API call
      {
        loading: 'Processing payment...',
        success: `Payment for ${entry.plan} (${entry.date}) was successful!`,
        error: 'Payment failed. Please try again.',
      }
    );
  };

  return (
    <div className="space-y-4">
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Billing Overview</h3>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="p-4">
              <div className="text-sm text-muted-foreground">Current Plan</div>
              <div className="text-2xl font-bold">{currentPlan}</div>
              <div className="text-sm text-muted-foreground">{`${availablePlans[currentPlan].price.amount} ${availablePlans[currentPlan].price.currency}/month`}</div>
            </Card>
            <Card className="p-4">
              <div className="text-sm text-muted-foreground">Next Billing Date</div>
              <div className="text-2xl font-bold">{nextBillingDate}</div>
              <div className="flex items-center text-sm text-muted-foreground mt-1">
                {currentPlan !== "Free" && (
                  <>
                    <div className="mr-2">Auto-renewal:</div>
                    <Switch
                      checked={isAutoRenewalEnabled}
                      onCheckedChange={handleToggleAutoRenewal}
                    />
                  </>
                )}
              </div>
            </Card>
          </div>
        </div>
      </Card>

      <PaymentMethodsTab />

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Billing History</h3>
        <div className="space-y-4">
          <div className="border rounded-lg divide-y">
            {billingHistory.length === 0 ? (
              <div className="p-4 text-center text-sm text-muted-foreground">
                No billing history available.
              </div>
            ) : (
              billingHistory.map((entry, index) => (
                <div key={index} className="p-4 flex items-center justify-between">
                  <div>
                    <div className="font-medium">{entry.date}</div>
                    <div className="text-sm text-muted-foreground">{entry.plan}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">{entry.amount}</div>
                    <div className={`text-sm ${entry.status === "Paid" ? "text-green-600" : "text-red-600"}`}>
                      {entry.status}
                    </div>
                    {entry.status === "Unpaid" && (
                      <Button 
                        variant="outline" 
                        onClick={() => handlePayment(entry)}
                        className="mt-2"
                      >
                        Pay Now
                      </Button>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default BillingTab;