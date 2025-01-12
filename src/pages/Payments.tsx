import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BackButton } from "@/components/BackButton";
import UsageTab from "@/components/tabs/UsageTab";
import BillingTab from "@/components/tabs/BillingTab";
import PricingTab from "@/components/tabs/PricingTab";
import { ChartBar, CreditCard, DollarSign } from "lucide-react";

const Payments = () => {
  const [activeTab, setActiveTab] = useState("usage");

  return (
    <div className="flex h-screen bg-gray-50">
      <div className="w-80 bg-white p-4 border-r border-gray-200">
        <BackButton />
        <div className="ml-12">
          <h2 className="text-xl font-bold text-primary mt-1 mb-4">Payments & Billing</h2>
        </div>
        <div className="text-sm text-muted-foreground mb-6">
          Manage your subscription, billing, and payment methods
        </div>
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          orientation="vertical"
          className="w-full"
        >
          <TabsList className="flex flex-col h-auto bg-transparent space-y-1">
            <TabsTrigger value="usage" className="justify-start w-full">
              <ChartBar className="mr-2" /> Usage
            </TabsTrigger>
            <TabsTrigger value="billing" className="justify-start w-full">
              <CreditCard className="mr-2" /> Billing
            </TabsTrigger>
            <TabsTrigger value="pricing" className="justify-start w-full">
              <DollarSign className="mr-2" /> Pricing
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto p-6">
        <Tabs value={activeTab} className="w-full">
          <TabsContent value="usage"><UsageTab /></TabsContent>
          <TabsContent value="billing"><BillingTab /></TabsContent>
          <TabsContent value="pricing"><PricingTab /></TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Payments;