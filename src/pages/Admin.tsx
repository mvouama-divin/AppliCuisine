import React, { useState, useEffect } from 'react';
import Navigation from '@/components/Navigation';
import AdminLogin from '@/components/AdminLogin';
import AdminStats from '@/components/AdminStats';
import MessagesList from '@/components/MessagesList';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Pencil, Trash2, Plus, Clock, Users, LogOut, MessageSquare, ChefHat } from 'lucide-react';
import { useRecipes } from '@/hooks/useRecipes';
import { useContactMessages } from '@/hooks/useContactMessages';
import { useAuth } from '@/hooks/useAuth';
import { Recipe } from '@/types';
import CreateRecipeDialog from '@/components/CreateRecipeDialog';
import { toast } from 'sonner';

const Admin = () => {
  const { recipes, loading, error, addRecipe, updateRecipe, deleteRecipe } = useRecipes();
  const { messages, loading: messagesLoading, updateMessageStatus, deleteMessage } = useContactMessages();
  const { isAdmin, loginAdmin, logoutAdmin, checkAdminStatus } = useAuth();
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [editingRecipe, setEditingRecipe] = useState<Recipe | null>(null);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    checkAdminStatus();
  }, []);

  if (!isAdmin) {
    return <AdminLogin onLogin={loginAdmin} />;
  }

  const handleCreateRecipe = async (recipeData: any) => {
    const result = await addRecipe(recipeData);
    if (result.success) {
      toast.success('Recette créée avec succès');
    } else {
      toast.error('Erreur lors de la création de la recette');
    }
    return result;
  };

  const handleEditRecipe = async (recipeData: any) => {
    if (!editingRecipe) return;
    
    const result = await updateRecipe(editingRecipe.id, recipeData);
    if (result.success) {
      toast.success('Recette modifiée avec succès');
      setEditingRecipe(null);
      setShowEditDialog(false);
    } else {
      toast.error('Erreur lors de la modification de la recette');
    }
    return result;
  };

  const handleDeleteRecipe = async (id: string) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette recette ?')) {
      const result = await deleteRecipe(id);
      if (result.success) {
        toast.success('Recette supprimée avec succès');
      } else {
        toast.error('Erreur lors de la suppression de la recette');
      }
    }
  };

  const handleUpdateMessageStatus = async (id: string, status: any) => {
    const result = updateMessageStatus(id, status);
    if (result.success) {
      toast.success('Statut du message mis à jour');
    }
  };

  const handleDeleteMessage = async (id: string) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce message ?')) {
      const result = deleteMessage(id);
      if (result.success) {
        toast.success('Message supprimé');
      }
    }
  };

  const openEditDialog = (recipe: Recipe) => {
    setEditingRecipe(recipe);
    setShowEditDialog(true);
  };

  const handleLogout = () => {
    logoutAdmin();
    toast.success('Déconnexion réussie');
  };

  // Statistiques
  const newMessages = messages.filter(msg => msg.status === 'nouveau').length;
  const recentActivity = [
    { type: 'recipe', message: 'Nouvelle recette ajoutée', time: '2h' },
    { type: 'message', message: 'Nouveau message reçu', time: '4h' },
    { type: 'update', message: 'Recette modifiée', time: '1j' }
  ];

  if (loading || messagesLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange-500"></div>
            <p className="mt-4 text-lg">Chargement des données...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <p className="text-red-600 text-lg">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">
              Administration <span className="text-orange-500">CuisineApp</span>
            </h1>
            <p className="text-gray-600">
              Tableau de bord administrateur
            </p>
          </div>
          <Button
            onClick={handleLogout}
            variant="outline"
            className="text-red-600 border-red-600 hover:bg-red-50"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Déconnexion
          </Button>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
            <TabsTrigger value="recipes">
              Recettes ({recipes.length})
            </TabsTrigger>
            <TabsTrigger value="messages">
              Messages ({messages.length})
              {newMessages > 0 && (
                <Badge variant="destructive" className="ml-2">
                  {newMessages}
                </Badge>
              )}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <AdminStats
              totalRecipes={recipes.length}
              totalMessages={messages.length}
              newMessages={newMessages}
              recentActivity={recentActivity}
            />

            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ChefHat className="w-5 h-5 text-orange-500" />
                    Recettes récentes
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {recipes.slice(0, 3).map(recipe => (
                      <div key={recipe.id} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                        <span className="font-medium">{recipe.title}</span>
                        <Badge variant="outline">{recipe.difficulty}</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="w-5 h-5 text-blue-500" />
                    Messages récents
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {messages.slice(0, 3).map(message => (
                      <div key={message.id} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                        <div>
                          <span className="font-medium">{message.name}</span>
                          <p className="text-sm text-gray-600 truncate max-w-48">
                            {message.message}
                          </p>
                        </div>
                        <Badge variant={message.status === 'nouveau' ? 'destructive' : 'secondary'}>
                          {message.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="recipes" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Gestion des recettes</h2>
              <Button
                onClick={() => setShowCreateDialog(true)}
                className="bg-green-600 hover:bg-green-700"
              >
                <Plus className="w-4 h-4 mr-2" />
                Nouvelle recette
              </Button>
            </div>

            {recipes.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-lg text-gray-600 mb-4">Aucune recette trouvée</p>
                <Button
                  onClick={() => setShowCreateDialog(true)}
                  className="bg-orange-500 hover:bg-orange-600"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Créer votre première recette
                </Button>
              </div>
            ) : (
              <div className="grid gap-6">
                {recipes.map((recipe) => (
                  <Card key={recipe.id} className="bg-white shadow-md">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <CardTitle className="text-xl mb-2">{recipe.title}</CardTitle>
                          <p className="text-gray-600 mb-2">{recipe.description}</p>
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <div className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              <span>{recipe.prep_time + recipe.cook_time}min</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Users className="w-4 h-4" />
                              <span>{recipe.servings} personnes</span>
                            </div>
                            <Badge variant="secondary">{recipe.difficulty}</Badge>
                            <Badge variant="outline">{recipe.meal_type}</Badge>
                          </div>
                        </div>
                        <div className="flex gap-2 ml-4">
                          <Button
                            onClick={() => openEditDialog(recipe)}
                            size="sm"
                            variant="outline"
                            className="text-blue-600 border-blue-600 hover:bg-blue-50"
                          >
                            <Pencil className="w-4 h-4 mr-1" />
                            Modifier
                          </Button>
                          <Button
                            onClick={() => handleDeleteRecipe(recipe.id)}
                            size="sm"
                            variant="outline"
                            className="text-red-600 border-red-600 hover:bg-red-50"
                          >
                            <Trash2 className="w-4 h-4 mr-1" />
                            Supprimer
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-semibold mb-2">Ingrédients ({recipe.ingredients.length})</h4>
                          <ul className="text-sm text-gray-600 space-y-1">
                            {recipe.ingredients.slice(0, 3).map((ingredient, index) => (
                              <li key={index}>
                                {ingredient.quantity} {ingredient.unit} de {ingredient.name}
                              </li>
                            ))}
                            {recipe.ingredients.length > 3 && (
                              <li className="text-gray-400">... et {recipe.ingredients.length - 3} autres</li>
                            )}
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2">Instructions ({recipe.instructions.length} étapes)</h4>
                          <div className="text-sm text-gray-600">
                            {recipe.instructions.slice(0, 2).map((instruction, index) => (
                              <p key={index} className="mb-1">
                                {index + 1}. {instruction.substring(0, 100)}...
                              </p>
                            ))}
                            {recipe.instructions.length > 2 && (
                              <p className="text-gray-400">... et {recipe.instructions.length - 2} autres étapes</p>
                            )}
                          </div>
                        </div>
                      </div>
                      {recipe.tags && recipe.tags.length > 0 && (
                        <div className="mt-4">
                          <div className="flex flex-wrap gap-1">
                            {recipe.tags.map(tag => (
                              <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="messages" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Messages des utilisateurs</h2>
              <div className="flex gap-2">
                <Badge variant="outline">Total: {messages.length}</Badge>
                {newMessages > 0 && (
                  <Badge variant="destructive">Nouveaux: {newMessages}</Badge>
                )}
              </div>
            </div>

            <MessagesList
              messages={messages}
              onUpdateStatus={handleUpdateMessageStatus}
              onDeleteMessage={handleDeleteMessage}
            />
          </TabsContent>
        </Tabs>
      </main>

      <CreateRecipeDialog
        isOpen={showCreateDialog}
        onClose={() => setShowCreateDialog(false)}
        onSave={handleCreateRecipe}
      />

      {editingRecipe && (
        <CreateRecipeDialog
          isOpen={showEditDialog}
          onClose={() => {
            setShowEditDialog(false);
            setEditingRecipe(null);
          }}
          onSave={handleEditRecipe}
        />
      )}
    </div>
  );
};

export default Admin;
