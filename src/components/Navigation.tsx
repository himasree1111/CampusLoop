import { Button } from "@/components/ui/button";
import { Home, Package, User, Shield, Menu, X, BookOpen, LogIn } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Navigation = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: "Home", icon: Home, path: "/" },
    { name: "Browse Items", icon: Package, path: "/browse" },
    { name: "My Account", icon: User, path: "/account" },
    { name: "Admin Panel", icon: Shield, path: "/admin" },
  ];

  const navigateTo = (path: string) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/10 backdrop-blur-lg border-b border-white/20">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="p-2 bg-gradient-to-r from-blue-500 to-green-500 rounded-lg pulse-glow">
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
                  variant="ghost"
                  className="text-white hover:bg-white/10 hover:text-white transform hover:scale-105 transition-all duration-600"
                  onClick={() => navigateTo(item.path)}
                >
                  <IconComponent className="h-4 w-4 mr-2" />
                  {item.name}
                </Button>
              );
            })}
            <Button
              variant="ghost"
              className="text-white hover:bg-white/10 hover:text-white transform hover:scale-105 transition-all duration-600 ml-2"
              onClick={() => navigateTo("/login")}
            >
              <LogIn className="h-4 w-4 mr-2" />
              Login
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/10"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-white/20 fade-in-up">
            <div className="flex flex-col space-y-2">
              {navItems.map((item) => {
                const IconComponent = item.icon;
                return (
                  <Button
                    key={item.name}
                    variant="ghost"
                    className="text-white hover:bg-white/10 hover:text-white justify-start transform hover:scale-105 transition-all duration-600"
                    onClick={() => navigateTo(item.path)}
                  >
                    <IconComponent className="h-4 w-4 mr-2" />
                    {item.name}
                  </Button>
                );
              })}
              <Button
                variant="ghost"
                className="text-white hover:bg-white/10 hover:text-white justify-start transform hover:scale-105 transition-all duration-600"
                onClick={() => navigateTo("/login")}
              >
                <LogIn className="h-4 w-4 mr-2" />
                Login
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;