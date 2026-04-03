import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';

const MakeImpactPage: React.FC = () => {
  const { user, isLoading, logout } = useAuth();
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center p-4">
        <div className="space-y-4">
          <Skeleton className="h-12 w-48 mx-auto" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl w-full">
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-32 w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    navigate('/login');
    return null;
  }

  const mockStats = {
    swaps: 42,
    co2Saved: 127.5,
    rank: 23,
    challengesCompleted: 8
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-emerald-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-4">
            Make Your Impact
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Join the CampusLoop movement to create real sustainability impact. Swap, challenge, and rise in the ranks!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <Badge variant="secondary" className="text-lg px-4 py-2">Welcome back, {user.email?.split('@')[0]}!</Badge>
            <Badge variant="default" className="text-lg px-4 py-2 bg-yellow-400 text-black">Rank #{mockStats.rank}</Badge>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Card>
            <CardContent className="p-6 pt-12 text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">↔️ {mockStats.swaps}</div>
              <div className="text-sm font-medium text-gray-500 mb-1">Items Swapped</div>
              <Badge variant="secondary">+12%</Badge>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 pt-12 text-center">
              <div className="text-3xl font-bold text-emerald-600 mb-2">🌿 {mockStats.co2Saved}kg</div>
              <div className="text-sm font-medium text-gray-500 mb-1">CO₂ Saved</div>
              <Badge variant="secondary">+8.3%</Badge>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 pt-12 text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">🏆 {mockStats.challengesCompleted}</div>
              <div className="text-sm font-medium text-gray-500 mb-1">Challenges Done</div>
              <Badge variant="secondary">+2</Badge>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 pt-12 text-center">
              <div className="text-3xl font-bold text-yellow-600 mb-2">👑 #{mockStats.rank}</div>
              <div className="text-sm font-medium text-gray-500 mb-1">Leaderboard Rank</div>
              <Badge variant="secondary">↑ 5</Badge>
            </CardContent>
          </Card>
        </div>

        {/* Impact Actions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <Card className="hover:shadow-xl transition-all duration-300 border-green-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-800">
                🔄 Swap Items
              </CardTitle>
              <CardDescription>Browse sustainable swaps for your campus</CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={() => navigate('/browse')} className="w-full bg-green-600 hover:bg-green-700">
                Start Swapping
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-xl transition-all duration-300 border-blue-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-800">
                🏆 Challenges
              </CardTitle>
              <CardDescription>Complete daily sustainability challenges</CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={() => navigate('/leaderboard')} className="w-full bg-blue-600 hover:bg-blue-700">
                View Challenges
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-xl transition-all duration-300 border-emerald-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-emerald-800">
                📊 Leaderboard
              </CardTitle>
              <CardDescription>Compete with your campus community</CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={() => navigate('/leaderboard')} className="w-full bg-emerald-600 hover:bg-emerald-700">
                Climb the Ranks
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <Card className="max-w-2xl mx-auto">
            <CardContent className="pt-8 pb-12">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Ready to make a difference?</h2>
              <p className="text-lg text-gray-600 mb-8">
                Every swap and challenge brings your campus closer to sustainability goals.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" onClick={() => navigate('/browse')} className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-lg px-8">
                  Take Action Now
                </Button>
                <Button variant="outline" size="lg" onClick={logout} className="text-lg px-8">
                  Logout
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MakeImpactPage;

