import { useEffect, useState } from 'react';
import { Recipe } from '@/types';
import { supabase } from '@/lib/supabaseClient';

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

  const fetchRecipes = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('recipes').select('*');
    if (error) {
      console.error('Erreur lors du chargement :', error.message);
      setError("Erreur lors du chargement des recettes");
    } else {
      setRecipes(data as Recipe[]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  const addRecipe = async (recipe: Omit<Recipe, 'id' | 'created_at' | 'updated_at'>) => {
    const { data, error } = await supabase.from('recipes').insert([
      {
        ...recipe,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
    ]).select();

    if (error) {
      console.error("Erreur d'insertion :", error.message);
      return { success: false, error: error.message };
    }

    if (data) {
      setRecipes(prev => [data[0] as Recipe, ...prev]);
      return { success: true, data: data[0] };
    }

    return { success: false, error: "Aucune donnée retournée" };
  };

  const updateRecipe = async (id: string, updates: Partial<Recipe>) => {
    const { data, error } = await supabase.from('recipes')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select();

    if (error) {
      console.error("Erreur de mise à jour :", error.message);
      return { success: false, error: error.message };
    }

    if (data) {
      setRecipes(prev => prev.map(r => (r.id === id ? data[0] as Recipe : r)));
      return { success: true, data: data[0] };
    }

    return { success: false, error: "Mise à jour échouée" };
  };

  const deleteRecipe = async (id: string) => {
    const { error } = await supabase.from('recipes').delete().eq('id', id);
    if (error) {
      console.error("Erreur de suppression :", error.message);
      return { success: false, error: error.message };
    }

    setRecipes(prev => prev.filter(r => r.id !== id));
    return { success: true };
  };

  const searchRecipes = (filters: any) => {
    // TODO : Ajoute la logique si tu veux filtrer
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
    refetch: fetchRecipes
  };
};