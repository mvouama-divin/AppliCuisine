
export interface Recipe {
  id: string;
  title: string;
  description: string;
  image_url?: string;
  prep_time: number; // en minutes
  cook_time: number; // en minutes
  servings: number;
  difficulty: 'facile' | 'moyen' | 'difficile';
  meal_type: 'petit-déjeuner' | 'déjeuner' | 'dîner' | 'collation';
  diet_type: 'végétarien' | 'végétalien' | 'halal' | 'casher' | 'keto' | 'sans_gluten' | 'classique';
  ingredients: RecipeIngredient[];
  instructions: string[];
  tags: string[];
  rating?: number;
  reviews?: number;
  created_at: string;
  updated_at: string;
}

export interface RecipeIngredient {
  name: string;
  quantity: number;
  unit: string;
  optional?: boolean;
}

export interface Ingredient {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  expiry_date?: string;
  category: string;
  organic?: boolean;
}

export interface SearchFilters {
  difficulty?: string;
  mealType?: string;
  maxTime?: number;
  maxPrepTime?: number;
  dietType?: string;
  season?: string;
}
