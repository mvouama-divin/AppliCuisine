
import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  ChefHat, 
  Search, 
  MoreHorizontal,
  Trash2,
  Edit,
  Eye
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useRecipes } from '@/hooks/useRecipes';
import { Recipe } from '@/types';
import RecipeDetailDialog from '@/components/RecipeDetailDialog';
import CreateRecipeDialog from '@/components/CreateRecipeDialog';

const Admin = () => {
  const { recipes, loading, deleteRecipe, updateRecipe } = useRecipes();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [showDetailDialog, setShowDetailDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);

  const handleDeleteRecipe = async (recipeId: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette recette ?')) {
      await deleteRecipe(recipeId);
    }
  };

  const handleEditRecipe = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
    setShowEditDialog(true);
  };

  const handleViewRecipe = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
    setShowDetailDialog(true);
  };

  const handleUpdateRecipe = async (recipeData: any) => {
    if (selectedRecipe) {
      const result = await updateRecipe(selectedRecipe.id, recipeData);
      if (result.success) {
        setShowEditDialog(false);
        setSelectedRecipe(null);
      }
      return result;
    }
    return { success: false, error: 'Aucune recette sélectionnée' };
  };

  const filteredRecipes = recipes.filter(recipe =>
    recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    recipe.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-cuisine-cream">
        <Navigation />
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-cuisine-orange"></div>
            <p className="mt-4 text-lg">Chargement...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cuisine-cream">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">
            Panneau <span className="gradient-text">d'administration</span>
          </h1>
          <p className="text-muted-foreground">
            Gérez vos recettes
          </p>
        </div>

        {/* Statistiques */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
          <Card className="border-0 shadow-sm bg-white">
            <CardContent className="p-4 text-center">
              <ChefHat className="w-8 h-8 mx-auto mb-2 text-cuisine-orange" />
              <div className="text-2xl font-bold">{recipes.length}</div>
              <div className="text-sm text-muted-foreground">Recettes</div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-sm bg-white">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold">
                {recipes.filter(r => r.difficulty === 'facile').length}
              </div>
              <div className="text-sm text-muted-foreground">Faciles</div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-sm bg-white">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold">
                {recipes.filter(r => r.difficulty === 'difficile').length}
              </div>
              <div className="text-sm text-muted-foreground">Difficiles</div>
            </CardContent>
          </Card>
        </div>

        {/* Barre de recherche */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Rechercher des recettes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Liste des recettes */}
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
                        <p className="text-sm text-muted-foreground">{recipe.description}</p>
                      </div>
                      <Badge className="bg-cuisine-green">
                        {recipe.difficulty}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                      <span>{recipe.servings} portions</span>
                      <span>{recipe.prep_time + recipe.cook_time} min</span>
                      <span>{recipe.meal_type}</span>
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleViewRecipe(recipe)}>
                        <Eye className="w-4 h-4 mr-2" />
                        Voir
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleEditRecipe(recipe)}>
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
      </main>

      <RecipeDetailDialog
        recipe={selectedRecipe}
        isOpen={showDetailDialog}
        onClose={() => setShowDetailDialog(false)}
      />

      <CreateRecipeDialog
        isOpen={showEditDialog}
        onClose={() => setShowEditDialog(false)}
        onSubmit={handleUpdateRecipe}
        editMode={true}
        initialData={selectedRecipe}
      />
    </div>
  );
};

export default Admin;
