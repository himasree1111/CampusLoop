import React, { useState, useMemo } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useToast } from "@/components/ui/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { User, Package, Leaf, CheckCircle, Clock, XCircle, Heart, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import StatsCard from "@/components/StatsCard";
import { carbonMap, UserStats } from "@/types/sustainability";

const MyAccountPage: React.FC = () => {
  const { user: authUser } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editProfileMode, setEditProfileMode] = useState(false);
  const [profile, setProfile] = useState({
    name: authUser?.user_metadata?.full_name || "User",
    email: authUser?.email || "",
    phone: "",
    campusLocation: "",
    bio: ""
  });
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: '',
    location: '',
    image: ''
  });
  const { toast } = useToast();

  const [listings, setListings] = useState([
    {
      id: "1",
      title: "Organic Chemistry Textbook",
      description: "Chemistry textbook",
      category: "Books",
      location: "Library",
      image: "",
      status: "approved",
      requests: 3,
      postedDate: "1 week ago"
    },
    {
      id: "2",
      title: "Calculator",
      description: "Scientific calculator",
      category: "Electronics",
      location: "Math Dept",
      image: "",
      status: "pending",
      requests: 0,
      postedDate: "2 days ago"
    }
  ]);

  const [editingListingId, setEditingListingId] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);

  const generateId = () => Math.random().toString(36).substr(2, 9);

  const myRequests = [
    {
      id: "1",
      itemName: "Calculus Textbook",
      status: "accepted",
      requestedDate: "3 days ago"
    },
    {
      id: "2",
      itemName: "Winter Jacket",
      status: "pending",
      requestedDate: "1 day ago"
    }
  ];

  const userStats: UserStats = useMemo(() => {
    const givenItems = listings.filter(item => item.status === "given");
    const itemsGiven = givenItems.length;
    const carbonSaved = givenItems.reduce((sum, item) => sum + (carbonMap[item.category || "Other"] || 1), 0);
    return {
      itemsGiven,
      itemsReceived: 2,
      carbonSaved
    };
  }, [listings]);

  const sustainabilityScore = userStats.itemsGiven * 10 + userStats.carbonSaved * 2;



  const handleProfileUpdate = () => {
    toast({ title: "Saved!", description: "Profile updated." });
    setEditProfileMode(false);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            <Clock className="mr-1 h-3 w-3" />
            Pending
          </span>
        );
      case "approved":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <CheckCircle className="mr-1 h-3 w-3" />
            Approved
          </span>
        );
      case "given":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            <CheckCircle className="mr-1 h-3 w-3" />
            Given
          </span>
        );
      default:
        return <span>Unknown</span>;
    }
  };

  const handleImageUpload = (e: React.FormEvent<HTMLInputElement>) => {
    const file = (e.target as HTMLInputElement).files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleOpenAdd = () => {
    setFormData({ title: '', category: '', description: '', location: '', image: '' });
    setImagePreview('');
    setImageFile(null);
    setEditingListingId(null);
    setIsDialogOpen(true);
  };

  const handleOpenEdit = (id: string) => {
    const listing = listings.find(l => l.id === id);
    if (listing) {
      setFormData({
        title: listing.title,
        category: listing.category,
        description: listing.description,
        location: listing.location,
        image: ''
      });
      setImagePreview(listing.image || '');
      setImageFile(null);
      setEditingListingId(id);
      setIsDialogOpen(true);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.category) {
      toast({
        title: "Error",
        description: "Title and category required",
        variant: "destructive"
      });
      return;
    }

    const newImage = imagePreview || (listings.find(l => l.id === editingListingId)?.image || '');

    if (editingListingId) {
      // Edit
      setListings(listings.map(l => 
        l.id === editingListingId 
          ? { ...l, ...formData, image: newImage }
          : l
      ));
      toast({ title: "Updated!", description: "Listing updated successfully" });
    } else {
      // Add new
      const newListing = {
        id: generateId(),
        ...formData,
        image: newImage,
        status: 'pending' as const,
        requests: 0,
        postedDate: 'Just now'
      };
      setListings([newListing, ...listings]);
      toast({ title: "Posted!", description: "New listing created" });
    }

    setIsDialogOpen(false);
    setFormData({ title: '', category: '', description: '', location: '', image: '' });
    setImagePreview('');
    setImageFile(null);
    setEditingListingId(null);
  };

  const handleMarkAsGiven = (id: string) => {
    setListings(listings.map(l => 
      l.id === id ? { ...l, status: 'given' as const } : l
    ));
    toast({
      title: "Success!",
      description: "Item marked as given! 🌿",
      duration: 3000
    });
  };

  const handleDelete = (id: string) => {
    setListings(listings.filter(l => l.id !== id));
    toast({
      title: "Deleted",
      description: "Item removed successfully"
    });
  };

  return (
    <div className="py-8 max-w-7xl mx-auto px-4 lg:px-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar */}
        <div className="lg:w-80 flex-shrink-0">
          <Card className="sticky top-24">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl font-bold text-center bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent">
                My Account
              </CardTitle>
              <div className="flex flex-col items-center space-y-3 p-4 border rounded-2xl bg-gradient-to-br from-blue-50 to-emerald-50">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-emerald-500 rounded-full flex items-center justify-center">
                  {profile.name.slice(0,2).toUpperCase()}
                </div>
                <h3 className="text-lg font-semibold">{profile.name}</h3>
                <div className="text-xs text-gray-500 text-center">
                  Score: <span className="font-bold text-emerald-600">{sustainabilityScore}</span>
                </div>
              </div>
            </CardHeader>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-1 p-1 bg-muted rounded-lg">
                <TabsTrigger value="profile" className="justify-start">
                  <User className="mr-2 h-4 w-4" /> Profile
                </TabsTrigger>
                <TabsTrigger value="sustainability" className="justify-start">
                  <Leaf className="mr-2 h-4 w-4" /> Impact
                </TabsTrigger>
                <TabsTrigger value="activity" className="justify-start">
                  <Package className="mr-2 h-4 w-4" /> Activity
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </Card>
        </div>

        {/* Main Content */}
        <div className="flex-1 space-y-8">
          {activeTab === 'profile' && (
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <User className="h-6 w-6 text-muted-foreground" />
                  <div>
                    <CardTitle>Profile Details</CardTitle>
                    <CardDescription>Update your personal information</CardDescription>
                  </div>
                  <Button variant={editProfileMode ? "outline" : "default"} onClick={() => setEditProfileMode(!editProfileMode)} className="ml-auto">
                    {editProfileMode ? "Cancel" : "Edit"}
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" value={profile.name} onChange={(e) => setProfile({...profile, name: e.target.value})} disabled={!editProfileMode} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" value={profile.email} onChange={(e) => setProfile({...profile, email: e.target.value})} disabled={!editProfileMode} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" value={profile.phone} onChange={(e) => setProfile({...profile, phone: e.target.value})} disabled={!editProfileMode} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="campus">Campus Location</Label>
                    <Input id="campus" value={profile.campusLocation} onChange={(e) => setProfile({...profile, campusLocation: e.target.value})} disabled={!editProfileMode} />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea id="bio" value={profile.bio} onChange={(e) => setProfile({...profile, bio: e.target.value})} disabled={!editProfileMode} rows={4} />
                </div>
                {editProfileMode && <Button onClick={handleProfileUpdate} className="w-full">Save Profile</Button>}
              </CardContent>
            </Card>
          )}

          {activeTab === 'sustainability' && (
            <Card>
              <CardHeader>
                <CardTitle>Sustainability Impact</CardTitle>
              </CardHeader>
              <CardContent>
                <StatsCard stats={userStats} score={sustainabilityScore} />
              </CardContent>
            </Card>
          )}

          {activeTab === 'activity' && (
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Package className="h-6 w-6 text-muted-foreground" />
                  <div>
                    <CardTitle>My Activity</CardTitle>
                    <CardDescription>Listings and requests</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <Tabs defaultValue="listings" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="listings">
                    <Package className="mr-2 h-4 w-4" />
                    Listings ({listings.length})
                  </TabsTrigger>
                  <TabsTrigger value="requests">
                    <Heart className="mr-2 h-4 w-4" />
                    Requests (2)
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="listings" className="space-y-4 mt-6">
                  {listings.map((listing) => (
                    <Card key={listing.id}>
                      <CardHeader className="pb-3">
                        <div className="flex items-start gap-3">
                          {listing.image && (
                            <img 
                              src={listing.image} 
                              alt={listing.title}
                              className="w-16 h-16 rounded-md object-cover flex-shrink-0"
                            />
                          )}
                          <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-start">
                              <CardTitle className="text-lg">{listing.title}</CardTitle>
                              {getStatusBadge(listing.status)}
                            </div>
                            <p className="text-sm text-muted-foreground mt-1">{listing.description}</p>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="text-xs text-muted-foreground mb-3">
                          Posted {listing.postedDate} • {listing.requests} requests • {listing.location}
                        </div>
                        <div className="flex gap-2">
                          {listing.status !== "given" && (
                            <Button size="sm" variant="outline" onClick={() => handleMarkAsGiven(listing.id)}>
                              <Leaf className="mr-1 h-3 w-3" />
                              Mark Given
                            </Button>
                          )}
                          <Button size="sm" variant="outline" onClick={() => handleOpenEdit(listing.id)}>
                            Edit
                          </Button>
                          <Button size="sm" variant="destructive" className="ml-auto" onClick={() => handleDelete(listing.id)}>
                            Delete
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
<Button size="lg" className="mx-auto" onClick={handleOpenAdd}>
                    <Plus className="mr-2 h-4 w-4" />
                    New Listing
                  </Button>
                </TabsContent>
                <TabsContent value="requests" className="space-y-4 mt-6">
                  {myRequests.map((request) => (
                    <Card key={request.id}>
                      <CardHeader className="pb-3">
                        <div className="flex justify-between">
                          <CardTitle className="text-lg">Request for: {request.itemName}</CardTitle>
                          {getStatusBadge(request.status)}
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground mb-3">Requested {request.requestedDate}</p>
                        <Button size="sm" variant="outline">View Details</Button>
                      </CardContent>
                    </Card>
                  ))}
                </TabsContent>
              </Tabs>
            </Card>
          )}
        </div>
      </div>

      {/* Dialogs */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>{editingListingId ? 'Edit Listing' : 'New Listing'}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label>Title *</Label>
              <Input value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} placeholder="Item title" required />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Category *</Label>
                <Select value={formData.category} onValueChange={(value) => setFormData({...formData, category: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Books">Books</SelectItem>
                    <SelectItem value="Electronics">Electronics</SelectItem>
                    <SelectItem value="Clothing">Clothing</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Location</Label>
                <Input value={formData.location} onChange={(e) => setFormData({...formData, location: e.target.value})} placeholder="Pickup location" />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} placeholder="Describe item..." />
            </div>
            <div className="space-y-2">
              <Label htmlFor="image">Image (optional)</Label>
              <Input 
                id="image"
                type="file" 
                accept="image/*" 
                onChange={handleImageUpload}
              />
              {imagePreview && (
                <div className="mt-2">
                  <img 
                    src={imagePreview} 
                    alt="Preview" 
                    className="w-24 h-24 rounded-md object-cover border"
                  />
                </div>
              )}
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
              <Button type="submit">{editingListingId ? 'Update' : 'Create'}</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MyAccountPage;

