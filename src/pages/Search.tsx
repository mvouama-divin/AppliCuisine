
import React from 'react';
import Navigation from '@/components/Navigation';
import SearchFilters from '@/components/SearchFilters';
import { Card, CardContent } from '@/components/ui/card';
import { Search as SearchIcon } from 'lucide-react';

const Search = () => {
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
          onFiltersChange={(filters) => console.log('Filtres:', filters)}
          onSearchChange={(query) => console.log('Recherche:', query)}
        />

        <Card className="mt-8 text-center p-12">
          <SearchIcon className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
          <h3 className="text-xl font-semibold mb-2">Recherche détaillée</h3>
          <p className="text-muted-foreground">
            Cette page sera entièrement fonctionnelle avec l'intégration Supabase
          </p>
        </Card>
      </main>
    </div>
  );
};

export default Search;
