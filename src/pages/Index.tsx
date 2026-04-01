import HeroSection from "@/components/HeroSection";
import NewsletterSection from "@/components/NewsletterSection";
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";

const Index = () => {
  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 pt-20">
        <div className="w-full">
          <div id="home" className="w-full">
            <HeroSection />
          </div>
          <div className="w-full px-4">
            <FAQSection />
          </div>
          <div className="w-full px-4">
            <NewsletterSection />
          </div>
          <div className="w-full px-4">
            <Footer />
          </div>
        </div>
      </main>
    </>
  );
};

export default Index;

