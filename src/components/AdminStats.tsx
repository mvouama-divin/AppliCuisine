
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  MessageSquare, 
  ChefHat, 
  Users, 
  TrendingUp,
  Clock,
  CheckCircle
} from 'lucide-react';

interface AdminStatsProps {
  totalRecipes: number;
  totalMessages: number;
  newMessages: number;
  recentActivity: Array<{
    type: string;
    message: string;
    time: string;
  }>;
}

const AdminStats: React.FC<AdminStatsProps> = ({ 
  totalRecipes, 
  totalMessages, 
  newMessages,
  recentActivity 
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Recettes</CardTitle>
          <ChefHat className="h-4 w-4 text-orange-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-orange-700">{totalRecipes}</div>
          <p className="text-xs text-orange-600">Recettes publiées</p>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Messages</CardTitle>
          <MessageSquare className="h-4 w-4 text-blue-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-blue-700">{totalMessages}</div>
          <p className="text-xs text-blue-600">Messages reçus</p>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Nouveaux</CardTitle>
          <TrendingUp className="h-4 w-4 text-green-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-700">{newMessages}</div>
          <p className="text-xs text-green-600">Messages non lus</p>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Activité</CardTitle>
          <Clock className="h-4 w-4 text-purple-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-purple-700">{recentActivity.length}</div>
          <p className="text-xs text-purple-600">Actions récentes</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminStats;
