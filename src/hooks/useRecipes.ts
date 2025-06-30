
import { useState, useEffect } from 'react';
import { Recipe } from '@/types';

// Données mockées pour les recettes
const mockRecipes: Recipe[] = [
  {
    id: '1',
    title: 'Spaghetti Carbonara',
    description: 'Un classique italien simple et délicieux',
    image_url: 'https://images.unsplash.com/photo-1551892474-4658312f6533?w=500',
    prep_time: 15,
    cook_time: 20,
    servings: 4,
    difficulty: 'moyen',
    meal_type: 'dîner',
    diet_type: 'classique',
    ingredients: [
      { name: 'Spaghetti', quantity: 400, unit: 'g' },
      { name: 'Œufs', quantity: 3, unit: 'pièce' },
      { name: 'Parmesan', quantity: 100, unit: 'g' },
      { name: 'Pancetta', quantity: 150, unit: 'g' }
    ],
    instructions: [
      'Faire cuire les spaghetti dans l\'eau salée',
      'Faire revenir la pancetta dans une poêle',
      'Mélanger les œufs avec le parmesan râpé',
      'Mélanger les pâtes chaudes avec la préparation aux œufs'
    ],
    tags: ['italien', 'rapide', 'crémeux'],
    rating: 4.5,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '2',
    title: 'Salade César',
    description: 'Salade fraîche avec croûtons et parmesan',
    image_url: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=500',
    prep_time: 10,
    cook_time: 0,
    servings: 2,
    difficulty: 'facile',
    meal_type: 'déjeuner',
    diet_type: 'végétarien',
    ingredients: [
      { name: 'Salade romaine', quantity: 1, unit: 'pièce' },
      { name: 'Croûtons', quantity: 50, unit: 'g' },
      { name: 'Parmesan', quantity: 30, unit: 'g' },
      { name: 'Sauce César', quantity: 3, unit: 'cuillère' }
    ],
    instructions: [
      'Laver et couper la salade',
      'Préparer la sauce césar',
      'Mélanger tous les ingrédients',
      'Servir immédiatement'
    ],
    tags: ['salade', 'frais', 'végétarien'],
    rating: 4.2,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
];

export const useRecipes = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simuler un chargement
    setTimeout(() => {
      setRecipes(mockRecipes);
      setLoading(false);
    }, 500);
  }, []);

  const addRecipe = async (recipe: Omit<Recipe, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const newRecipe: Recipe = {
        ...recipe,
        id: Date.now().toString(),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      
      setRecipes(prev => [newRecipe, ...prev]);
      return { success: true, data: newRecipe };
    } catch (err) {
      console.error('Erreur lors de l\'ajout de la recette:', err);
      return { success: false, error: 'Erreur lors de l\'ajout de la recette' };
    }
  };

  const updateRecipe = async (id: string, updates: Partial<Recipe>) => {
    try {
      const updatedRecipe = { ...updates, updated_at: new Date().toISOString() };
      setRecipes(prev => prev.map(recipe => 
        recipe.id === id ? { ...recipe, ...updatedRecipe } : recipe
      ));
      return { success: true, data: updatedRecipe };
    } catch (err) {
      console.error('Erreur lors de la modification de la recette:', err);
      return { success: false, error: 'Erreur lors de la modification de la recette' };
    }
  };

  const deleteRecipe = async (id: string) => {
    try {
      setRecipes(prev => prev.filter(recipe => recipe.id !== id));
      return { success: true };
    } catch (err) {
      console.error('Erreur lors de la suppression de la recette:', err);
      return { success: false, error: 'Erreur lors de la suppression de la recette' };
    }
  };

  const searchRecipes = (filters: any) => {
    // Pour l'instant, retourner toutes les recettes
    return recipes;
  };

  return {
    recipes,
    loading,
    error,
    addRecipe,
    updateRecipe,
    deleteRecipe,
    searchRecipes,
    refetch: () => setRecipes(mockRecipes)
  };
};
