import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Package, Heart, Clock, CheckCircle, XCircle, Plus, Image, Edit3, Trash2, Eye, MessageCircle } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";



const MyAccountPage = () => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [listings, setListings] = useState([
    {
      id: "1",
      title: "Organic Chemistry Textbook",
      status: "approved",
      requests: 3,
      postedDate: "1 week ago"
    },
    {
      id: "2",
      title: "Desk Lamp",
      status: "pending",
      requests: 0,
      postedDate: "2 days ago"
    }
  ]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: '',
    location: '',
    image: ''
  });
  const [imagePreview, setImagePreview] = useState('');

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
        setFormData(prev => ({ ...prev, image: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };
  const handleDelete = (id: string) => {
  setListings(prev => prev.filter(item => item.id !== id));

  toast({
    title: "Deleted",
    description: "Item removed successfully"
  });
};
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();

  if (!formData.title || !formData.category) {
    toast({
      title: "Error",
      description: "Title and category are required.",
      variant: "destructive"
    });
    return;
  }

  if (editingId) {
    // UPDATE EXISTING
    setListings(prev =>
      prev.map(item =>
        item.id === editingId
          ? { ...item, ...formData }
          : item
      )
    );

    setEditingId(null);

    toast({
      title: "Updated",
      description: "Item updated successfully"
    });

  } else {
    // CREATE NEW (same as before)
    const newListing = {
      id: Date.now().toString(),
      title: formData.title,
      status: "pending",
      requests: 0,
      postedDate: "Just now",
      ...formData
    };

    setListings(prev => [newListing, ...prev]);

    toast({
      title: "Success",
      description: "Item posted!"
    });
  }

  setFormData({ title: '', category: '', description: '', location: '', image: '' });
  setImagePreview('');
  setIsDialogOpen(false);
};

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

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
          <Clock className="mr-1 h-3 w-3" />
          Pending
        </span>;
      case "approved":
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
          <CheckCircle className="mr-1 h-3 w-3" />
          Approved
        </span>;
      case "given":
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
          <CheckCircle className="mr-1 h-3 w-3" />
          Given Away
        </span>;
      case "accepted":
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
          <CheckCircle className="mr-1 h-3 w-3" />
          Accepted
        </span>;
      case "rejected":
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
          <XCircle className="mr-1 h-3 w-3" />
          Rejected
        </span>;
      default:
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
          Unknown
        </span>;
    }
  };

  return (
    <div className="py-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent mb-8 text-center">
          My Account
        </h2>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-md sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>Post New Item</DialogTitle>
              <DialogDescription>
                Fill in the details to post a new item for swapping.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  placeholder="e.g. Physics Textbook"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Category *</Label>
                <Select value={formData.category} onValueChange={(value) => setFormData({...formData, category: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Books">Books</SelectItem>
                    <SelectItem value="Electronics">Electronics</SelectItem>
                    <SelectItem value="Clothing">Clothing</SelectItem>
                    <SelectItem value="Furniture">Furniture</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  placeholder="Describe your item..."
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Pickup Location</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => setFormData({...formData, location: e.target.value})}
                  placeholder="e.g. Library, Room 101"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="image">
                  Item Photo <Image className="inline ml-1 h-4 w-4" />
                </Label>
                <Input id="image" type="file" accept="image/*" onChange={handleImageChange} />
                {imagePreview && (
                  <div className="mt-2 p-2 border rounded-md bg-muted/50">
                    <img src={imagePreview} alt="Preview" className="w-32 h-32 object-cover rounded border" />
                  </div>
                )}
              </div>
              <DialogFooter className="gap-2">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">Post Item</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
        <Dialog open={!!selectedItem} onOpenChange={() => setSelectedItem(null)}>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>{selectedItem?.title || selectedItem?.itemName}</DialogTitle>
    </DialogHeader>

    <p><strong>Name:</strong> {selectedItem?.title || selectedItem?.itemName}</p>
    <p><strong>Status:</strong> {selectedItem?.status}</p>

    {selectedItem?.description && (
      <p><strong>Description:</strong> {selectedItem.description}</p>
    )}

    {selectedItem?.location && (
      <p><strong>Location:</strong> {selectedItem.location}</p>
    )}

    <DialogFooter>
      <Button onClick={() => setSelectedItem(null)}>Close</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
        <Tabs defaultValue="listings" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="listings" className="flex items-center gap-2">
              <Package className="h-4 w-4" />
              My Listings
            </TabsTrigger>
            <TabsTrigger value="requests" className="flex items-center gap-2">
              <Heart className="h-4 w-4" />
              My Requests
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="listings">
            <div className="space-y-4">
              {listings.map((listing) => (
                <Card key={listing.id} className="hover:shadow-md transition-shadow">
  <CardHeader className="pb-3">
                    {listing.image && (
                      <div className="mb-2">
                        <img src={listing.image} alt={listing.title} className="w-full h-48 object-cover rounded-md" />
                      </div>
                    )}
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">{listing.title}</CardTitle>
                      {getStatusBadge(listing.status)}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center text-sm text-gray-600">
                      <span>Posted {listing.postedDate}</span>
                      <span>{listing.requests} requests received</span>
                    </div>
                    <div className="flex gap-2 mt-3">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => {
                          setEditingId(listing.id);
                          setFormData({
                            title: listing.title,
                            category: listing.category || '',
                            description: listing.description || '',
                            location: listing.location || '',
                            image: listing.image || ''
                          });
                          setIsDialogOpen(true);
                        }}
                      >
                        Edit Listing
                      </Button>
                      <Button size="sm" variant="destructive" className="ml-auto" onClick={() => handleDelete(listing.id)}>
                        Delete
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
              <div className="text-center mt-6">
                <Button size="lg" variant="gradient" onClick={() => setIsDialogOpen(true)}>
                  <Plus className="mr-2 h-4 w-4" />
                  Post New Item
                </Button>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="requests">
            <div className="space-y-4">
              {myRequests.map((request) => (
                <Card key={request.id} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">Request for: {request.itemName}</CardTitle>
                      {getStatusBadge(request.status)}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-sm text-gray-600">
                      Requested {request.requestedDate}
                    </div>
                    <Button size="sm" variant="outline"  className="mt-3" onClick={() => setSelectedItem(request)}>
                      View Details
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default MyAccountPage;