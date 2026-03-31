import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { LeaderboardUser } from "@/types/sustainability";
import { Trophy, Crown } from "lucide-react";
import { cn } from "@/lib/utils";

const mockUsers: LeaderboardUser[] = [
  { name: "User1", score: 50 },
  { name: "User2", score: 40 },
  { name: "User3", score: 35 },
  { name: "User4", score: 28 },
  { name: "User5", score: 22 },
  { name: "User6", score: 18 },
  { name: "User7", score: 15 },
  { name: "User8", score: 12 },
  { name: "User9", score: 10 },
  { name: "User10", score: 8 },
];

const sortedUsers = [...mockUsers].sort((a, b) => b.score - a.score);

interface LeaderboardProps {}

const Leaderboard = ({}: LeaderboardProps) => {
  const getRankBadge = (index: number) => {
    switch (index) {
      case 0:
        return (
          <Badge className="bg-yellow-400 text-black border-2 border-yellow-500 shadow-lg mr-3">
            <Crown className="h-3 w-3 mr-1" />
            1st
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
          <Badge className="bg-amber-400 text-black border-2 border-amber-500 shadow-lg mr-3">
            <Trophy className="h-3 w-3 mr-1" />
            3rd
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
                  {Math.floor(user.score / 10)}
                </TableCell>
                <TableCell className="text-right text-muted-foreground">
                  {(user.score * 0.5).toFixed(1)}
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

