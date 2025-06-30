
import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Pencil, Trash2, Plus, Clock, Users } from 'lucide-react';
import { useRecipes } from '@/hooks/useRecipes';
import { Recipe } from '@/types';
import CreateRecipeDialog from '@/components/CreateRecipeDialog';
import { toast } from 'sonner';

const Admin = () => {
  const { recipes, loading, error, addRecipe, updateRecipe, deleteRecipe } = useRecipes();
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [editingRecipe, setEditingRecipe] = useState<Recipe | null>(null);
  const [showEditDialog, setShowEditDialog] = useState(false);

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

  const openEditDialog = (recipe: Recipe) => {
    setEditingRecipe(recipe);
    setShowEditDialog(true);
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
              Administration <span className="text-orange-500">Recettes</span>
            </h1>
            <p className="text-gray-600">
              Gérez vos recettes : créer, modifier, supprimer
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
