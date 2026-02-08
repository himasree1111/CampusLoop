import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden dynamic-bg min-h-screen flex items-center">
      <div className="absolute inset-0 bg-gradient-to-br from-black/30 via-transparent to-black/20" />
      
      {/* Enhanced floating elements with more variety */}
      <div className="absolute top-10 left-10 w-24 h-24 bg-white/15 rounded-full blur-xl wave-animation"></div>
      <div className="absolute bottom-20 right-20 w-40 h-40 bg-white/10 rounded-full blur-2xl bounce-animation" style={{ animationDelay: '2s' }}></div>
      <div className="absolute top-1/3 left-1/4 w-20 h-20 bg-white/20 rounded-full blur-lg rotate-animation" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-2/3 right-1/3 w-32 h-32 bg-white/8 rounded-full blur-xl floating-animation" style={{ animationDelay: '3s' }}></div>
      <div className="absolute bottom-1/3 left-1/2 w-16 h-16 bg-white/25 rounded-full blur-md wave-animation" style={{ animationDelay: '0.5s' }}></div>
      
      <div className="w-full relative z-10">
        <div className="max-w-4xl mx-auto text-center text-white px-4">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-white/15 rounded-full backdrop-blur-md pulse-glow scale-on-hover border border-white/20">
              <BookOpen size={48} className="bounce-animation" />
            </div>
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight fade-in-up">
            Welcome to{" "}
            <span className="text-yellow-300 drop-shadow-lg wave-animation bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">CampusLoop</span>
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 text-white/95 max-w-2xl mx-auto leading-relaxed fade-in-up" style={{ animationDelay: '0.2s' }}>
            Connect with fellow students to share resources, reduce waste, and build a sustainable campus community.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center fade-in-up" style={{ animationDelay: '0.4s' }}>
            <Button 
              variant="eco"
              size="lg" 
              className="px-8 py-6 text-lg font-semibold transform hover:scale-110 active:scale-95 transition-all duration-600 wave-animation"
              onClick={() => {
                document.getElementById('browse')?.scrollIntoView({ 
                  behavior: 'smooth' 
                });
              }}
            >
              Explore Resources
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-2 transition-transform duration-300 bounce-animation" />
            </Button>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default HeroSection;