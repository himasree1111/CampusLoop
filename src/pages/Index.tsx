import HeroSection from "@/components/HeroSection";
import NewsletterSection from "@/components/NewsletterSection";
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import BrowseItems from "@/components/SwapsGrid";

const Index = () => {
  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
        <div className="w-full">
          <div id="home" className="w-full">
            <HeroSection />
          </div>
          <div id="browse" className="container mx-auto px-4">
            <BrowseItems />
          </div>
          <div className="container mx-auto px-4">
            <FAQSection />
          </div>
          <div className="container mx-auto px-4">
            <NewsletterSection />
          </div>
          <div className="container mx-auto px-4">
            <Footer />
          </div>
        </div>
      </main>
    </>
  );
};

export default Index;
