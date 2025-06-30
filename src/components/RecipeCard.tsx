
import React from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, Users, Star, ChefHat, Heart, Eye, AlertCircle } from 'lucide-react';
import { Recipe } from '@/types';

interface RecipeCardProps {
  recipe: Recipe;
  onSelect?: (recipe: Recipe) => void;
  onViewRecipe?: (recipe: Recipe) => void;
  onViewMissingIngredients?: (recipe: Recipe) => void;
  availableIngredients?: string[];
}

const RecipeCard: React.FC<RecipeCardProps> = ({ 
  recipe, 
  onSelect, 
  onViewRecipe,
  onViewMissingIngredients,
  availableIngredients = [] 
}) => {
  const totalTime = recipe.prep_time + recipe.cook_time;
  
  const availableIngredientsCount = recipe.ingredients.filter(ingredient =>
    availableIngredients.some(available => 
      available.toLowerCase().includes(ingredient.name.toLowerCase())
    )
  ).length;

  const canMakeRecipe = availableIngredientsCount === recipe.ingredients.length;
  const missingIngredients = recipe.ingredients.length - availableIngredientsCount;

  return (
    <Card className="group recipe-card-hover overflow-hidden bg-white border-0 shadow-md">
      {/* Image */}
      <div className="relative overflow-hidden">
        <img
          src={recipe.image_url || 'https://images.unsplash.com/photo-1546548970-71785318a17b?w=500'}
          alt={recipe.title}
          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
        />
        
        {/* Badges overlay */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          <Badge className={`${canMakeRecipe ? 'bg-green-600' : 'bg-orange-500'} text-white`}>
            {canMakeRecipe ? 'Réalisable' : `${missingIngredients} ingrédient(s) manquant(s)`}
          </Badge>
          {recipe.difficulty && (
            <Badge variant="secondary" className="bg-white/90 text-orange-600">
              {recipe.difficulty}
            </Badge>
          )}
        </div>

        {/* Favorite button */}
        <Button
          size="sm"
          variant="ghost"
          className="absolute top-3 right-3 bg-white/90 hover:bg-white w-9 h-9 p-0 rounded-full"
        >
          <Heart className="w-4 h-4" />
        </Button>
      </div>

      {/* Content */}
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-semibold text-lg text-foreground group-hover:text-orange-500 transition-colors line-clamp-2">
            {recipe.title}
          </h3>
          {recipe.rating && (
            <div className="flex items-center space-x-1 ml-2">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-medium">{recipe.rating}</span>
            </div>
          )}
        </div>

        <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
          {recipe.description}
        </p>

        {/* Informations */}
        <div className="flex items-center justify-between text-sm text-muted-foreground mb-3">
          <div className="flex items-center space-x-1">
            <Clock className="w-4 h-4" />
            <span>{totalTime}min</span>
          </div>
          <div className="flex items-center space-x-1">
            <Users className="w-4 h-4" />
            <span>{recipe.servings} pers.</span>
          </div>
          <div className="flex items-center space-x-1">
            <ChefHat className="w-4 h-4" />
            <span>{recipe.meal_type}</span>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-3">
          {recipe.tags.slice(0, 3).map(tag => (
            <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
              {tag}
            </span>
          ))}
          {recipe.tags.length > 3 && (
            <span className="text-xs text-muted-foreground">
              +{recipe.tags.length - 3} autres
            </span>
          )}
        </div>
      </CardContent>

      {/* Footer */}
      <CardFooter className="p-4 pt-0 space-y-2">
        <div className="flex gap-2 w-full">
          <Button
            onClick={() => onViewRecipe?.(recipe)}
            variant="outline"
            size="sm"
            className="flex-1"
          >
            <Eye className="w-4 h-4 mr-1" />
            Voir la recette
          </Button>
          
          {!canMakeRecipe && (
            <Button
              onClick={() => onViewMissingIngredients?.(recipe)}
              variant="outline"
              size="sm"
              className="flex-1 text-orange-500 border-orange-500 hover:bg-orange-500 hover:text-white"
            >
              <AlertCircle className="w-4 h-4 mr-1" />
              Manquants
            </Button>
          )}
        </div>
        
        <Button
          onClick={() => onSelect?.(recipe)}
          className={`w-full transition-all duration-200 ${
            canMakeRecipe
              ? 'bg-green-600 hover:bg-green-700 text-white'
              : 'bg-orange-500 hover:bg-orange-600 text-white'
          }`}
        >
          {canMakeRecipe ? 'Cuisiner maintenant' : 'Voir les détails'}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default RecipeCard;
