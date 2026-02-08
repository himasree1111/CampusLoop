import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Clock, User, Shield } from "lucide-react";

const AdminPage = () => {
  // Mock data for admin section
  const pendingPosts = [
    {
      id: "1",
      title: "Physics Study Guide",
      postedBy: "Tom Wilson",
      postedDate: "1 day ago",
      category: "Books"
    },
    {
      id: "2",
      title: "Bluetooth Speaker",
      postedBy: "Lisa Chang",
      postedDate: "2 days ago",
      category: "Electronics"
    }
  ];

  return (
    <div className="py-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-8 text-center flex items-center justify-center gap-3">
          <Shield className="h-8 w-8" />
          Admin Panel
        </h2>
        
        <Tabs defaultValue="pending" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="pending" className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Pending Posts
            </TabsTrigger>
            <TabsTrigger value="reports" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              User Reports
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="pending">
            <div className="space-y-4">
              {pendingPosts.map((post) => (
                <Card key={post.id} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{post.title}</CardTitle>
                        <p className="text-sm text-gray-600">Posted by {post.postedBy}</p>
                      </div>
                      <Badge variant="secondary">{post.category}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-sm text-gray-600 mb-4">
                      Submitted {post.postedDate}
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="default" className="bg-green-600 hover:bg-green-700">
                        Approve
                      </Button>
                      <Button size="sm" variant="destructive">
                        Reject
                      </Button>
                      <Button size="sm" variant="outline" className="ml-auto">
                        View Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="reports">
            <Card className="text-center py-12">
              <CardContent>
                <User className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <p className="text-gray-500">No user reports at this time</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminPage;