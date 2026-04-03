import Navigation from "./Navigation";
import { ReactNode } from "react";

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 pt-4">
        <main className="w-full">
          <div className="w-full px-4 py-8">
            {children}
          </div>
        </main>
      </div>
    </>
  );
};

export default DashboardLayout;
