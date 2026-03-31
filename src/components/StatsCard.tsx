import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Package, Gift, Leaf, Award } from "lucide-react";
import { UserStats } from "@/types/sustainability";
import { cn } from "@/lib/utils";

interface StatsCardProps {
  stats: UserStats;
  score: number;
}

const StatsCard = ({ stats, score }: StatsCardProps) => {
  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="text-center pb-6">
        <CardTitle className="text-2xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
          Your Sustainability Impact
        </CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-6 p-6">
        <div className="text-center">
          <div className="flex items-center justify-center w-12 h-12 mx-auto mb-3 bg-green-100 rounded-full">
            <Package className="h-6 w-6 text-green-600" />
          </div>
          <div className="text-2xl font-bold text-gray-900">{stats.itemsGiven}</div>
          <div className="text-sm text-gray-600 uppercase tracking-wide font-medium">Items Given</div>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center w-12 h-12 mx-auto mb-3 bg-blue-100 rounded-full">
            <Gift className="h-6 w-6 text-blue-600" />
          </div>
          <div className="text-2xl font-bold text-gray-900">{stats.itemsReceived}</div>
          <div className="text-sm text-gray-600 uppercase tracking-wide font-medium">Items Received</div>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center w-12 h-12 mx-auto mb-3 bg-emerald-100 rounded-full">
            <Leaf className="h-6 w-6 text-emerald-600" />
          </div>
          <div className="text-2xl font-bold text-gray-900">{stats.carbonSaved.toFixed(1)}kg</div>
          <div className="text-sm text-gray-600 uppercase tracking-wide font-medium">CO₂ Saved</div>
        </div>
        <div className="text-center md:col-span-2 md:border-t pt-4 md:pt-0 md:border-transparent">
          <div className="flex items-center justify-center w-16 h-16 mx-auto mb-3 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full shadow-lg">
            <Award className="h-8 w-8 text-white" />
          </div>
          <div className="text-3xl md:text-4xl font-black bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
            {score}
          </div>
          <div className="text-sm text-gray-600 uppercase tracking-wide font-medium mt-1">Sustainability Score</div>
          <Badge className="mt-2 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700">
            Top Performer
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatsCard;

