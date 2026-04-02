import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Package, Leaf, ShieldAlert, Trophy, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/DashboardLayout';

const MakeImpactPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const quickActions = [
    { name: 'Browse Items', icon: Package, path: '/browse', desc: 'Find items to reuse' },
    { name: 'Detect Fake Content', icon: ShieldAlert, path: '/fake-detector', desc: 'Verify information' },
    { name: 'View Leaderboard', icon: Trophy, path: '/leaderboard', desc: 'See top contributors' },
    { name: 'My Listings', icon: Leaf, path: '/account', desc: 'Manage your impact' },
  ];

  return (
    <DashboardLayout>
      <div className="py-12">
        <div className="max-w-4xl mx-auto px-4 text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-6">
            Make an Impact
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Welcome back, {user?.user_metadata?.full_name || 'campus hero'}! Start contributing to a sustainable campus today.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickActions.map((action, index) => (
            <Card key={action.name} className="group hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br hover:from-blue-50 hover:to-green-50">
              <CardHeader className="pb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                  <action.icon className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-lg font-bold text-gray-900 group-hover:text-green-600 transition-colors">
                  {action.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">{action.desc}</p>
                <Button 
                  onClick={() => navigate(action.path)}
                  className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 transition-all duration-300"
                >
                  Get Started <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default MakeImpactPage;

