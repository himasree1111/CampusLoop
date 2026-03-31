import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { LeaderboardUser } from "@/types/sustainability";
import { Trophy, Crown } from "lucide-react";
import { cn } from "@/lib/utils";

const mockUsers: LeaderboardUser[] = [
  { name: "Himasree", score: 52, itemsGiven: 5, carbon: 12 },
  { name: "Ravi", score: 48, itemsGiven: 4, carbon: 10 },
  { name: "Anjali", score: 40, itemsGiven: 3, carbon: 8 },
  { name: "Kiran", score: 30, itemsGiven: 2, carbon: 6 }
];

const sortedUsers = [...mockUsers].sort((a, b) => b.score - a.score);

interface LeaderboardProps {}

const Leaderboard = ({}: LeaderboardProps) => {
  const getRankBadge = (index: number) => {
    switch (index) {
      case 0:
        return (
          <Badge className="bg-gradient-to-r from-yellow-400 to-orange-400 text-black border-2 border-yellow-500 shadow-lg mr-3 px-3 py-1 text-sm font-bold">
            <Crown className="h-3 w-3 mr-1" />
            Top Contributor
          </Badge>
        );
      case 1:
        return (
          <Badge className="bg-gray-300 text-black border-2 border-gray-400 shadow-lg mr-3">
            <Trophy className="h-3 w-3 mr-1" />
            2nd
          </Badge>
        );
      case 2:
        return (
          <Badge className="bg-gradient-to-r from-emerald-400 to-green-400 text-black border-2 border-emerald-500 shadow-lg mr-3 px-3 py-1 text-sm font-bold">
            <Trophy className="h-3 w-3 mr-1" />
            Eco Champion
          </Badge>
        );
      default:
        return (
          <Badge className="bg-gray-100 text-gray-800 mr-3">
            #{index + 1}
          </Badge>
        );
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader className="text-center pb-8">
        <CardTitle className="text-4xl font-black bg-gradient-to-r from-emerald-500 to-green-600 bg-clip-text text-transparent flex items-center justify-center gap-3 mx-auto mb-4">
          <Trophy className="h-12 w-12 shadow-2xl" />
          Sustainability Leaderboard
        </CardTitle>
        <p className="text-xl text-muted-foreground">
          Top sustainability champions on CampusLoop
        </p>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">Rank</TableHead>
              <TableHead>User</TableHead>
              <TableHead className="text-right">Score</TableHead>
              <TableHead className="text-right">Items Given</TableHead>
              <TableHead className="text-right">CO₂ Saved (kg)</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedUsers.map((user, index) => (
              <TableRow key={user.name} className={cn(index < 3 ? "bg-gradient-to-r from-yellow-50 to-orange-50 hover:bg-yellow-100" : "")}>
                <TableCell>{getRankBadge(index)}</TableCell>
                <TableCell className="font-semibold text-lg">{user.name}</TableCell>
                <TableCell className="text-right">
                  <div className="text-2xl font-black text-emerald-600">{user.score}</div>
                </TableCell>
                <TableCell className="text-right text-muted-foreground">
                  {user.itemsGiven}
                </TableCell>
                <TableCell className="text-right text-muted-foreground">
                  {user.carbon.toFixed(1)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default Leaderboard;

