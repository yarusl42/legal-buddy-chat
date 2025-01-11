import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Settings from "./pages/Settings";
import Landing from "./pages/Landing";
import { ProfileMenu } from "./components/ProfileMenu";

function App() {
  return (
    <Router>
      <div className="relative min-h-screen">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/chat" element={<Index />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
        <div className="fixed bottom-4 left-4">
          <ProfileMenu />
        </div>
      </div>
    </Router>
  );
}

export default App;