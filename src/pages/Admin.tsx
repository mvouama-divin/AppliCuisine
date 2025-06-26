
import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Users, 
  ChefHat, 
  Package, 
  TrendingUp, 
  Search, 
  MoreHorizontal,
  UserCheck,
  UserX,
  Trash2,
  Edit,
  Plus
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';

const Admin = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data pour l'admin
  const [users, setUsers] = useState([
    { id: '1', name: 'Marie Dubois', email: 'marie@email.com', status: 'active', recipes: 5, joinDate: '2024-01-15' },
    { id: '2', name: 'Ahmed Ben Ali', email: 'ahmed@email.com', status: 'active', recipes: 12, joinDate: '2024-02-01' },
    { id: '3', name: 'Sophie Martin', email: 'sophie@email.com', status: 'inactive', recipes: 3, joinDate: '2024-03-10' },
    { id: '4', name: 'Carlos Rodriguez', email: 'carlos@email.com', status: 'active', recipes: 8, joinDate: '2024-03-15' },
  ]);

  const [recipes, setRecipes] = useState([
    { id: '1', title: 'Tajine aux légumes', author: 'Ahmed Ben Ali', status: 'published', likes: 45, createdAt: '2024-03-20' },
    { id: '2', title: 'Couscous royal', author: 'Marie Dubois', status: 'pending', likes: 12, createdAt: '2024-03-22' },
    { id: '3', title: 'Harira traditionnelle', author: 'Sophie Martin', status: 'published', likes: 78, createdAt: '2024-03-18' },
    { id: '4', title: 'Pastilla au poulet', author: 'Carlos Rodriguez', status: 'draft', likes: 0, createdAt: '2024-03-25' },
  ]);

  const stats = {
    totalUsers: users.length,
    activeUsers: users.filter(u => u.status === 'active').length,
    totalRecipes: recipes.length,
    pendingRecipes: recipes.filter(r => r.status === 'pending').length,
  };

  const handleUserStatusToggle = (userId: string) => {
    setUsers(prev => prev.map(user => 
      user.id === userId 
        ? { ...user, status: user.status === 'active' ? 'inactive' : 'active' }
        : user
    ));
  };

  const handleDeleteUser = (userId: string) => {
    setUsers(prev => prev.filter(user => user.id !== userId));
  };

  const handleRecipeStatusChange = (recipeId: string, newStatus: string) => {
    setRecipes(prev => prev.map(recipe =>
      recipe.id === recipeId
        ? { ...recipe, status: newStatus }
        : recipe
    ));
  };

  const handleDeleteRecipe = (recipeId: string) => {
    setRecipes(prev => prev.filter(recipe => recipe.id !== recipeId));
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredRecipes = recipes.filter(recipe =>
    recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    recipe.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-cuisine-cream">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">
            Panneau <span className="gradient-text">d'administration</span>
          </h1>
          <p className="text-muted-foreground">
            Gérez les utilisateurs, recettes et contenus de la plateforme
          </p>
        </div>

        {/* Statistiques */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="border-0 shadow-sm bg-white">
            <CardContent className="p-4 text-center">
              <Users className="w-8 h-8 mx-auto mb-2 text-blue-600" />
              <div className="text-2xl font-bold">{stats.totalUsers}</div>
              <div className="text-sm text-muted-foreground">Utilisateurs</div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-sm bg-white">
            <CardContent className="p-4 text-center">
              <UserCheck className="w-8 h-8 mx-auto mb-2 text-cuisine-green" />
              <div className="text-2xl font-bold">{stats.activeUsers}</div>
              <div className="text-sm text-muted-foreground">Actifs</div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-sm bg-white">
            <CardContent className="p-4 text-center">
              <ChefHat className="w-8 h-8 mx-auto mb-2 text-cuisine-orange" />
              <div className="text-2xl font-bold">{stats.totalRecipes}</div>
              <div className="text-sm text-muted-foreground">Recettes</div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-sm bg-white">
            <CardContent className="p-4 text-center">
              <TrendingUp className="w-8 h-8 mx-auto mb-2 text-yellow-600" />
              <div className="text-2xl font-bold">{stats.pendingRecipes}</div>
              <div className="text-sm text-muted-foreground">En attente</div>
            </CardContent>
          </Card>
        </div>

        {/* Barre de recherche */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Rechercher des utilisateurs ou recettes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Onglets */}
        <Tabs defaultValue="users" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="users">Utilisateurs</TabsTrigger>
            <TabsTrigger value="recipes">Recettes</TabsTrigger>
          </TabsList>

          <TabsContent value="users">
            <Card className="border-0 shadow-sm bg-white">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Gestion des utilisateurs</span>
                  <Button size="sm" className="bg-cuisine-green hover:bg-cuisine-green-dark">
                    <Plus className="w-4 h-4 mr-2" />
                    Nouvel utilisateur
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredUsers.map(user => (
                    <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center gap-3">
                          <div>
                            <h4 className="font-medium">{user.name}</h4>
                            <p className="text-sm text-muted-foreground">{user.email}</p>
                          </div>
                          <Badge 
                            variant={user.status === 'active' ? 'default' : 'secondary'}
                            className={user.status === 'active' ? 'bg-cuisine-green' : ''}
                          >
                            {user.status === 'active' ? 'Actif' : 'Inactif'}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                          <span>{user.recipes} recettes</span>
                          <span>Inscrit le {new Date(user.joinDate).toLocaleDateString()}</span>
                        </div>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleUserStatusToggle(user.id)}>
                            {user.status === 'active' ? (
                              <>
                                <UserX className="w-4 h-4 mr-2" />
                                Désactiver
                              </>
                            ) : (
                              <>
                                <UserCheck className="w-4 h-4 mr-2" />
                                Activer
                              </>
                            )}
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="w-4 h-4 mr-2" />
                            Modifier
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            onClick={() => handleDeleteUser(user.id)}
                            className="text-red-600"
                          >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Supprimer
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="recipes">
            <Card className="border-0 shadow-sm bg-white">
              <CardHeader>
                <CardTitle>Gestion des recettes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredRecipes.map(recipe => (
                    <div key={recipe.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center gap-3">
                          <div>
                            <h4 className="font-medium">{recipe.title}</h4>
                            <p className="text-sm text-muted-foreground">par {recipe.author}</p>
                          </div>
                          <Badge 
                            variant={
                              recipe.status === 'published' ? 'default' :
                              recipe.status === 'pending' ? 'secondary' :
                              'outline'
                            }
                            className={
                              recipe.status === 'published' ? 'bg-cuisine-green' :
                              recipe.status === 'pending' ? 'bg-cuisine-orange' :
                              ''
                            }
                          >
                            {recipe.status === 'published' ? 'Publié' :
                             recipe.status === 'pending' ? 'En attente' :
                             'Brouillon'}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                          <span>{recipe.likes} j'aime</span>
                          <span>Créé le {new Date(recipe.createdAt).toLocaleDateString()}</span>
                        </div>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          {recipe.status === 'pending' && (
                            <DropdownMenuItem onClick={() => handleRecipeStatusChange(recipe.id, 'published')}>
                              <UserCheck className="w-4 h-4 mr-2" />
                              Publier
                            </DropdownMenuItem>
                          )}
                          {recipe.status === 'published' && (
                            <DropdownMenuItem onClick={() => handleRecipeStatusChange(recipe.id, 'draft')}>
                              <UserX className="w-4 h-4 mr-2" />
                              Dépublier
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuItem>
                            <Edit className="w-4 h-4 mr-2" />
                            Modifier
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            onClick={() => handleDeleteRecipe(recipe.id)}
                            className="text-red-600"
                          >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Supprimer
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Admin;
