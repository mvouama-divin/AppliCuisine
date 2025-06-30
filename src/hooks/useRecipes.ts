
import { useState, useEffect } from 'react';
import { Recipe } from '@/types';
import { supabase } from '@/lib/supabase';

export const useRecipes = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRecipes = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('recipes')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setRecipes(data || []);
    } catch (err) {
      console.error('Erreur lors du chargement des recettes:', err);
      setError('Erreur lors du chargement des recettes');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  const addRecipe = async (recipe: Omit<Recipe, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const { data, error } = await supabase
        .from('recipes')
        .insert([recipe])
        .select()
        .single();

      if (error) throw error;
      
      setRecipes(prev => [data, ...prev]);
      return { success: true, data };
    } catch (err) {
      console.error('Erreur lors de l\'ajout de la recette:', err);
      return { success: false, error: 'Erreur lors de l\'ajout de la recette' };
    }
  };

  const updateRecipe = async (id: string, updates: Partial<Recipe>) => {
    try {
      const { data, error } = await supabase
        .from('recipes')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      setRecipes(prev => prev.map(recipe => recipe.id === id ? data : recipe));
      return { success: true, data };
    } catch (err) {
      console.error('Erreur lors de la modification de la recette:', err);
      return { success: false, error: 'Erreur lors de la modification de la recette' };
    }
  };

  const deleteRecipe = async (id: string) => {
    try {
      const { error } = await supabase
        .from('recipes')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setRecipes(prev => prev.filter(recipe => recipe.id !== id));
      return { success: true };
    } catch (err) {
      console.error('Erreur lors de la suppression de la recette:', err);
      return { success: false, error: 'Erreur lors de la suppression de la recette' };
    }
  };

  return {
    recipes,
    loading,
    error,
    addRecipe,
    updateRecipe,
    deleteRecipe,
    refetch: fetchRecipes
  };
};
