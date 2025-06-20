
import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  ChefHat, 
  BarChart3, 
  Settings, 
  Plus, 
  Edit, 
  Trash,
  Eye,
  TrendingUp,
  Star
} from 'lucide-react';

const Admin = () => {
  const [selectedTab, setSelectedTab] = useState('dashboard');

  // Mock data
  const stats = [
    { title: 'Utilisateurs actifs', value: '1,234', change: '+12%', icon: Users, color: 'text-blue-500' },
    { title: 'Recettes totales', value: '456', change: '+8%', icon: ChefHat, color: 'text-cuisine-orange' },
    { title: 'Recettes en attente', value: '12', change: '-5%', icon: Eye, color: 'text-yellow-500' },
    { title: 'Note moyenne', value: '4.6', change: '+0.2', icon: Star, color: 'text-cuisine-green' },
  ];

  const recentUsers = [
    { id: 1, name: 'Marie Dupont', email: 'marie@email.com', date: '2024-06-20', recipes: 5 },
    { id: 2, name: 'Pierre Martin', email: 'pierre@email.com', date: '2024-06-19', recipes: 12 },
    { id: 3, name: 'Sophie Leblanc', email: 'sophie@email.com', date: '2024-06-18', recipes: 8 },
  ];

  const pendingRecipes = [
    { id: 1, title: 'Tarte aux pommes grand-mère', author: 'Marie Dupont', date: '2024-06-20', status: 'pending' },
    { id: 2, title: 'Curry de légumes épicé', author: 'Ahmed Hassan', date: '2024-06-19', status: 'pending' },
    { id: 3, title: 'Soupe de potiron crémeuse', author: 'Claire Moreau', date: '2024-06-18', status: 'pending' },
  ];

  return (
    <div className="min-h-screen bg-cuisine-cream">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">
            Panneau d'<span className="gradient-text">administration</span>
          </h1>
          <p className="text-muted-foreground">
            Gérez les utilisateurs, recettes et contenus de la plateforme
          </p>
        </div>

        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-white">
            <TabsTrigger value="dashboard" className="flex items-center space-x-2">
              <BarChart3 className="w-4 h-4" />
              <span>Tableau de bord</span>
            </TabsTrigger>
            <TabsTrigger value="users" className="flex items-center space-x-2">
              <Users className="w-4 h-4" />
              <span>Utilisateurs</span>
            </TabsTrigger>
            <TabsTrigger value="recipes" className="flex items-center space-x-2">
              <ChefHat className="w-4 h-4" />
              <span>Recettes</span>
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center space-x-2">
              <Settings className="w-4 h-4" />
              <span>Paramètres</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            {/* Statistiques */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <Card key={index} className="border-0 shadow-sm bg-white">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                          <p className="text-3xl font-bold">{stat.value}</p>
                          <p className={`text-sm ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                            {stat.change} ce mois
                          </p>
                        </div>
                        <Icon className={`w-8 h-8 ${stat.color}`} />
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Activité récente */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border-0 shadow-sm bg-white">
                <CardHeader>
                  <CardTitle>Nouveaux utilisateurs</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentUsers.map(user => (
                      <div key={user.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                        <div>
                          <p className="font-medium">{user.name}</p>
                          <p className="text-sm text-muted-foreground">{user.email}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium">{user.recipes} recettes</p>
                          <p className="text-xs text-muted-foreground">{user.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-sm bg-white">
                <CardHeader>
                  <CardTitle>Recettes en attente</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {pendingRecipes.map(recipe => (
                      <div key={recipe.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                        <div>
                          <p className="font-medium">{recipe.title}</p>
                          <p className="text-sm text-muted-foreground">Par {recipe.author}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant="secondary">En attente</Badge>
                          <Button size="sm" variant="outline">
                            <Eye className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="users" className="space-y-6">
            <Card className="border-0 shadow-sm bg-white">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Gestion des utilisateurs</span>
                  <Button className="bg-cuisine-green hover:bg-cuisine-green-dark">
                    <Plus className="w-4 h-4 mr-2" />
                    Inviter utilisateur
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-2">Nom</th>
                        <th className="text-left p-2">Email</th>
                        <th className="text-left p-2">Rôle</th>
                        <th className="text-left p-2">Recettes</th>
                        <th className="text-left p-2">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentUsers.map(user => (
                        <tr key={user.id} className="border-b">
                          <td className="p-2 font-medium">{user.name}</td>
                          <td className="p-2 text-muted-foreground">{user.email}</td>
                          <td className="p-2">
                            <Badge variant="outline">Utilisateur</Badge>
                          </td>
                          <td className="p-2">{user.recipes}</td>
                          <td className="p-2">
                            <div className="flex space-x-2">
                              <Button size="sm" variant="outline">
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button size="sm" variant="outline">
                                <Trash className="w-4 h-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="recipes" className="space-y-6">
            <Card className="border-0 shadow-sm bg-white">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Gestion des recettes</span>
                  <Button className="bg-cuisine-orange hover:bg-cuisine-orange-dark">
                    <Plus className="w-4 h-4 mr-2" />
                    Ajouter recette
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center p-12">
                  <ChefHat className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-xl font-semibold mb-2">Interface de gestion</h3>
                  <p className="text-muted-foreground">
                    La gestion complète des recettes sera disponible avec l'intégration Supabase
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card className="border-0 shadow-sm bg-white">
              <CardHeader>
                <CardTitle>Paramètres système</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center p-12">
                  <Settings className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-xl font-semibold mb-2">Configuration avancée</h3>
                  <p className="text-muted-foreground">
                    Les paramètres système seront configurables via l'interface d'administration
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Call-to-action Supabase */}
        <Card className="mt-8 bg-gradient-cuisine text-white border-0 text-center p-8">
          <CardContent>
            <h3 className="text-xl font-semibold mb-2">
              Activez toutes les fonctionnalités
            </h3>
            <p className="mb-4">
              Connectez Supabase pour débloquer la gestion complète des utilisateurs, l'authentification et la base de données.
            </p>
            <Button variant="secondary" className="bg-white text-cuisine-orange hover:bg-cuisine-cream">
              <TrendingUp className="w-4 h-4 mr-2" />
              Intégrer Supabase
            </Button>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Admin;
