
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ShoppingCart, AlertCircle } from 'lucide-react';
import { Recipe, Ingredient } from '@/types';

interface MissingIngredientsDialogProps {
  recipe: Recipe | null;
  availableIngredients: Ingredient[];
  isOpen: boolean;
  onClose: () => void;
}

const MissingIngredientsDialog: React.FC<MissingIngredientsDialogProps> = ({
  recipe,
  availableIngredients,
  isOpen,
  onClose,
}) => {
  if (!recipe) return null;

  const missingIngredients = recipe.ingredients.filter(recipeIngredient =>
    !availableIngredients.some(available => 
      available.name.toLowerCase().includes(recipeIngredient.name.toLowerCase())
    )
  );

  const availableCount = recipe.ingredients.length - missingIngredients.length;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-cuisine-orange" />
            Ingrédients manquants
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold text-lg">{recipe.title}</h3>
            <p className="text-sm text-muted-foreground mt-1">
              {availableCount} sur {recipe.ingredients.length} ingrédients disponibles
            </p>
          </div>

          {missingIngredients.length > 0 ? (
            <>
              <div>
                <h4 className="font-medium mb-2 text-red-600">
                  Il vous manque {missingIngredients.length} ingrédient(s) :
                </h4>
                <div className="space-y-2">
                  {missingIngredients.map((ingredient, index) => (
                    <div key={index} className="flex justify-between items-center p-2 bg-red-50 border border-red-200 rounded">
                      <span className="font-medium text-red-800">{ingredient.name}</span>
                      <span className="text-sm text-red-600">
                        {ingredient.quantity} {ingredient.unit}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t">
                <Button className="w-full bg-cuisine-orange hover:bg-cuisine-orange-dark">
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Ajouter à ma liste de courses
                </Button>
              </div>
            </>
          ) : (
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-green-600 font-medium">
                🎉 Tous les ingrédients sont disponibles !
              </div>
              <p className="text-sm text-green-700 mt-1">
                Vous pouvez réaliser cette recette maintenant.
              </p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MissingIngredientsDialog;
