import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Package, Heart, Clock, CheckCircle, XCircle } from "lucide-react";

const MyAccountPage = () => {
  // Mock data for account section
  const myListings = [
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
  ];

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
              {myListings.map((listing) => (
                <Card key={listing.id} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
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
                      <Button size="sm" variant="outline">
                        Edit Listing
                      </Button>
                      <Button size="sm" variant="destructive" className="ml-auto">
                        Delete
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
              <div className="text-center mt-6">
                <Button size="lg" variant="gradient">
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
                    <Button size="sm" variant="outline" className="mt-3">
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