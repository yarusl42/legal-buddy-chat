import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ResponsiveContainer, XAxis, YAxis, Tooltip, LineChart, Line } from "recharts";
import { Progress } from "@/components/ui/progress";
import { useState, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from "@/store/hooks";

const UsageTab = ({ setActiveTab }) => {
  const availablePlans = useAppSelector((state) => state.plans.availablePlans);
  const currentPlanFromStore = useAppSelector((state) => state.plans.currentPlan);
  const usagePerMonthLast12Month = useAppSelector((state) => state.usage.usagePerMonthLast12Month);
  const totalRequests = useAppSelector((state) => state.usage.totalRequests);
  const usedRequests = useAppSelector((state) => state.usage.usedRequests);
  const billingPeriod = useAppSelector((state) => state.billing.billingPeriod);
  const [currentPlan, setCurrentPlan] = useState(`${availablePlans[currentPlanFromStore].price.amount} ${availablePlans[currentPlanFromStore].price.currency}/month`);

  useEffect(() => {
    if (availablePlans[currentPlanFromStore]) {
      const planAmount = availablePlans[currentPlanFromStore].price.amount;
      const planCurrency = availablePlans[currentPlanFromStore].price.currency;
      const planDisplay = planAmount === "Free" ? planAmount : `${planAmount} ${planCurrency}/month`;
      setCurrentPlan(planDisplay);
    }
  }, [availablePlans, currentPlanFromStore]);

  const switchToPricing = () => {
    setActiveTab('pricing');
  };

  const remainingRequests = totalRequests - usedRequests;
  const percentageUsed = (usedRequests / totalRequests) * 100;

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold">Usage</h3>
            <p className="text-sm text-muted-foreground">Current billing period: {billingPeriod ? `${billingPeriod.start} - ${billingPeriod.end}, ${billingPeriod.year}` : 'No billing period available'}</p>
          </div>
          <Button onClick={switchToPricing}>Upgrade Plan</Button>
        </div>

        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-2">
              <div className="text-sm font-medium">Number of prompts</div>
              <div className="text-sm text-muted-foreground">{usedRequests} of {totalRequests} requests</div>
            </div>
            <Progress value={percentageUsed} className="h-2" />
            <div className="mt-1 text-sm text-muted-foreground">{remainingRequests} requests remaining</div>
          </div>

          <div className="text-sm">
            <span className="font-medium">Current Plan: </span>
            <span className="text-muted-foreground">{currentPlan}</span>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Number of prompts</h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            {usagePerMonthLast12Month.length === 0 ? (
              <div className="flex items-center justify-center h-full text-gray-500">
                No usage data available
              </div>
            ) : (
              <LineChart data={usagePerMonthLast12Month}>
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip 
                  formatter={(value: number) => [value, 'Requests']}
                />
                <Line 
                  type="monotone" 
                  dataKey="requests" 
                  stroke="#2563eb" 
                  strokeWidth={2}
                  dot={{ fill: "#2563eb" }}
                />
              </LineChart>
            )}
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
};

export default UsageTab;