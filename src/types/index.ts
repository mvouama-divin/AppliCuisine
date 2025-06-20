
export interface Ingredient {
  id: string;
  name: string;
  category: 'légumes' | 'fruits' | 'viandes' | 'poissons' | 'céréales' | 'légumineuses' | 'produits_laitiers' | 'épices' | 'autres';
  quantity: number;
  unit: 'kg' | 'g' | 'l' | 'ml' | 'pièce' | 'cuillère';
  expirationDate?: Date;
  season?: 'printemps' | 'été' | 'automne' | 'hiver';
  origin?: 'local' | 'national' | 'import';
  organic: boolean;
}

export interface Recipe {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  prepTime: number; // en minutes
  cookTime: number; // en minutes
  servings: number;
  difficulty: 'facile' | 'moyen' | 'difficile';
  mealType: 'petit-déjeuner' | 'déjeuner' | 'dîner' | 'collation';
  season?: 'printemps' | 'été' | 'automne' | 'hiver';
  dietType: 'végétarien' | 'végétalien' | 'halal' | 'casher' | 'keto' | 'sans_gluten' | 'classique';
  ingredients: RecipeIngredient[];
  instructions: string[];
  tags: string[];
  nutritionInfo?: NutritionInfo;
  rating?: number;
  reviews?: number;
  createdBy?: string;
  createdAt: Date;
}

export interface RecipeIngredient {
  ingredientId: string;
  name: string;
  quantity: number;
  unit: string;
  optional?: boolean;
}

export interface NutritionInfo {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'user' | 'admin';
  pantry: Ingredient[];
  preferences: UserPreferences;
  createdAt: Date;
}

export interface UserPreferences {
  dietType: string[];
  allergies: string[];
  favoriteCategories: string[];
  maxPrepTime: number;
  skillLevel: 'débutant' | 'intermédiaire' | 'expert';
}

export interface SearchFilters {
  mealType?: string;
  maxPrepTime?: number;
  difficulty?: string;
  dietType?: string;
  season?: string;
  availableOnly?: boolean;
}
