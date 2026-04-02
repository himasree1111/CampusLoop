import { Button } from "@/components/ui/button";
import { Home, Package, User, Shield, ShieldAlert, Trophy, Menu, X, BookOpen, LogOut } from "lucide-react";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const Navigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isAdmin, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const baseNavItems = user && isAdmin ? [] : [
    { name: "Home", icon: Home, path: "/" },
    { name: "Browse Items", icon: Package, path: "/browse" },
    { name: "Fake Content Detector", icon: ShieldAlert, path: "/fake-detector" },
  ];

  const leaderboardItem = { name: "Leaderboard", icon: Trophy, path: "/leaderboard" };

  const accountNavItems = user ? [
    ...(isAdmin ? [{ name: "Admin Panel", icon: Shield, path: "/admin" }] : []),
    { name: "My Account", icon: User, path: "/account" },
    { name: "Logout", icon: LogOut, path: "/", onClick: async () => {
      await logout();
      navigate("/");
    }}
  ] : [];

  const navItems = [...baseNavItems, ...(user ? [leaderboardItem] : []), ...accountNavItems];

  const navigateTo = (path: string, onClick?: () => void) => {
    onClick?.();
    navigate(path);
    setIsMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b border-gray-200 shadow-sm">
      <div className="w-full px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="p-2 bg-gradient-to-r from-blue-500 to-green-500 rounded-lg">
              <BookOpen className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
              CampusLoop
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <Button
                  key={item.name}
                  variant={isActive(item.path) ? "default" : "ghost"}
                  className={`hover:bg-gray-100 ${isActive(item.path) ? 'bg-blue-600 hover:bg-blue-700 text-white' : ''} transform hover:scale-105 transition-all duration-300`}
                  onClick={() => (item as any).onClick ? (item as any).onClick() : navigateTo(item.path)}
                >
                  <IconComponent className="h-4 w-4 mr-2" />
                  {item.name}
                </Button>
              );
            })}

          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              className="hover:bg-gray-100"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200 bg-white/80">
            <div className="flex flex-col space-y-2">
              {navItems.map((item) => {
                const IconComponent = item.icon;
                return (
                  <Button
                    key={item.name}
                    variant="ghost"
                    className={`justify-start hover:bg-gray-100 ${isActive(item.path) ? 'bg-blue-600 hover:bg-blue-700 text-white' : ''} transform hover:scale-105 transition-all duration-300`}
                    onClick={() => (item as any).onClick ? (item as any).onClick() : navigateTo(item.path)}
                  >
                    <IconComponent className="h-4 w-4 mr-2" />
                    {item.name}
                  </Button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;