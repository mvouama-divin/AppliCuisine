
import React from 'react';
import Navigation from '@/components/Navigation';
import SearchFilters from '@/components/SearchFilters';
import RecipeCard from '@/components/RecipeCard';
import { Card, CardContent } from '@/components/ui/card';
import { Search as SearchIcon } from 'lucide-react';
import { useSearch } from '@/hooks/useSearch';

const Search = () => {
  const { 
    searchQuery, 
    setSearchQuery, 
    filters, 
    setFilters, 
    searchResults, 
    hasSearched 
  } = useSearch();

  const handleFiltersChange = (newFilters: any) => {
    setFilters(newFilters);
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <div className="min-h-screen bg-cuisine-cream">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4">
            Recherche <span className="gradient-text">avancée</span>
          </h1>
          <p className="text-muted-foreground">
            Utilisez nos filtres détaillés pour trouver la recette parfaite
          </p>
        </div>

        <SearchFilters
          onFiltersChange={handleFiltersChange}
          onSearchChange={handleSearchChange}
        />

        <div className="mt-8">
          {!hasSearched ? (
            <Card className="text-center p-12">
              <SearchIcon className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-xl font-semibold mb-2">Commencez votre recherche</h3>
              <p className="text-muted-foreground">
                Utilisez la barre de recherche ou les filtres pour trouver vos recettes préférées
              </p>
            </Card>
          ) : searchResults.length === 0 ? (
            <Card className="text-center p-12">
              <SearchIcon className="w-16 h-16 mx-auto mb-4 text-gray-400" />
              <h3 className="text-xl font-semibold mb-2">Aucune recette trouvée</h3>
              <p className="text-muted-foreground mb-4">
                {searchQuery 
                  ? `Aucune recette ne correspond à "${searchQuery}"`
                  : "Aucune recette ne correspond à vos critères de recherche"
                }
              </p>
              <p className="text-sm text-gray-500">
                Essayez de modifier vos critères de recherche ou d'utiliser des mots-clés différents
              </p>
            </Card>
          ) : (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">
                  Résultats de recherche
                </h2>
                <p className="text-gray-600">
                  {searchResults.length} recette{searchResults.length > 1 ? 's' : ''} trouvée{searchResults.length > 1 ? 's' : ''}
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {searchResults.map((recipe) => (
                  <RecipeCard key={recipe.id} recipe={recipe} />
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Search;
