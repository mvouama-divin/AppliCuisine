
// Représente un ingrédient utilisé dans une recette
export interface RecipeIngredient {
  name: string;
  quantity: number;
  unit: string;
  optional?: boolean;
}

// Représente une recette complète
export interface Recipe {
  id: string;
  title: string;
  description: string;
  image_url?: string;
  prep_time: number; // minutes
  cook_time: number; // minutes
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

// Représente un ingrédient stocké dans le garde-manger
export interface Ingredient {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  expiry_date: string;
  category: string;
  organic: boolean;
}

// Types pour les filtres de recherche
export interface SearchFilters {
  mealType?: string;
  difficulty?: string;
  maxPrepTime?: number;
  dietType?: string;
  season?: string;
}

// Types pour l'authentification utilisateur
export interface User {
  id: string;
  email: string;
  name: string;
  created_at: string;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string, name: string) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
}
