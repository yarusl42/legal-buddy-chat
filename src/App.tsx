import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Settings from "./pages/Settings";
import { ProfileMenu } from "./components/ProfileMenu";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/settings" element={<Settings />} />
          {/* These routes will need to be implemented later */}
          <Route path="/laws" element={<div>Laws Page (Coming Soon)</div>} />
          <Route path="/payments" element={<div>Payments Page (Coming Soon)</div>} />
        </Routes>
        <ProfileMenu />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;