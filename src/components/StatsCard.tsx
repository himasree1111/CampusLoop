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
<CardContent className="grid grid-cols-2 gap-6 p-6 md:grid-cols-2 lg:grid-cols-2 [&>div]:h-32">
        <div className="group text-center p-4 bg-gradient-to-b from-white/80 to-white/50 backdrop-blur-sm border border-white/30 rounded-xl hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-default">
          <div className="flex items-center justify-center w-14 h-14 mx-auto mb-4 bg-green-100/80 rounded-2xl group-hover:bg-green-200/80">
            <Package className="h-7 w-7 text-green-600" />
          </div>
          <div className="text-2xl font-bold text-gray-900 mb-1">{stats.itemsGiven}</div>
          <div className="text-xs text-gray-600 uppercase tracking-wide font-semibold">Items Given</div>
        </div>
        <div className="group text-center p-4 bg-gradient-to-b from-white/80 to-white/50 backdrop-blur-sm border border-white/30 rounded-xl hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-default">
          <div className="flex items-center justify-center w-14 h-14 mx-auto mb-4 bg-blue-100/80 rounded-2xl group-hover:bg-blue-200/80">
            <Gift className="h-7 w-7 text-blue-600" />
          </div>
          <div className="text-2xl font-bold text-gray-900 mb-1">{stats.itemsReceived}</div>
          <div className="text-xs text-gray-600 uppercase tracking-wide font-semibold">Items Received</div>
        </div>
        <div className="group text-center p-4 bg-gradient-to-b from-white/80 to-white/50 backdrop-blur-sm border border-white/30 rounded-xl hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-default">
          <div className="flex items-center justify-center w-14 h-14 mx-auto mb-4 bg-emerald-100/80 rounded-2xl group-hover:bg-emerald-200/80">
            <Leaf className="h-7 w-7 text-emerald-600" />
          </div>
          <div className="text-2xl font-bold text-gray-900 mb-1">{stats.carbonSaved.toFixed(1)}kg</div>
          <div className="text-xs text-gray-600 uppercase tracking-wide font-semibold">CO₂ Saved</div>
        </div>
        <div className="group text-center p-4 bg-gradient-to-b from-white/80 to-white/50 backdrop-blur-sm border border-white/30 rounded-xl hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-default col-span-2 md:col-span-1">
          <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl shadow-lg group-hover:shadow-2xl group-hover:scale-105">
            <Award className="h-8 w-8 text-white" />
          </div>
          <div className="text-3xl font-black bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent mb-1">
            {score}
          </div>
          <div className="text-xs text-gray-600 uppercase tracking-wide font-semibold mt-1">Sustainability Score</div>
          <Badge className="mt-2 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700">
            Top Performer
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatsCard;

