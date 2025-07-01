
import { useState, useMemo } from 'react';
import { Recipe } from '@/types';
import { useRecipes } from './useRecipes';

export const useSearch = () => {
  const { recipes } = useRecipes();
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<any>({});

  const searchResults = useMemo(() => {
    let filteredRecipes = recipes;

    // Recherche par texte
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      filteredRecipes = filteredRecipes.filter(recipe => 
        recipe.title.toLowerCase().includes(query) ||
        recipe.description.toLowerCase().includes(query) ||
        recipe.ingredients.some(ing => ing.name.toLowerCase().includes(query)) ||
        (recipe.tags && recipe.tags.some(tag => tag.toLowerCase().includes(query)))
      );
    }

    // Filtres
    if (filters.mealType) {
      filteredRecipes = filteredRecipes.filter(recipe => 
        recipe.meal_type === filters.mealType
      );
    }

    if (filters.difficulty) {
      filteredRecipes = filteredRecipes.filter(recipe => 
        recipe.difficulty === filters.difficulty
      );
    }

    if (filters.maxPrepTime) {
      filteredRecipes = filteredRecipes.filter(recipe => 
        (recipe.prep_time + recipe.cook_time) <= filters.maxPrepTime
      );
    }

    if (filters.dietType) {
      filteredRecipes = filteredRecipes.filter(recipe => 
        recipe.tags && recipe.tags.includes(filters.dietType)
      );
    }

    return filteredRecipes;
  }, [recipes, searchQuery, filters]);

  return {
    searchQuery,
    setSearchQuery,
    filters,
    setFilters,
    searchResults,
    hasSearched: searchQuery.trim().length > 0 || Object.keys(filters).some(key => filters[key])
  };
};
