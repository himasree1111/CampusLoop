import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, Leaf, Users, Tag } from "lucide-react";
import { cn } from "@/lib/utils";

interface AdminStats {
  totalItemsReused: number;
  totalCarbonSaved: number;
  totalUsers: number;
  totalListings: number;
}

interface ImpactCardProps {
  stats: AdminStats;
}

const ImpactCard = ({ stats }: ImpactCardProps) => {
  return (
    <Card className="w-full max-w-6xl mx-auto mb-12">
      <CardHeader className="text-center pb-8">
        <CardTitle className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent flex items-center justify-center gap-3 mx-auto">
          <Leaf className="h-10 w-10" />
          Platform Impact Metrics
        </CardTitle>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Celebrating our collective sustainability achievements
        </p>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6 p-0">
        {/* Total Items Reused */}
        <div className="group p-8 rounded-2xl bg-gradient-to-br from-yellow-50 to-orange-50 border-2 border-yellow-100 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 hover:border-yellow-200">
          <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-yellow-100 group-hover:bg-yellow-200 rounded-2xl">
            <Package className="h-8 w-8 text-yellow-600" />
          </div>
          <div className="text-4xl xl:text-5xl font-black text-gray-900 mb-2">{stats.totalItemsReused.toLocaleString()}</div>
          <div className="text-2xl font-bold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">Items Reused</div>
          <p className="text-sm text-yellow-700 mt-1 opacity-90">Across all users</p>
        </div>

        {/* Total CO₂ Saved */}
        <div className="group p-8 rounded-2xl bg-gradient-to-br from-emerald-50 to-green-50 border-2 border-emerald-100 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 hover:border-emerald-200">
          <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-emerald-100 group-hover:bg-emerald-200 rounded-2xl">
            <Leaf className="h-8 w-8 text-emerald-600" />
          </div>
          <div className="text-4xl xl:text-5xl font-black text-gray-900 mb-2">{stats.totalCarbonSaved.toFixed(1)}kg</div>
          <div className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">CO₂ Saved</div>
          <p className="text-sm text-emerald-700 mt-1 opacity-90">Carbon footprint reduced</p>
        </div>

        {/* Total Active Users */}
        <div className="group p-8 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-100 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 hover:border-blue-200">
          <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-blue-100 group-hover:bg-blue-200 rounded-2xl">
            <Users className="h-8 w-8 text-blue-600" />
          </div>
          <div className="text-4xl xl:text-5xl font-black text-gray-900 mb-2">{stats.totalUsers}</div>
          <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Active Users</div>
          <p className="text-sm text-blue-700 mt-1 opacity-90">Engaged community</p>
        </div>

        {/* Total Listings */}
        <div className="group p-8 rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-100 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 hover:border-purple-200">
          <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-purple-100 group-hover:bg-purple-200 rounded-2xl">
            <Tag className="h-8 w-8 text-purple-600" />
          </div>
          <div className="text-4xl xl:text-5xl font-black text-gray-900 mb-2">{stats.totalListings.toLocaleString()}</div>
          <div className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Listings</div>
          <p className="text-sm text-purple-700 mt-1 opacity-90">Items available</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ImpactCard;

