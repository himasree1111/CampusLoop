import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, User, ArrowRight } from "lucide-react";

const BlogSection = () => {
  const blogPost = {
    title: "The Ripple Effect of Sustainable Living",
    excerpt: "Sustainable living isn't just a trend—it's a conscious choice that creates positive ripples throughout our world.",
    content: `Sustainable living isn't just a trend—it's a conscious choice that creates positive ripples throughout our world. When you choose eco-friendly alternatives, you're voting with your wallet for companies that prioritize environmental responsibility.

Every sustainable swap reduces your carbon footprint and sends a powerful message to manufacturers. The collective impact is remarkable: if just 100 people switch to reusable water bottles, we prevent 150,000 plastic bottles from entering our ecosystem annually.

Beyond environmental benefits, sustainable living often improves personal health and saves money. Natural cleaning products eliminate toxic chemicals from your home, while energy-efficient appliances reduce utility bills significantly.

Remember: sustainability is a journey, not a destination. Start small, stay consistent, and celebrate every positive change you make.`,
    author: "EcoSwap Team",
    date: "November 15, 2024",
    readTime: "4 min read"
  };

  return (
    <section id="sustainability-insights" className="py-16 lg:py-24 bg-cream">
      <div className="w-full px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-forest mb-4">
            Sustainability Insights
          </h2>
          <p className="text-lg text-nature max-w-2xl mx-auto">
            Discover tips, stories, and insights to help you live more sustainably
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="shadow-card hover:shadow-hover transition-eco border-mint/20">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-4 text-sm text-nature mb-4">
                <div className="flex items-center gap-1">
                  <User size={16} />
                  <span>{blogPost.author}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar size={16} />
                  <span>{blogPost.date}</span>
                </div>
                <span>{blogPost.readTime}</span>
              </div>
              <CardTitle className="text-2xl md:text-3xl text-forest mb-3">
                {blogPost.title}
              </CardTitle>
            </CardHeader>
            
            <CardContent>
              <div className="prose prose-lg max-w-none text-foreground/80 leading-relaxed space-y-4">
                {blogPost.content.split('\n\n').map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
              
              <div className="mt-8 pt-6 border-t border-mint/30">
                <Button className="bg-forest hover:bg-forest/90 text-white group">
                  Read More Articles
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-eco" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;