
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, Clock, Users, ChefHat, Leaf } from 'lucide-react';
import { SearchFilters as SearchFiltersType } from '@/types';

interface SearchFiltersProps {
  onFiltersChange: (filters: SearchFiltersType) => void;
  onSearchChange: (query: string) => void;
}

const SearchFilters: React.FC<SearchFiltersProps> = ({ onFiltersChange, onSearchChange }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<SearchFiltersType>({});
  const [showAdvanced, setShowAdvanced] = useState(false);

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

        {/* Toggle filtres avancés */}
        <div className="flex items-center justify-between mb-4">
          <Button
            variant="ghost"
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="flex items-center space-x-2 text-cuisine-orange hover:text-cuisine-orange-dark"
          >
            <Filter className="w-4 h-4" />
            <span>Filtres avancés</span>
            {activeFiltersCount > 0 && (
              <Badge variant="secondary" className="ml-2">
                {activeFiltersCount}
              </Badge>
            )}
          </Button>

          {activeFiltersCount > 0 && (
            <Button variant="ghost" onClick={clearFilters} className="text-sm text-muted-foreground">
              Effacer les filtres
            </Button>
          )}
        </div>

        {/* Filtres avancés */}
        {showAdvanced && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4 bg-white rounded-lg border animate-fade-in">
            <div>
              <label className="block text-sm font-medium mb-2">Difficulté</label>
              <Select
                value={filters.difficulty || ''}
                onValueChange={(value) => handleFilterChange('difficulty', value || undefined)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Toutes" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Toutes</SelectItem>
                  <SelectItem value="facile">Facile</SelectItem>
                  <SelectItem value="moyen">Moyen</SelectItem>
                  <SelectItem value="difficile">Difficile</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Régime alimentaire</label>
              <Select
                value={filters.dietType || ''}
                onValueChange={(value) => handleFilterChange('dietType', value || undefined)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Tous" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Tous</SelectItem>
                  <SelectItem value="végétarien">Végétarien</SelectItem>
                  <SelectItem value="végétalien">Végétalien</SelectItem>
                  <SelectItem value="halal">Halal</SelectItem>
                  <SelectItem value="casher">Casher</SelectItem>
                  <SelectItem value="keto">Keto</SelectItem>
                  <SelectItem value="sans_gluten">Sans gluten</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Saison</label>
              <Select
                value={filters.season || ''}
                onValueChange={(value) => handleFilterChange('season', value || undefined)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Toutes" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Toutes</SelectItem>
                  <SelectItem value="printemps">Printemps</SelectItem>
                  <SelectItem value="été">Été</SelectItem>
                  <SelectItem value="automne">Automne</SelectItem>
                  <SelectItem value="hiver">Hiver</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Temps de préparation</label>
              <Select
                value={filters.maxPrepTime?.toString() || ''}
                onValueChange={(value) => handleFilterChange('maxPrepTime', value ? parseInt(value) : undefined)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Peu importe" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Peu importe</SelectItem>
                  <SelectItem value="15">Moins de 15 min</SelectItem>
                  <SelectItem value="30">Moins de 30 min</SelectItem>
                  <SelectItem value="60">Moins d'1 heure</SelectItem>
                  <SelectItem value="120">Moins de 2 heures</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SearchFilters;
