
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Search, Clock, ChefHat, Leaf } from 'lucide-react';
import { SearchFilters as SearchFiltersType } from '@/types';

interface SearchFiltersProps {
  onFiltersChange: (filters: SearchFiltersType) => void;
  onSearchChange: (query: string) => void;
}

const SearchFilters: React.FC<SearchFiltersProps> = ({ onFiltersChange, onSearchChange }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<SearchFiltersType>({});

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    onSearchChange(value);
  };

  const handleFilterChange = (key: keyof SearchFiltersType, value: any) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const clearFilters = () => {
    setFilters({});
    onFiltersChange({});
  };

  const activeFiltersCount = Object.values(filters).filter(Boolean).length;

  return (
    <Card className="w-full bg-gradient-warm border-0 shadow-lg">
      <CardContent className="p-6">
        {/* Barre de recherche principale */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
          <Input
            placeholder="Rechercher une recette, un ingrédient..."
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="pl-10 pr-4 h-12 text-lg bg-white border-cuisine-orange/20 focus:border-cuisine-orange"
          />
        </div>

        {/* Filtres rapides */}
        <div className="flex flex-wrap gap-3 mb-4">
          <Button
            variant={filters.mealType === 'petit-déjeuner' ? 'default' : 'outline'}
            size="sm"
            onClick={() => handleFilterChange('mealType', filters.mealType === 'petit-déjeuner' ? undefined : 'petit-déjeuner')}
            className="flex items-center space-x-2"
          >
            <ChefHat className="w-4 h-4" />
            <span>Petit-déj</span>
          </Button>
          
          <Button
            variant={filters.mealType === 'déjeuner' ? 'default' : 'outline'}
            size="sm"
            onClick={() => handleFilterChange('mealType', filters.mealType === 'déjeuner' ? undefined : 'déjeuner')}
          >
            Déjeuner
          </Button>
          
          <Button
            variant={filters.mealType === 'dîner' ? 'default' : 'outline'}
            size="sm"
            onClick={() => handleFilterChange('mealType', filters.mealType === 'dîner' ? undefined : 'dîner')}
          >
            Dîner
          </Button>

          <Button
            variant={filters.maxPrepTime === 30 ? 'default' : 'outline'}
            size="sm"
            onClick={() => handleFilterChange('maxPrepTime', filters.maxPrepTime === 30 ? undefined : 30)}
            className="flex items-center space-x-2"
          >
            <Clock className="w-4 h-4" />
            <span>Rapide (30min)</span>
          </Button>

          <Button
            variant={filters.dietType === 'végétarien' ? 'default' : 'outline'}
            size="sm"
            onClick={() => handleFilterChange('dietType', filters.dietType === 'végétarien' ? undefined : 'végétarien')}
            className="flex items-center space-x-2"
          >
            <Leaf className="w-4 h-4" />
            <span>Végétarien</span>
          </Button>
        </div>

        {/* Bouton pour effacer les filtres */}
        {activeFiltersCount > 0 && (
          <div className="flex justify-center">
            <Button variant="ghost" onClick={clearFilters} className="text-sm text-muted-foreground">
              Effacer les filtres ({activeFiltersCount})
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SearchFilters;
