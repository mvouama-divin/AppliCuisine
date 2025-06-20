
import React from 'react';
import Navigation from '@/components/Navigation';
import RecipeCard from '@/components/RecipeCard';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useRecipes } from '@/hooks/useRecipes';
import { BookOpen, Plus } from 'lucide-react';

const Recipes = () => {
  const { recipes, loading } = useRecipes();

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
          <Button className="bg-cuisine-green hover:bg-cuisine-green-dark">
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
              {recipes.slice(0, 3).map((recipe) => (
                <RecipeCard
                  key={recipe.id}
                  recipe={recipe}
                  onSelect={(recipe) => console.log('Recette sélectionnée:', recipe)}
                />
              ))}
            </div>

            <Card className="mt-8 text-center p-12 bg-white border-0 shadow-sm">
              <BookOpen className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-xl font-semibold mb-2">Créez vos propres recettes</h3>
              <p className="text-muted-foreground mb-4">
                Ajoutez vos créations culinaires et partagez-les avec la communauté
              </p>
              <Button className="bg-cuisine-orange hover:bg-cuisine-orange-dark">
                Commencer
              </Button>
            </Card>
          </>
        )}
      </main>
    </div>
  );
};

export default Recipes;
