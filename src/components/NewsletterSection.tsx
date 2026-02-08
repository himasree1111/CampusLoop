import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Send } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const NewsletterSection = () => {
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast({
        title: "Success!",
        description: "You've been subscribed to our newsletter.",
      });
      setEmail("");
    }
  };

  return (
    <section id="stay-in-the-loop" className="py-16 lg:py-24 dynamic-bg relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 to-pink-900/20" />
      
      {/* Dynamic floating background elements */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-r from-cyan-400/15 to-blue-400/15 rounded-full blur-2xl wave-animation"></div>
      <div className="absolute bottom-10 right-10 w-40 h-40 bg-gradient-to-r from-purple-400/15 to-pink-400/15 rounded-full blur-3xl bounce-animation" style={{ animationDelay: '2s' }}></div>
      <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 rounded-full blur-xl rotate-animation" style={{ animationDelay: '1s' }}></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <Card className="max-w-2xl mx-auto shadow-2xl border-white/20 bg-white/95 backdrop-blur-lg scale-on-hover">
          <CardContent className="p-8 md:p-12 text-center">
            <div className="flex justify-center mb-6">
              <div className="p-3 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full pulse-glow">
                <Mail className="h-8 w-8 text-purple-600 bounce-animation" />
              </div>
            </div>
            
            <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4 fade-in-up">
              Stay in the Loop
            </h2>
            
            <p className="text-gray-600 mb-8 text-lg fade-in-up" style={{ animationDelay: '0.2s' }}>
              Get the latest sustainability tips, swap ideas, and eco-friendly living advice delivered to your inbox.
            </p>
            
            <form onSubmit={handleSubmit} className="space-y-4 fade-in-up" style={{ animationDelay: '0.4s' }}>
              <div className="flex flex-col sm:flex-row gap-3">
                <Input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 border-purple-200 focus:border-purple-500 transition-all duration-600 hover:shadow-lg"
                  required
                />
                <Button 
                  type="submit"
                  variant="gradient"
                  className="px-8 group transform hover:scale-105 transition-all duration-600 wave-animation"
                >
                  Subscribe
                  <Send className="ml-2 h-4 w-4 group-hover:translate-x-2 transition-transform duration-300" />
                </Button>
              </div>
              
              <p className="text-sm text-gray-500">
                No spam, unsubscribe anytime. We respect your privacy.
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default NewsletterSection;