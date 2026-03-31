import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Heart, MapPin, Clock, User, X } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner";

export interface SwapItem {
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
  score?: number;
}

const SwapsGrid = () => {
  const [wishlistItems, setWishlistItems] = useState<string[]>([]);
  const [likedCategories, setLikedCategories] = useState<string[]>([]);
  
  // Load from localStorage on mount
  useEffect(() => {
    const savedWishlist = localStorage.getItem('campusLoopWishlist');
    if (savedWishlist) {
      setWishlistItems(JSON.parse(savedWishlist));
    }
    
    const savedCategories = localStorage.getItem('campusLoopLikedCategories');
    if (savedCategories) {
      setLikedCategories(JSON.parse(savedCategories));
    }
  }, []);
  
  // Save to localStorage on changes
  useEffect(() => {
    localStorage.setItem('campusLoopWishlist', JSON.stringify(wishlistItems));
  }, [wishlistItems]);
  
  useEffect(() => {
    localStorage.setItem('campusLoopLikedCategories', JSON.stringify(likedCategories));
  }, [likedCategories]);

  const toggleWishlist = (itemId: string, item: SwapItem) => {
    setWishlistItems(prev => {
      const isLiked = prev.includes(itemId);
      const newWishlist = isLiked 
        ? prev.filter(id => id !== itemId) 
        : [...prev, itemId];
      if (!isLiked) {
        toast.success(`Added to favorites! Showing ${item.category.toLowerCase()} recommendations.`);
        setLikedCategories(prevCats => {
          const newCats = [...prevCats, item.category];
          return newCats.filter((cat, index, self) => self.indexOf(cat) === index);
        });
      } else {
        toast.success("Removed from favorites!");
        setLikedCategories(prevCats => prevCats.filter(cat => cat !== item.category));
      }
      return newWishlist;
    });
  };

  // Instagram-style recommendation scoring
  const getRecommendationScore = (item: SwapItem): number => {
    if (likedCategories.length === 0) return 0;
    
    let score = 0;
    
    // Exact category match (highest weight)
    if (likedCategories.includes(item.category)) {
      score += 5;
    }
    
    // Tag overlap (2pts per match)
    const tagMatches = item.tags.filter(tag => 
      likedCategories.some(cat => 
        tag.toLowerCase().includes(cat.toLowerCase()) || cat.toLowerCase().includes(tag.toLowerCase())
      )
    );
    score += tagMatches.length * 2;
    
    // Diversity bonus for multiple categories liked but still relevant
    if (likedCategories.length > 1 && !likedCategories.includes(item.category) && tagMatches.length > 0) {
      score += 2;
    }
    
    // Recency bonus
    const recencyScore = {
      '1 day ago': 3,
      '2 days ago': 2.5,
      '3 days ago': 2,
      '4 days ago': 1.5,
      '5 days ago': 1,
      '1 week ago': 0.5
    }[item.postedDate] || 0;
    score += recencyScore;
    
    return score;
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
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROsJlXiapO4hVNB2M2amhEwnBziuetyFlTQQ&s",
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
      description: "Used for Engineering graphics. Comes with a carrying case.",
      category: "Tools",
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
      description: "Excellent condition English textbook covering literature and language concepts. Suitable for high school and college students.",
      category: "Textbooks",
      condition: "Excellent",
      location: "Science Building Front Desk",
      postedBy: "Lab Assistant",
      postedDate: "3 days ago",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTeS54dopGZ_MjwOXrlP-vKABhc9VI7Gqs5G9T68nSadw&s",
      tags: ["Textbook", "Exam", "B.Tech I Year"]
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
          <DialogTitle className="text-2xl">{item.title}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {item.image ? (
            <img 
              src={item.image} 
              alt={item.title}
              className="w-full max-h-96 object-contain bg-gray-50 p-6 rounded-lg"
            />
          ) : (
            <div className="w-full h-64 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center">
              <span className="text-4xl font-bold text-gray-400">{item.category.charAt(0)}</span>
            </div>
          )}
          
          <div className="flex flex-wrap gap-2">
            {item.tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
          
          <p className="text-foreground/80 leading-relaxed">{item.description}</p>
          
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <User size={16} />
              <span>Posted by {item.postedBy}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={16} />
              <span>{item.postedDate}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin size={16} />
              <span>{item.location}</span>
            </div>
            <div>
              <span className="font-medium">Condition: </span>
              <span>{item.condition}</span>
            </div>
          </div>
          
          <div className="flex gap-3 pt-4">
            <Button variant="default" className="flex-1" onClick={handleRequestItem}>
              Request Item
            </Button>
            <Button 
              variant="outline" 
              size="icon" 
              className={`hover:bg-accent ${isWishlisted ? 'text-destructive fill-destructive' : ''}`}
              onClick={() => toggleWishlist(item.id, item)}
            >
              {isWishlisted ? <X size={20} /> : <Heart size={20} />}
            </Button>
          </div>
        </div>
      </DialogContent>
    );
  };

  // Get scored and sorted items
  const scoredItems = swapItems.map(item => ({
    ...item,
    score: getRecommendationScore(item)
  })).sort((a, b) => b.score - a.score);

  const itemsToShow = likedCategories.length > 0 
    ? scoredItems.filter(item => item.score > 0) 
    : scoredItems.slice(0, 9);

  return (
    <section className="min-h-screen py-16 lg:py-24 bg-gradient-to-br from-slate-50 to-blue-50 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/10 to-purple-900/10" />
      
      <div className="w-full px-4 relative z-10 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-emerald-600 bg-clip-text text-transparent mb-4">
            Campus Resources Available
          </h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {likedCategories.length > 0 
              ? 'Smart recommendations based on your likes' 
              : 'Discover useful items from fellow students and campus community ready for their next owner'
            }
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-12">
          {itemsToShow.map((item) => {
            const isWishlisted = wishlistItems.includes(item.id);
            return (
              <Dialog key={item.id}>
                <DialogTrigger asChild>
                  <Card className="group cursor-pointer h-full border-0 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 bg-card hover:bg-white border-transparent">
                    <div className="relative overflow-hidden rounded-2xl">
                      {item.image ? (
                        <img 
                          src={item.image} 
                          alt={item.title}
                          className="w-full h-56 object-contain bg-muted p-6 group-hover:scale-105 transition-transform duration-700 rounded-t-2xl"
                        />
                      ) : (
                        <div className="w-full h-56 bg-gradient-to-br from-blue-100 via-purple-100 to-emerald-100 flex items-center justify-center group-hover:scale-105 transition-transform duration-700 rounded-t-2xl">
                          <span className="text-4xl font-bold text-muted-foreground">{item.category.charAt(0)}</span>
                        </div>
                      )}
                      <Badge className="absolute top-3 right-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-medium">
                        {item.category}
                      </Badge>
                      
                      <Button 
                        size="icon"
                        variant="ghost"
                        className={`absolute top-3 left-3 h-10 w-10 rounded-full p-0 border-2 border-border hover:border-destructive/50 shadow-md hover:shadow-lg transition-all duration-300 group-hover:scale-110 ${isWishlisted ? 'text-destructive bg-destructive/10 border-destructive fill-destructive' : 'text-muted-foreground hover:text-primary hover:bg-primary/10'}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleWishlist(item.id, item);
                        }}
                      >
                        {isWishlisted ? <X className="h-5 w-5" /> : <Heart className="h-5 w-5" />}
                      </Button>
                      
                      {item.score! > 4 && (
                        <Badge className="absolute bottom-2 left-2 bg-gradient-to-r from-purple-500 to-pink-500 text-xs text-white font-bold shadow-lg">
                          ★ {item.score!.toFixed(1)}
                        </Badge>
                      )}
                    </div>
                    
                    <CardHeader className="pb-3 pt-4 px-6">
                      <CardTitle className="text-lg font-bold leading-tight line-clamp-2 group-hover:text-primary transition-colors">
                        {item.title}
                      </CardTitle>
                    </CardHeader>
                    
                    <CardContent className="px-6 pb-6 pt-0">
                      <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2 mb-4">
                        {item.description}
                      </p>
                      
                      <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
                        <div className="flex items-center gap-1.5">
                          <MapPin className="h-3.5 w-3.5" />
                          <span className="font-medium">{item.location}</span>
                        </div>
                        <span className="font-medium">{item.postedDate}</span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <Badge variant="outline" className="text-xs border-emerald-200 bg-emerald-50 text-emerald-800 hover:bg-emerald-100">
                          {item.condition}
                        </Badge>
                        <Button size="sm" variant="outline" className="text-xs font-medium border-emerald-200 hover:border-emerald-400 hover:bg-emerald-50 text-emerald-700 h-8 px-4">
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

        {likedCategories.length > 0 && (
          <div className="text-center mt-12 p-8 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-3xl border border-emerald-100 mb-16">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-2 h-10 bg-gradient-to-b from-emerald-400 to-teal-500 rounded-full flex-shrink-0" />
              <div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  Your Recommendations
                </h3>
                <p className="text-sm text-emerald-800">Based on likes • Top relevance score: {Math.max(...scoredItems.map(i => i.score)).toFixed(1)}★</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 justify-center mb-6">
              {likedCategories.slice(0, 4).map(cat => (
                <Badge key={cat} variant="secondary" className="bg-emerald-100 text-emerald-800 border-emerald-200 hover:bg-emerald-200 px-3 py-1">
                  {cat}
                </Badge>
              ))}
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-emerald-700 hover:text-emerald-900 font-medium border-emerald-200 hover:border-emerald-400"
              onClick={() => setLikedCategories([])}
            >
              Clear all recommendations
            </Button>
          </div>
        )}
        
        <div className="text-center mt-16">
          <Button size="lg" variant="outline" className="text-lg font-semibold px-12 h-14 border-2 border-dashed border-muted-foreground hover:border-primary hover:bg-primary/5">
            Load More Resources
          </Button>
        </div>
      </div>
    </section>
  );
};

export default SwapsGrid;

