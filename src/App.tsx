import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Index from "./pages/Index";
import SelectLawyer from "./pages/SelectLawyer";
import Payments from "./pages/Payments";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import { ProfileMenu } from "./components/ProfileMenu";
import ErrorBanner from "@/components/ErrorBanner";
import { ToastProvider } from "@/components/ui/toast";

function App() {
  const [errorBannerVisible, setErrorBannerVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const showError = (message: string) => {
    console.log("Showing error banner with message:", message);
    setErrorMessage(message);
    setErrorBannerVisible(true);
  };

  useEffect(() => {
    showError("This is a test error message for debugging.This is a test error message for debugging.This is a test error message for debugging.");
  }, []);

  return (
    <ToastProvider>
      <Router>
        <div className="relative min-h-screen">
          {errorBannerVisible && (
            <ErrorBanner
              message={errorMessage}
              onClose={() => setErrorBannerVisible(false)}
            />
          )}
          <div className="mx-auto">
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/chat" element={<Index />} />
              <Route path="/select-lawyer" element={<SelectLawyer />} />
              <Route path="/payments" element={<Payments />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/privacy" element={<Privacy />} />
            </Routes>
          </div>
          <div className="fixed bottom-4 left-4 z-50">
            <ProfileMenu />
          </div>
        </div>
      </Router>
    </ToastProvider>
  );
}

export default App;