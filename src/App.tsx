import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route,Navigate } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import BrowsePage from "./pages/BrowsePage";
import MyAccountPage from "./pages/MyAccountPage";
import AdminPage from "./pages/AdminPage";
import DashboardLayout from "./components/DashboardLayout";
import HeroSection from "./components/HeroSection";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import FakeContentDetectorPage from "./pages/FakeContentDetector";

import LeaderboardPage from "./pages/LeaderboardPage";
import { AuthProvider } from "./contexts/AuthContext";
// import { Navigate } from "react-router-dom";
import MakeImpactPage from "./pages/MakeImpactPage";
import { useAuth } from "./contexts/AuthContext";

const ProtectedIndex = () => {
  const { user, isAdmin, isLoading } = useAuth();
  
  if (isLoading) return null;

  if (user) {
    if (isAdmin) {
      return <Navigate to="/admin" replace />;
    }
    return <MakeImpactPage />;
  }
  
  return <Index />;
};

const queryClient = new QueryClient();

const App = () => (

  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
        <AuthProvider>
      <BrowserRouter>
          <Routes>
<Route path="/" element={<ProtectedIndex />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />



          <Route path="/browse" element={
            <DashboardLayout>
              <BrowsePage />
            </DashboardLayout>
          } />
          <Route path="/account" element={
            <DashboardLayout>
              <MyAccountPage />
            </DashboardLayout>
          } />
          <Route path="/admin" element={
            <DashboardLayout>
              <AdminPage />
            </DashboardLayout>
          } />
          <Route path="/home" element={
            <DashboardLayout>
              <HeroSection />
            </DashboardLayout>
          } />
          <Route path="/fake-detector" element={
            <DashboardLayout>
              <FakeContentDetectorPage />
            </DashboardLayout>
          } />
          <Route path="/leaderboard" element={
            <DashboardLayout>
              <LeaderboardPage />
            </DashboardLayout>
          } />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;