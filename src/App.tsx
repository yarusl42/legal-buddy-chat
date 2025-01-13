import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Landing from "./pages/Landing";
import Index from "./pages/Index";
import SelectLawyer from "./pages/SelectLawyer";
import Payments from "./pages/Payments";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import Login from './pages/Login';
import Signup from './pages/Signup';
import ForgotPassword from './pages/ForgotPassword';
import RecoverPassword from "@/pages/RecoverPassword";
import { ProfileMenu } from "./components/ProfileMenu";
import ErrorBanner from "@/components/ErrorBanner";
import { ToastProvider } from "@/components/ui/toast";
import { useAuth } from '@/utils';
import { useAppSelector } from "@/store/hooks";

function App() {
  const [loading, setLoading] = useState(true); // New loading state
  const [errorBannerVisible, setErrorBannerVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const auth = useAuth();
  const isLoggedIn = useAppSelector((state) => state.user.isLoggedIn);

  const showError = (message: string) => {
    setErrorMessage(message);
    setErrorBannerVisible(true);
  };

  useEffect(() => {
    const authenticate = async () => {
      await auth();
      setLoading(false);
    };
    authenticate();
  }, [auth]);

  useEffect(() => {
    showError("This is a test error message for debugging.This is a test error message for debugging.This is a test error message for debugging.");
  }, []);

  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center h-screen">Loading...</div>
      ) : (
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
                  <Route path="/login" element={isLoggedIn ? <Navigate to="/chat" /> : <Login />} />
                  <Route path="/signup" element={isLoggedIn ? <Navigate to="/chat" /> : <Signup />} />
                  <Route path="/forgot-password" element={isLoggedIn ? <Navigate to="/chat" /> : <ForgotPassword />} />
                  <Route path="/recover-password/:code" element={<RecoverPassword />} />
                  
                  <Route path="/" element={isLoggedIn ? <Navigate to="/chat" /> : <Landing />} />
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
      )}
    </>
    
  );
}

export default App;