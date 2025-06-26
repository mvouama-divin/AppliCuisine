
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Clock, Users, ChefHat, Star } from 'lucide-react';
import { Recipe } from '@/types';

interface RecipeDetailDialogProps {
  recipe: Recipe | null;
  isOpen: boolean;
  onClose: () => void;
}

const RecipeDetailDialog: React.FC<RecipeDetailDialogProps> = ({
  recipe,
  isOpen,
  onClose,
}) => {
  if (!recipe) return null;

  const totalTime = recipe.prepTime + recipe.cookTime;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{recipe.title}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Image */}
          <div className="w-full h-48 rounded-lg overflow-hidden">
            <img
              src={recipe.imageUrl || 'https://images.unsplash.com/photo-1546548970-71785318a17b?w=500'}
              alt={recipe.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Description */}
          <p className="text-muted-foreground">{recipe.description}</p>

          {/* Informations principales */}
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-1">
              <Clock className="w-4 h-4" />
              <span>{totalTime}min ({recipe.prepTime}min prep + {recipe.cookTime}min cuisson)</span>
            </div>
            <div className="flex items-center space-x-1">
              <Users className="w-4 h-4" />
              <span>{recipe.servings} personnes</span>
            </div>
            <div className="flex items-center space-x-1">
              <ChefHat className="w-4 h-4" />
              <span className="capitalize">{recipe.difficulty}</span>
            </div>
            {recipe.rating && (
              <div className="flex items-center space-x-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span>{recipe.rating}</span>
              </div>
            )}
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            <Badge className="bg-cuisine-green text-white">{recipe.mealType}</Badge>
            <Badge className="bg-cuisine-orange text-white">{recipe.dietType}</Badge>
            <Badge variant="secondary">{recipe.difficulty}</Badge>
            {recipe.season && <Badge variant="outline">{recipe.season}</Badge>}
            {recipe.tags.map(tag => (
              <Badge key={tag} variant="outline">{tag}</Badge>
            ))}
          </div>

          {/* Ingrédients */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Ingrédients</h3>
            <div className="grid gap-2">
              {recipe.ingredients.map((ingredient, index) => (
                <div key={index} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                  <span className="font-medium">{ingredient.name}</span>
                  <span className="text-muted-foreground">
                    {ingredient.quantity} {ingredient.unit}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Instructions */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Instructions</h3>
            <ol className="space-y-3">
              {recipe.instructions.map((instruction, index) => (
                <li key={index} className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-cuisine-orange text-white rounded-full flex items-center justify-center text-sm font-medium">
                    {index + 1}
                  </span>
                  <span>{instruction}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* Informations nutritionnelles */}
          {recipe.nutritionInfo && (
            <div>
              <h3 className="text-lg font-semibold mb-3">Informations nutritionnelles</h3>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <div className="text-center p-3 bg-gray-50 rounded">
                  <div className="font-bold text-cuisine-orange">{recipe.nutritionInfo.calories}</div>
                  <div className="text-sm text-muted-foreground">Calories</div>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded">
                  <div className="font-bold text-cuisine-green">{recipe.nutritionInfo.protein}g</div>
                  <div className="text-sm text-muted-foreground">Protéines</div>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded">
                  <div className="font-bold text-blue-600">{recipe.nutritionInfo.carbs}g</div>
                  <div className="text-sm text-muted-foreground">Glucides</div>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded">
                  <div className="font-bold text-purple-600">{recipe.nutritionInfo.fat}g</div>
                  <div className="text-sm text-muted-foreground">Lipides</div>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded">
                  <div className="font-bold text-green-600">{recipe.nutritionInfo.fiber}g</div>
                  <div className="text-sm text-muted-foreground">Fibres</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RecipeDetailDialog;
