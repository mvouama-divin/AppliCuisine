
import React, { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Navigation from '@/components/Navigation';
import SearchFilters from '@/components/SearchFilters';
import RecipeCard from '@/components/RecipeCard';
import { useRecipes } from '@/hooks/useRecipes';
import { SearchFilters as SearchFiltersType, Recipe } from '@/types';
import { TrendingUp, Clock, Users, ChefHat, Sparkles } from 'lucide-react';

const Index = () => {
  const { recipes, loading, searchRecipes } = useRecipes();
  const [filters, setFilters] = useState<SearchFiltersType>({});
  const [searchQuery, setSearchQuery] = useState('');

  // Mock user pantry - sera remplacé par les données Supabase
  const userPantry = [
    { id: '1', name: 'Tomate', category: 'légumes' as const, quantity: 3, unit: 'pièce' as const, organic: false },
    { id: '2', name: 'Oignon', category: 'légumes' as const, quantity: 2, unit: 'pièce' as const, organic: true },
    { id: '3', name: 'Aubergine', category: 'légumes' as const, quantity: 1, unit: 'pièce' as const, organic: false },
  ];

  const filteredRecipes = useMemo(() => {
    let result = searchRecipes(filters, userPantry);

    if (searchQuery) {
      result = result.filter(recipe =>
        recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        recipe.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        recipe.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    return result;
  }, [recipes, filters, searchQuery, searchRecipes]);

  const handleRecipeSelect = (recipe: Recipe) => {
    console.log('Recette sélectionnée:', recipe);
    // Ici, on naviguerait vers la page de détail de la recette
  };

  const stats = [
    {
      title: 'Recettes disponibles',
      value: recipes.length,
      icon: ChefHat,
      color: 'text-cuisine-orange'
    },
    {
      title: 'Avec vos ingrédients',
      value: filteredRecipes.filter(r => 
        r.ingredients.every(ingredient =>
          userPantry.some(pantryItem => 
            pantryItem.name.toLowerCase().includes(ingredient.name.toLowerCase())
          )
        )
      ).length,
      icon: Sparkles,
      color: 'text-cuisine-green'
    },
    {
      title: 'Rapides (<30min)',
      value: recipes.filter(r => r.prepTime + r.cookTime <= 30).length,
      icon: Clock,
      color: 'text-blue-500'
    },
    {
      title: 'Populaires',
      value: recipes.filter(r => r.rating && r.rating >= 4.5).length,
      icon: TrendingUp,
      color: 'text-purple-500'
    }
  ];

  return (
    <div className="min-h-screen bg-cuisine-cream">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Découvrez</span> vos prochaines recettes
          </h1>
          <p className="text-xl text-muted-foreground mb-6 max-w-2xl mx-auto">
            Transformez les ingrédients de votre garde-manger en délicieux repas avec nos recommandations personnalisées.
          </p>
        </div>

        {/* Statistiques */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="text-center border-0 shadow-sm bg-white">
                <CardContent className="p-4">
                  <Icon className={`w-8 h-8 mx-auto mb-2 ${stat.color}`} />
                  <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.title}</div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Filtres de recherche */}
        <div className="mb-8">
          <SearchFilters
            onFiltersChange={setFilters}
            onSearchChange={setSearchQuery}
          />
        </div>

        {/* Actions rapides */}
        <div className="flex flex-wrap gap-3 mb-8">
          <Button
            variant="outline"
            onClick={() => setFilters({ availableOnly: true })}
            className="bg-cuisine-green/10 border-cuisine-green text-cuisine-green-dark hover:bg-cuisine-green hover:text-white"
          >
            <Sparkles className="w-4 h-4 mr-2" />
            Avec mes ingrédients
          </Button>
          <Button
            variant="outline"
            onClick={() => setFilters({ maxPrepTime: 30 })}
            className="bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-500 hover:text-white"
          >
            <Clock className="w-4 h-4 mr-2" />
            Recettes rapides
          </Button>
          <Button
            variant="outline"
            onClick={() => setFilters({ dietType: 'végétarien' })}
            className="bg-green-50 border-green-200 text-green-700 hover:bg-green-500 hover:text-white"
          >
            <Users className="w-4 h-4 mr-2" />
            Végétarien
          </Button>
        </div>

        {/* Résultats */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold">
              {filteredRecipes.length} recette{filteredRecipes.length > 1 ? 's' : ''} trouvée{filteredRecipes.length > 1 ? 's' : ''}
            </h2>
            {searchQuery && (
              <p className="text-muted-foreground">
                pour "{searchQuery}"
              </p>
            )}
          </div>
        </div>

        {/* Grille de recettes */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, index) => (
              <Card key={index} className="animate-pulse">
                <div className="h-48 bg-muted"></div>
                <CardContent className="p-4">
                  <div className="h-4 bg-muted rounded mb-2"></div>
                  <div className="h-4 bg-muted rounded w-3/4 mb-4"></div>
                  <div className="flex space-x-2">
                    <div className="h-6 bg-muted rounded w-16"></div>
                    <div className="h-6 bg-muted rounded w-16"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : filteredRecipes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
            {filteredRecipes.map((recipe) => (
              <RecipeCard
                key={recipe.id}
                recipe={recipe}
                onSelect={handleRecipeSelect}
                availableIngredients={userPantry.map(p => p.name)}
              />
            ))}
          </div>
        ) : (
          <Card className="text-center p-12 bg-white border-0 shadow-sm">
            <ChefHat className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-xl font-semibold mb-2">Aucune recette trouvée</h3>
            <p className="text-muted-foreground mb-4">
              Essayez de modifier vos filtres ou votre recherche
            </p>
            <Button onClick={() => { setFilters({}); setSearchQuery(''); }}>
              Réinitialiser les filtres
            </Button>
          </Card>
        )}

        {/* Call-to-action */}
        {!loading && filteredRecipes.length > 0 && (
          <div className="text-center mt-12">
            <Card className="bg-gradient-cuisine text-white border-0 p-8 max-w-2xl mx-auto">
              <CardHeader>
                <CardTitle className="text-2xl mb-2">
                  Prêt à cuisiner ?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">
                  Ajoutez vos ingrédients dans votre garde-manger pour des recommandations encore plus précises.
                </p>
                <Button variant="secondary" size="lg" className="bg-white text-cuisine-orange hover:bg-cuisine-cream">
                  Gérer mon garde-manger
                </Button>
              </CardContent>
            </Card>
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;
