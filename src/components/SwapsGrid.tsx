import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Heart, MapPin, Clock, User, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface SwapItem {
  id: string;
  title: string;
  description: string;
  category: string;
  condition: string;
  location: string;
  postedBy: string;
  postedDate: string;
  image?: string;
  tags: string[];
}

const SwapsGrid = () => {
  const [selectedItem, setSelectedItem] = useState<SwapItem | null>(null);
  const [wishlistItems, setWishlistItems] = useState<string[]>([]);

  const toggleWishlist = (itemId: string) => {
    setWishlistItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId) 
        : [...prev, itemId]
    );
  };

  const swapItems: SwapItem[] = [
    {
      id: "1",
      title: "Organic Chemistry Textbook",
      description: "Used Organic Chemistry textbook with all chapters intact. Great for students taking CHEM 2310. Includes solutions manual.",
      category: "Books",
      condition: "Good",
      location: "Science Building, Room 205",
      postedBy: "Chemistry Student",
      postedDate: "1 day ago",
      image: "https://images.unsplash.com/photo-1535905557558-afc4877a26fc?w=400&h=300&fit=crop",
      tags: ["Textbook", "Chemistry", "Study Material"]
    },
    {
      id: "2",
      title: "MacBook Pro 13-inch",
      description: "Lightly used MacBook Pro suitable for college work. Includes charger and protective case. Perfect for CS students.",
      category: "Digital Tools",
      condition: "Excellent",
      location: "Computer Science Lab",
      postedBy: "CS Senior",
      postedDate: "2 days ago",
      image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=300&fit=crop",
      tags: ["Laptop", "Computer", "Programming"]
    },
    {
      id: "3",
      title: "GATE Preparation Books",
      description: "Complete set of GATE preparation books for Computer Science. Includes previous year papers and solutions.",
      category: "Books",
      condition: "Like New",
      location: "Library Study Room",
      postedBy: "GATE Aspirant",
      postedDate: "3 days ago",
      image: "https://images.unsplash.com/photo-1535905557558-afc4877a26fc?w=400&h=300&fit=crop",
      tags: ["GATE", "Exam Prep", "Engineering"]
    },
    {
      id: "4",
      title: "Data Structures & Algorithms Guide",
      description: "Comprehensive guide to Data Structures and Algorithms with practical examples. Great for interview prep.",
      category: "Books",
      condition: "Good",
      location: "Computer Science Dept",
      postedBy: "Senior CS Student",
      postedDate: "1 week ago",
      image: "https://images.unsplash.com/photo-1535905557558-afc4877a26fc?w=400&h=300&fit=crop",
      tags: ["DSA", "Programming", "Computer Science"]
    },
    {
      id: "5",
      title: "Lab Safety Apron",
      description: "Clean, gently used lab safety apron. Essential for chemistry and biology laboratory work.",
      category: "Lab Equipment",
      condition: "Very Good",
      location: "Science Building Front Desk",
      postedBy: "Bio Student",
      postedDate: "4 days ago",
      image: "https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?w=400&h=300&fit=crop",
      tags: ["Safety", "Lab", "Apron"]
    },
    {
      id: "6",
      title: "Physics Formula Sheet Collection",
      description: "Handwritten formula sheets for Physics 1, 2, and Advanced Mechanics. Organized by topic with examples.",
      category: "Books",
      condition: "Excellent",
      location: "Physics Study Room",
      postedBy: "Physics Major",
      postedDate: "5 days ago",
      image: "https://images.unsplash.com/photo-1535905557558-afc4877a26fc?w=400&h=300&fit=crop",
      tags: ["Notes", "Physics", "Study Guide"]
    },
    {
      id: "7",
      title: "Bicycle",
      description: "Reliable single-speed bicycle perfect for campus commuting. Recently serviced and in excellent condition.",
      category: "Transportation",
      condition: "Excellent",
      location: "Bike Rack near Library",
      postedBy: "Environment Conscious Student",
      postedDate: "1 day ago",
      image: "https://images.unsplash.com/photo-1532588240847-6fc44d7c5d96?w=400&h=300&fit=crop",
      tags: ["Bike", "Transportation", "Eco-Friendly"]
    },
    {
      id: "8",
      title: "Drawing Tablet",
      description: "Wacom drawing tablet with pen and accessories. Great for art and design students. Like new condition.",
      category: "Digital Tools",
      condition: "Like New",
      location: "Art Studio",
      postedBy: "Art Graduate",
      postedDate: "2 days ago",
      image: "https://images.unsplash.com/photo-1606220588911-4a525d2b6c40?w=400&h=300&fit=crop",
      tags: ["Art", "Design", "Tablet"]
    },
    {
      id: "9",
      title: "Lab Safety Equipment",
      description: "Complete lab safety kit including goggles, gloves, apron, and safety manual. Essential for chemistry and biology labs.",
      category: "Lab Equipment",
      condition: "Excellent",
      location: "Science Building Front Desk",
      postedBy: "Lab Assistant",
      postedDate: "3 days ago",
      image: "https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?w=400&h=300&fit=crop",
      tags: ["Safety", "Lab", "Equipment"]
    }
  ];

  const SwapDetailModal = ({ item }: { item: SwapItem }) => {
    const isWishlisted = wishlistItems.includes(item.id);
    
    const handleRequestItem = () => {
      toast.success("Request submitted successfully!", {
        description: `Your request for "${item.title}" has been sent to the owner.`,
      });
    };

    return (
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl text-forest">{item.title}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {item.image ? (
            <img 
              src={item.image} 
              alt={item.title}
              className="w-full h-64 object-cover rounded-lg"
            />
          ) : (
            <div className="w-full h-64 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center">
              <span className="text-4xl font-bold text-gray-400">{item.category.charAt(0)}</span>
            </div>
          )}
          
          <div className="flex flex-wrap gap-2">
            {item.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="bg-mint text-forest">
                {tag}
              </Badge>
            ))}
          </div>
          
          <p className="text-foreground/80 leading-relaxed">{item.description}</p>
          
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <User size={16} className="text-nature" />
              <span>Posted by {item.postedBy}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={16} className="text-nature" />
              <span>{item.postedDate}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin size={16} className="text-nature" />
              <span>{item.location}</span>
            </div>
            <div>
              <span className="font-medium">Condition: </span>
              <span className="text-forest">{item.condition}</span>
            </div>
          </div>
          
          <div className="flex gap-3 pt-4">
            <Button variant="gradient" className="flex-1" onClick={handleRequestItem}>
              Request Item
            </Button>
            <Button 
              variant="outline" 
              size="icon" 
              className={`border-forest text-forest hover:bg-forest/10 scale-on-hover ${isWishlisted ? 'text-red-500' : ''}`}
              onClick={() => toggleWishlist(item.id)}
            >
              {isWishlisted ? <X size={20} /> : <Heart size={20} />}
            </Button>
          </div>
        </div>
      </DialogContent>
    );
  };

  return (
    <section className="py-16 lg:py-24 dynamic-bg relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/20 to-purple-900/20" />
      
      {/* Dynamic background elements */}
      <div className="absolute top-20 left-20 w-28 h-28 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-xl floating-animation"></div>
      <div className="absolute bottom-20 right-20 w-36 h-36 bg-gradient-to-r from-pink-400/15 to-red-400/15 rounded-full blur-2xl wave-animation" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-1/2 left-10 w-24 h-24 bg-gradient-to-r from-teal-400/20 to-cyan-400/20 rounded-full blur-lg bounce-animation" style={{ animationDelay: '2s' }}></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Campus Resources Available
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover useful items from fellow students and campus community ready for their next owner
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {swapItems.map((item) => {
            const isWishlisted = wishlistItems.includes(item.id);
            
            return (
              <Dialog key={item.id}>
                <DialogTrigger asChild>
                  <Card className="cursor-pointer shadow-card hover:shadow-hover hover:scale-105 transition-all duration-500 border-mint/20 group bg-white/90 backdrop-blur-sm scale-on-hover">
                    <div className="relative overflow-hidden rounded-t-lg">
                      {item.image ? (
                        <img 
                          src={item.image} 
                          alt={item.title}
                          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-600"
                        />
                      ) : (
                        <div className="w-full h-48 bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center group-hover:scale-110 transition-transform duration-600">
                          <span className="text-5xl font-bold text-gray-400">{item.category.charAt(0)}</span>
                        </div>
                      )}
                      <Badge className="absolute top-2 right-2 bg-forest text-white">
                        {item.category}
                      </Badge>
                      
                      {/* Wishlist button */}
                      <Button 
                        size="icon"
                        variant="outline"
                        className="absolute top-2 left-2 border-forest text-forest hover:bg-forest/10 scale-on-hover"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleWishlist(item.id);
                        }}
                      >
                        {isWishlisted ? <X size={16} /> : <Heart size={16} />}
                      </Button>
                    </div>
                    
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg text-forest group-hover:text-sage transition-eco">
                        {item.title}
                      </CardTitle>
                    </CardHeader>
                    
                    <CardContent>
                      <p className="text-foreground/70 text-sm mb-3 line-clamp-2">
                        {item.description}
                      </p>
                      
                      <div className="flex items-center justify-between text-xs text-nature">
                        <div className="flex items-center gap-1">
                          <MapPin size={12} />
                          <span>{item.location}</span>
                        </div>
                        <span>{item.postedDate}</span>
                      </div>
                      
                      <div className="flex justify-between items-center mt-3">
                        <Badge variant="outline" className="text-xs border-sage text-sage">
                          {item.condition}
                        </Badge>
                        <Button size="sm" variant="eco" className="text-xs transform hover:scale-110 transition-all duration-600">
                          View Details
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </DialogTrigger>
                
                <SwapDetailModal item={item} />
              </Dialog>
            );
          })}
        </div>
        
        <div className="text-center mt-12">
          <Button size="lg" variant="gradient" className="transform hover:scale-105 transition-all duration-600">
            Load More Resources
          </Button>
        </div>
      </div>
    </section>
  );
};

export default SwapsGrid;