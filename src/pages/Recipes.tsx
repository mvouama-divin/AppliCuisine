
import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import RecipeCard from '@/components/RecipeCard';
import RecipeDetailDialog from '@/components/RecipeDetailDialog';
import MissingIngredientsDialog from '@/components/MissingIngredientsDialog';
import CreateRecipeDialog from '@/components/CreateRecipeDialog';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useRecipes } from '@/hooks/useRecipes';
import { useToast } from '@/hooks/use-toast';
import { BookOpen, Plus } from 'lucide-react';
import { Recipe, Ingredient } from '@/types';

const Recipes = () => {
  const { recipes, loading, addRecipe } = useRecipes();
  const { toast } = useToast();
  
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [showRecipeDetail, setShowRecipeDetail] = useState(false);
  const [showMissingIngredients, setShowMissingIngredients] = useState(false);
  const [showCreateRecipe, setShowCreateRecipe] = useState(false);

  // Mock du garde-manger utilisateur - à remplacer par les vraies données
  const mockUserPantry: Ingredient[] = [
    { id: '1', name: 'Tomate', category: 'légumes', quantity: 3, unit: 'pièce', organic: false },
    { id: '2', name: 'Oignon', category: 'légumes', quantity: 2, unit: 'pièce', organic: false },
    { id: '3', name: 'Ail', category: 'épices', quantity: 5, unit: 'pièce', organic: false },
  ];

  const handleRecipeSelect = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
    
    // Vérifier si tous les ingrédients sont disponibles
    const missingIngredients = recipe.ingredients.filter(recipeIngredient =>
      !mockUserPantry.some(available => 
        available.name.toLowerCase().includes(recipeIngredient.name.toLowerCase())
      )
    );

    if (missingIngredients.length === 0) {
      setShowRecipeDetail(true);
    } else {
      setShowMissingIngredients(true);
    }
  };

  const handleViewRecipe = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
    setShowRecipeDetail(true);
  };

  const handleViewMissingIngredients = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
    setShowMissingIngredients(true);
  };

  const handleCreateRecipe = (newRecipe: Recipe) => {
    addRecipe(newRecipe);
    toast({
      title: "Recette créée !",
      description: `${newRecipe.title} a été ajoutée à vos recettes.`,
    });
  };

  return (
    <div className="min-h-screen bg-cuisine-cream">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">
              Mes <span className="gradient-text">recettes</span>
            </h1>
            <p className="text-muted-foreground">
              Vos recettes favorites et créations personnelles
            </p>
          </div>
          <Button 
            className="bg-cuisine-green hover:bg-cuisine-green-dark"
            onClick={() => setShowCreateRecipe(true)}
          >
            <Plus className="w-4 h-4 mr-2" />
            Créer une recette
          </Button>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, index) => (
              <Card key={index} className="animate-pulse">
                <div className="h-48 bg-muted"></div>
                <CardContent className="p-4">
                  <div className="h-4 bg-muted rounded mb-2"></div>
                  <div className="h-4 bg-muted rounded w-3/4"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
              {recipes.map((recipe) => (
                <RecipeCard
                  key={recipe.id}
                  recipe={recipe}
                  onSelect={handleRecipeSelect}
                  availableIngredients={mockUserPantry.map(ing => ing.name)}
                />
              ))}
            </div>

            <Card className="mt-8 text-center p-12 bg-white border-0 shadow-sm">
              <BookOpen className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-xl font-semibold mb-2">Créez vos propres recettes</h3>
              <p className="text-muted-foreground mb-4">
                Ajoutez vos créations culinaires et partagez-les avec la communauté
              </p>
              <Button 
                className="bg-cuisine-orange hover:bg-cuisine-orange-dark"
                onClick={() => setShowCreateRecipe(true)}
              >
                Commencer
              </Button>
            </Card>
          </>
        )}
      </main>

      {/* Dialogs */}
      <RecipeDetailDialog
        recipe={selectedRecipe}
        isOpen={showRecipeDetail}
        onClose={() => {
          setShowRecipeDetail(false);
          setSelectedRecipe(null);
        }}
      />

      <MissingIngredientsDialog
        recipe={selectedRecipe}
        availableIngredients={mockUserPantry}
        isOpen={showMissingIngredients}
        onClose={() => {
          setShowMissingIngredients(false);
          setSelectedRecipe(null);
        }}
      />

      <CreateRecipeDialog
        isOpen={showCreateRecipe}
        onClose={() => setShowCreateRecipe(false)}
        onSave={handleCreateRecipe}
      />
    </div>
  );
};

export default Recipes;
