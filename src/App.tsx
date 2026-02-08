import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import BrowsePage from "./pages/BrowsePage";
import MyAccountPage from "./pages/MyAccountPage";
import AdminPage from "./pages/AdminPage";
import DashboardLayout from "./components/DashboardLayout";
import HeroSection from "./components/HeroSection";
import LoginPage from "./pages/LoginPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<LoginPage />} />
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
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;