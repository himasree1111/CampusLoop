import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Recycle, Mail, MessageCircle, Instagram, Twitter, Facebook } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-forest text-white">
      <div className="container mx-auto px-4 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and Mission */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="p-2 bg-mint/20 rounded-lg">
                <Recycle className="h-6 w-6 text-mint" />
              </div>
              <span className="text-2xl font-bold text-mint">EcoSwap</span>
            </div>
            <p className="text-white/80 mb-6 max-w-md leading-relaxed">
              Building a sustainable future through community-driven swapping. Every exchange reduces waste and creates connections.
            </p>
            <div className="flex gap-3">
              <Button size="icon" variant="ghost" className="text-white/80 hover:text-mint hover:bg-white/10 transition-all duration-600">
                <Facebook size={20} />
              </Button>
              <Button size="icon" variant="ghost" className="text-white/80 hover:text-mint hover:bg-white/10 transition-all duration-600">
                <Twitter size={20} />
              </Button>
              <Button size="icon" variant="ghost" className="text-white/80 hover:text-mint hover:bg-white/10 transition-all duration-600">
                <Instagram size={20} />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-mint mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {["About Us", "How It Works", "Browse Swaps", "Post Item", "Community Guidelines"].map((link) => (
                <li key={link}>
                  <Button variant="ghost" className="text-white/80 hover:text-mint p-0 h-auto font-normal justify-start transition-all duration-600">
                    {link}
                  </Button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-mint mb-4">Get in Touch</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-white/80">
                <Mail size={16} />
                <span>hello@ecoswap.com</span>
              </li>
              <li className="flex items-center gap-2 text-white/80">
                <MessageCircle size={16} />
                <span>Join our community chat</span>
              </li>
            </ul>
            
            <div className="mt-6">
              <h4 className="font-medium text-white mb-2">Support</h4>
              <Button variant="ghost" className="text-white/80 hover:text-mint p-0 h-auto font-normal justify-start transition-all duration-600">
                Help Center
              </Button>
            </div>
          </div>
        </div>

        <Separator className="my-8 bg-white/20" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/60 text-sm">
            © {currentYear} EcoSwap. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <Button variant="ghost" className="text-white/60 hover:text-mint p-0 h-auto font-normal transition-all duration-600">
              Privacy Policy
            </Button>
            <Button variant="ghost" className="text-white/60 hover:text-mint p-0 h-auto font-normal transition-all duration-600">
              Terms of Service
            </Button>
            <Button variant="ghost" className="text-white/60 hover:text-mint p-0 h-auto font-normal">
              Cookie Policy
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;