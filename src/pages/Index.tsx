
import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import RecipeCard from '@/components/RecipeCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, ChefHat, Clock, Users } from 'lucide-react';
import { useRecipes } from '@/hooks/useRecipes';
import { Recipe, SearchFilters } from '@/types';
import RecipeDetailDialog from '@/components/RecipeDetailDialog';

const Index = () => {
  const { recipes, loading, error, searchRecipes } = useRecipes();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [showDetailDialog, setShowDetailDialog] = useState(false);

  const handleViewRecipe = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
    setShowDetailDialog(true);
  };

  const handleSearch = () => {
    const filters: SearchFilters = {};
    return searchRecipes(filters);
  };

  const filteredRecipes = recipes.filter(recipe =>
    recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    recipe.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-orange-500 to-red-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <ChefHat className="w-16 h-16 mx-auto mb-6" />
          <h1 className="text-5xl font-bold mb-4">
            Bienvenue dans <span className="text-yellow-200">CuisineApp</span>
          </h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Découvrez de délicieuses recettes et créez vos propres plats
          </p>
          
          {/* Search Bar */}
          <div className="max-w-md mx-auto flex gap-2">
            <Input
              type="text"
              placeholder="Rechercher des recettes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-white text-gray-900"
            />
            <Button onClick={handleSearch} className="bg-yellow-500 hover:bg-yellow-600 text-gray-900">
              <Search className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Recipes */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Recettes <span className="text-orange-500">Populaires</span>
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredRecipes.slice(0, 6).map((recipe) => (
              <div key={recipe.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <img
                  src={recipe.image_url || 'https://images.unsplash.com/photo-1546548970-71785318a17b?w=500'}
                  alt={recipe.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{recipe.title}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">{recipe.description}</p>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{recipe.prep_time + recipe.cook_time}min</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Users className="w-4 h-4" />
                      <span>{recipe.servings} pers.</span>
                    </div>
                  </div>
                  
                  <Button 
                    onClick={() => handleViewRecipe(recipe)}
                    className="w-full bg-orange-500 hover:bg-orange-600"
                  >
                    Voir la recette
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <RecipeDetailDialog
        recipe={selectedRecipe}
        isOpen={showDetailDialog}
        onClose={() => setShowDetailDialog(false)}
      />
    </div>
  );
};

export default Index;
