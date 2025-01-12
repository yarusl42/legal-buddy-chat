import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, LineChart, Line } from "recharts";
import { Progress } from "@/components/ui/progress";
import { useState } from 'react';

const requestsData = [
  { date: "Jan 1", requests: 550 },
  { date: "Jan 2", requests: 0 },
  { date: "Jan 3", requests: 0 },
  { date: "Jan 4", requests: 0 },
  { date: "Jan 5", requests: 0 },
  { date: "Jan 6", requests: 0 },
  { date: "Jan 7", requests: 10 },
  { date: "Jan 8", requests: 170 },
];

const UsageTab = () => {
  const [activeTab, setActiveTab] = useState('usage');

  const switchToPricing = () => {
    setActiveTab('pricing');
  };

  const totalRequests = 1000;
  const usedRequests = 170;
  const remainingRequests = totalRequests - usedRequests;
  const percentageUsed = (usedRequests / totalRequests) * 100;

  // Dummy variables for current plan and billing period
  const currentPlan = "Pro ($79/month)";
  const billingPeriod = "Jan 1 - Jan 31, 2025";

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold">Usage</h3>
            <p className="text-sm text-muted-foreground">Current billing period: {billingPeriod}</p>
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
            {requestsData.length === 0 ? (
              <div className="flex items-center justify-center h-full text-gray-500">
                No usage data available
              </div>
            ) : (
              <LineChart data={requestsData}>
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