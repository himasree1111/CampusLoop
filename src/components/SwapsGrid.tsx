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
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQplZjOwmHxpWRtyxta7FQW2Vkx7RJYkpRYOw&s",
      tags: ["Textbook", "Chemistry", "Study Material"]
    },
    {
      id: "2",
      title: "Calculator",
      description: "Scientific calculator in excellent condition. Perfect for math and engineering courses. Recently serviced and has a protective case.",
      category: "Digital Tools",
      condition: "Excellent",
      location: "Computer Science Lab",
      postedBy: "CS Senior",
      postedDate: "2 days ago",
      image: "data:image/jpeg;base64,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",
      tags: ["Maths", "Computer", "Programming"]
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
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0kkbjd2XltZOmCNefuyDIuY96lPZwl0GWpg&s",
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
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROsJlXiapO4hVNB2M2amhEwnBziuetyFlTQQ&s",
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
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGS0qBYp__rSCnTxFtApoBaczELo7VyxRT6Q&s",
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
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRr38qQOExuLq36EqAkR_FXcOHmwV7ZK6esng&s",
      tags: ["Notes", "Physics", "Study Guide"]
    },
    {
      id: "7",
      title: "Drafter",
      description: "Used for Engineering grphics Comes with a carrying case.",
      category: "Transportation",
      condition: "Excellent",
      location: "Engineering Graphics Lab",
      postedBy: "Environment Conscious Student",
      postedDate: "1 day ago",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSik997iPxFJxyIARTjtiqpJHioJLly4rzW5Q&s",
      tags: ["Tool", "Drawing", "Eco-Friendly"]
    },
    {
      id: "8",
      title: "Aptitude Book",
      description: "Comprehensive aptitude book covering quantitative, logical reasoning, and verbal sections. Ideal for competitive exams and job interviews.",
      category: "Books",
      condition: "Like New",
      location: "Library Study Room",
      postedBy: "Art Graduate",
      postedDate: "2 days ago",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-oMuXtnJ_ahhYECV3-ieXFmAa7UVmEjFUCQ&s",
      tags: ["Preparation", "Exam", "Book"]
    },
    {
      id: "9",
      title: "English Textbook",
      description: "Complete lab safety kit including goggles, gloves, apron, and safety manual. Essential for chemistry and biology labs.",
      category: "Lab Equipment",
      condition: "Excellent",
      location: "Science Building Front Desk",
      postedBy: "Lab Assistant",
      postedDate: "3 days ago",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTeS54dopGZ_MjwOXrlP-vKABhc9VI7Gqs5G9T68nSadw&s",
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
              className={`${item.title.toLowerCase().includes("english") ? 'w-full max-h-96 object-contain bg-gray-50 p-6 rounded-lg' : 'w-full max-h-64 object-contain bg-gray-50 p-6 rounded-lg'}`}
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
                          className={`${item.title.toLowerCase().includes("english") ? 'w-full h-56 object-contain bg-gray-50 p-6 rounded-t-lg' : 'w-full h-48 object-contain bg-gray-50 p-4 rounded-t-lg'} group-hover:scale-110 transition-transform duration-600`}
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