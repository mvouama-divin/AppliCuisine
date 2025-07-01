import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, Users, Star, Plus, Eye, Trash2 } from 'lucide-react';
import { useRecipes } from '@/hooks/useRecipes';
import { Recipe } from '@/types';
import CreateRecipeDialog from '@/components/CreateRecipeDialog';
import RecipeDetailDialog from '@/components/RecipeDetailDialog';

const Recipes = () => {
  const { recipes, loading, error, addRecipe, deleteRecipe } = useRecipes(); // ajoute deleteRecipe ici
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showDetailDialog, setShowDetailDialog] = useState(false);

  const handleCreateRecipe = async (recipeData: any) => {
    const result = await addRecipe(recipeData);
    return result;
  };

  const handleViewRecipe = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
    setShowDetailDialog(true);
  };

  const handleDelete = async (id: string) => {
    const confirm = window.confirm("Voulez-vous vraiment supprimer cette recette ?");
    if (!confirm) return;

    const result = await deleteRecipe(id);
    if (!result.success) {
      alert('Erreur lors de la suppression: ' + result.error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange-500"></div>
            <p className="mt-4 text-lg">Chargement des recettes...</p>
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
              Mes <span className="text-orange-500">Recettes</span>
            </h1>
            <p className="text-gray-600">
              Découvrez et créez de délicieuses recettes
            </p>
          </div>
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
            <p className="text-lg text-gray-600 mb-4">
              Aucune recette trouvée
            </p>
            <Button
              onClick={() => setShowCreateDialog(true)}
              className="bg-orange-500 hover:bg-orange-600"
            >
              <Plus className="w-4 h-4 mr-2" />
              Créer votre première recette
            </Button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recipes.map((recipe) => (
              <Card key={recipe.id} className="group hover:shadow-lg transition-shadow overflow-hidden bg-white border-0 shadow-md">
                <div className="relative overflow-hidden">
                  <img
                    src={recipe.image_url || 'https://images.unsplash.com/photo-1546548970-71785318a17b?w=500'}
                    alt={recipe.title}
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3">
                    <Badge className="bg-green-600 text-white">
                      {recipe.difficulty}
                    </Badge>
                  </div>
                </div>

                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-lg text-gray-900 group-hover:text-orange-500 transition-colors line-clamp-2">
                      {recipe.title}
                    </h3>
                    <div className="flex gap-2 items-center">
                      {recipe.rating && (
                        <div className="flex items-center space-x-1 ml-2">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-medium">{recipe.rating}</span>
                        </div>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleViewRecipe(recipe)}
                        aria-label={`Voir ${recipe.title}`}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(recipe.id)}
                        aria-label={`Supprimer ${recipe.title}`}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                    {recipe.description}
                  </p>

                  <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{recipe.prep_time + recipe.cook_time}min</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Users className="w-4 h-4" />
                      <span>{recipe.servings} pers.</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1 mb-3">
                    <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">{recipe.meal_type}</span>
                    <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">{recipe.diet_type}</span>
                    {recipe.tags?.slice(0, 2).map(tag => (
                      <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>

      <CreateRecipeDialog
        isOpen={showCreateDialog}
        onClose={() => setShowCreateDialog(false)}
        onSave={handleCreateRecipe}
      />

      <RecipeDetailDialog
        recipe={selectedRecipe}
        isOpen={showDetailDialog}
        onClose={() => setShowDetailDialog(false)}
      />
    </div>
  );
};

export default Recipes;
