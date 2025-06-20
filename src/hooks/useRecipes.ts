
import { useState, useEffect } from 'react';
import { Recipe, SearchFilters, Ingredient } from '@/types';

// Mock data - sera remplacé par Supabase
const mockRecipes: Recipe[] = [
  {
    id: '1',
    title: 'Ratatouille Provençale',
    description: 'Un classique de la cuisine française avec des légumes de saison.',
    imageUrl: 'https://images.unsplash.com/photo-1572441713132-51c75654db73?w=500',
    prepTime: 20,
    cookTime: 45,
    servings: 4,
    difficulty: 'moyen',
    mealType: 'déjeuner',
    season: 'été',
    dietType: 'végétarien',
    ingredients: [
      { ingredientId: '1', name: 'Aubergine', quantity: 2, unit: 'pièce' },
      { ingredientId: '2', name: 'Courgette', quantity: 2, unit: 'pièce' },
      { ingredientId: '3', name: 'Tomate', quantity: 4, unit: 'pièce' },
      { ingredientId: '4', name: 'Poivron', quantity: 2, unit: 'pièce' },
      { ingredientId: '5', name: 'Oignon', quantity: 1, unit: 'pièce' }
    ],
    instructions: [
      'Couper tous les légumes en dés',
      'Faire revenir l\'oignon dans l\'huile d\'olive',
      'Ajouter les légumes un par un',
      'Laisser mijoter 45 minutes'
    ],
    tags: ['méditerranéen', 'végétarien', 'été'],
    nutritionInfo: {
      calories: 180,
      protein: 5,
      carbs: 20,
      fat: 8,
      fiber: 8
    },
    rating: 4.5,
    reviews: 127,
    createdAt: new Date('2024-01-15')
  },
  {
    id: '2',
    title: 'Saumon Grillé aux Herbes',
    description: 'Saumon frais grillé avec un mélange d\'herbes fraîches.',
    imageUrl: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=500',
    prepTime: 15,
    cookTime: 20,
    servings: 2,
    difficulty: 'facile',
    mealType: 'dîner',
    season: 'printemps',
    dietType: 'classique',
    ingredients: [
      { ingredientId: '6', name: 'Saumon', quantity: 400, unit: 'g' },
      { ingredientId: '7', name: 'Citron', quantity: 1, unit: 'pièce' },
      { ingredientId: '8', name: 'Aneth', quantity: 2, unit: 'cuillère' },
      { ingredientId: '9', name: 'Huile d\'olive', quantity: 2, unit: 'cuillère' }
    ],
    instructions: [
      'Préchauffer le four à 200°C',
      'Badigeonner le saumon d\'huile d\'olive',
      'Saupoudrer d\'herbes et presser le citron',
      'Cuire 15-20 minutes selon l\'épaisseur'
    ],
    tags: ['poisson', 'rapide', 'santé'],
    nutritionInfo: {
      calories: 320,
      protein: 35,
      carbs: 2,
      fat: 18,
      fiber: 0
    },
    rating: 4.8,
    reviews: 203,
    createdAt: new Date('2024-02-01')
  },
  {
    id: '3',
    title: 'Smoothie Bowl Tropical',
    description: 'Bowl énergétique aux fruits tropicaux et granola maison.',
    imageUrl: 'https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?w=500',
    prepTime: 10,
    cookTime: 0,
    servings: 1,
    difficulty: 'facile',
    mealType: 'petit-déjeuner',
    season: 'été',
    dietType: 'végétalien',
    ingredients: [
      { ingredientId: '10', name: 'Banane', quantity: 2, unit: 'pièce' },
      { ingredientId: '11', name: 'Mangue', quantity: 100, unit: 'g' },
      { ingredientId: '12', name: 'Lait de coco', quantity: 150, unit: 'ml' },
      { ingredientId: '13', name: 'Granola', quantity: 30, unit: 'g' },
      { ingredientId: '14', name: 'Myrtilles', quantity: 50, unit: 'g' }
    ],
    instructions: [
      'Mixer la banane, mangue et lait de coco',
      'Verser dans un bowl',
      'Décorer avec granola et myrtilles',
      'Servir immédiatement'
    ],
    tags: ['healthy', 'vegan', 'petit-déjeuner'],
    nutritionInfo: {
      calories: 380,
      protein: 8,
      carbs: 65,
      fat: 12,
      fiber: 10
    },
    rating: 4.6,
    reviews: 89,
    createdAt: new Date('2024-02-10')
  }
];

export const useRecipes = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simulation d'un appel API
    const fetchRecipes = async () => {
      try {
        setLoading(true);
        // Simule un délai réseau
        await new Promise(resolve => setTimeout(resolve, 1000));
        setRecipes(mockRecipes);
      } catch (err) {
        setError('Erreur lors du chargement des recettes');
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  const searchRecipes = (filters: SearchFilters, userPantry?: Ingredient[]) => {
    let filteredRecipes = recipes;

    if (filters.mealType) {
      filteredRecipes = filteredRecipes.filter(recipe => recipe.mealType === filters.mealType);
    }

    if (filters.maxPrepTime) {
      filteredRecipes = filteredRecipes.filter(recipe => recipe.prepTime <= filters.maxPrepTime);
    }

    if (filters.difficulty) {
      filteredRecipes = filteredRecipes.filter(recipe => recipe.difficulty === filters.difficulty);
    }

    if (filters.dietType) {
      filteredRecipes = filteredRecipes.filter(recipe => recipe.dietType === filters.dietType);
    }

    if (filters.season) {
      filteredRecipes = filteredRecipes.filter(recipe => recipe.season === filters.season);
    }

    if (filters.availableOnly && userPantry) {
      filteredRecipes = filteredRecipes.filter(recipe => {
        return recipe.ingredients.every(recipeIngredient => {
          return userPantry.some(pantryIngredient => 
            pantryIngredient.name.toLowerCase().includes(recipeIngredient.name.toLowerCase())
          );
        });
      });
    }

    return filteredRecipes;
  };

  return {
    recipes,
    loading,
    error,
    searchRecipes
  };
};
