import { useState, useEffect } from 'react';
import { Recipe } from '@/types';
import { supabase } from '@/lib/supabaseClient';

export const useRecipes = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Charger les recettes depuis Supabase
  const fetchRecipes = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('recipes') // ✅ supprimé <Recipe>
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }
    setRecipes((data as Recipe[]) || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  // Ajouter une recette
  const addRecipe = async (recipe: Omit<Recipe, 'id' | 'created_at' | 'updated_at'>) => {
    const { data, error } = await supabase
      .from('recipes')
      .insert([recipe])
      .select()
      .single();

    if (error) {
      setError(error.message);
      return { success: false, error: error.message };
    }

    setRecipes(prev => [data as Recipe, ...prev]);
    return { success: true, data };
  };

  // Mettre à jour une recette
  const updateRecipe = async (id: string, updates: Partial<Recipe>) => {
    const { data, error } = await supabase
      .from('recipes')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      setError(error.message);
      return { success: false, error: error.message };
    }

    setRecipes(prev => prev.map(r => (r.id === id ? (data as Recipe) : r)));
    return { success: true, data };
  };

  // Supprimer une recette
  const deleteRecipe = async (id: string) => {
    const { error } = await supabase
      .from('recipes')
      .delete()
      .eq('id', id);

    if (error) {
      setError(error.message);
      return { success: false, error: error.message };
    }

    setRecipes(prev => prev.filter(r => r.id !== id));
    return { success: true };
  };

  return {
    recipes,
    loading,
    error,
    addRecipe,
    updateRecipe,
    deleteRecipe,
    refetch: fetchRecipes,
  };
};
