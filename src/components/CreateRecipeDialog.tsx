
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Minus, Save } from 'lucide-react';
import { Recipe, RecipeIngredient } from '@/types';

interface CreateRecipeDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (recipe: Omit<Recipe, 'id' | 'created_at' | 'updated_at'>) => Promise<any>;
}

const CreateRecipeDialog: React.FC<CreateRecipeDialogProps> = ({
  isOpen,
  onClose,
  onSave,
}) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image_url: '',
    prep_time: 0,
    cook_time: 0,
    servings: 1,
    difficulty: 'facile' as 'facile' | 'moyen' | 'difficile',
    meal_type: 'déjeuner' as 'petit-déjeuner' | 'déjeuner' | 'dîner' | 'collation',
    diet_type: 'classique' as 'végétarien' | 'végétalien' | 'halal' | 'casher' | 'keto' | 'sans_gluten' | 'classique',
    tags: '',
  });

  const [ingredients, setIngredients] = useState<RecipeIngredient[]>([
    { name: '', quantity: 0, unit: 'pièce' }
  ]);

  const [instructions, setInstructions] = useState<string[]>(['']);

  const addIngredient = () => {
    setIngredients([...ingredients, { name: '', quantity: 0, unit: 'pièce' }]);
  };

  const removeIngredient = (index: number) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  const updateIngredient = (index: number, field: keyof RecipeIngredient, value: string | number) => {
    const updated = [...ingredients];
    updated[index] = { ...updated[index], [field]: value };
    setIngredients(updated);
  };

  const addInstruction = () => {
    setInstructions([...instructions, '']);
  };

  const removeInstruction = (index: number) => {
    setInstructions(instructions.filter((_, i) => i !== index));
  };

  const updateInstruction = (index: number, value: string) => {
    const updated = [...instructions];
    updated[index] = value;
    setInstructions(updated);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const newRecipe = {
      title: formData.title,
      description: formData.description,
      image_url: formData.image_url || undefined,
      prep_time: formData.prep_time,
      cook_time: formData.cook_time,
      servings: formData.servings,
      difficulty: formData.difficulty,
      meal_type: formData.meal_type,
      diet_type: formData.diet_type,
      ingredients: ingredients.filter(ing => ing.name.trim() !== ''),
      instructions: instructions.filter(inst => inst.trim() !== ''),
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag !== ''),
    };

    const result = await onSave(newRecipe);
    if (result.success) {
      onClose();
      
      // Reset form
      setFormData({
        title: '',
        description: '',
        image_url: '',
        prep_time: 0,
        cook_time: 0,
        servings: 1,
        difficulty: 'facile',
        meal_type: 'déjeuner',
        diet_type: 'classique',
        tags: '',
      });
      setIngredients([{ name: '', quantity: 0, unit: 'pièce' }]);
      setInstructions(['']);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Créer une nouvelle recette</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Informations de base */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="title">Titre de la recette *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="image_url">URL de l'image</Label>
              <Input
                id="image_url"
                value={formData.image_url}
                onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                placeholder="https://..."
              />
            </div>
          </div>

          <div>
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
            />
          </div>

          {/* Temps et portions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="prep_time">Temps de préparation (min)</Label>
              <Input
                id="prep_time"
                type="number"
                value={formData.prep_time}
                onChange={(e) => setFormData({ ...formData, prep_time: parseInt(e.target.value) || 0 })}
              />
            </div>
            <div>
              <Label htmlFor="cook_time">Temps de cuisson (min)</Label>
              <Input
                id="cook_time"
                type="number"
                value={formData.cook_time}
                onChange={(e) => setFormData({ ...formData, cook_time: parseInt(e.target.value) || 0 })}
              />
            </div>
            <div>
              <Label htmlFor="servings">Nombre de portions</Label>
              <Input
                id="servings"
                type="number"
                value={formData.servings}
                onChange={(e) => setFormData({ ...formData, servings: parseInt(e.target.value) || 1 })}
              />
            </div>
          </div>

          {/* Sélections */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label>Difficulté</Label>
              <Select value={formData.difficulty} onValueChange={(value: any) => setFormData({ ...formData, difficulty: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="facile">Facile</SelectItem>
                  <SelectItem value="moyen">Moyen</SelectItem>
                  <SelectItem value="difficile">Difficile</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Type de repas</Label>
              <Select value={formData.meal_type} onValueChange={(value: any) => setFormData({ ...formData, meal_type: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="petit-déjeuner">Petit-déjeuner</SelectItem>
                  <SelectItem value="déjeuner">Déjeuner</SelectItem>
                  <SelectItem value="dîner">Dîner</SelectItem>
                  <SelectItem value="collation">Collation</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Type de régime</Label>
              <Select value={formData.diet_type} onValueChange={(value: any) => setFormData({ ...formData, diet_type: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="classique">Classique</SelectItem>
                  <SelectItem value="végétarien">Végétarien</SelectItem>
                  <SelectItem value="végétalien">Végétalien</SelectItem>
                  <SelectItem value="halal">Halal</SelectItem>
                  <SelectItem value="casher">Casher</SelectItem>
                  <SelectItem value="keto">Keto</SelectItem>
                  <SelectItem value="sans_gluten">Sans gluten</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="tags">Tags (séparés par des virgules)</Label>
            <Input
              id="tags"
              value={formData.tags}
              onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
              placeholder="ex: rapide, facile, économique"
            />
          </div>

          {/* Ingrédients */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <Label>Ingrédients</Label>
              <Button type="button" onClick={addIngredient} size="sm" variant="outline">
                <Plus className="w-4 h-4 mr-1" />
                Ajouter
              </Button>
            </div>
            <div className="space-y-2">
              {ingredients.map((ingredient, index) => (
                <div key={index} className="flex gap-2 items-center">
                  <Input
                    placeholder="Nom de l'ingrédient"
                    value={ingredient.name}
                    onChange={(e) => updateIngredient(index, 'name', e.target.value)}
                    className="flex-1"
                  />
                  <Input
                    type="number"
                    placeholder="Qté"
                    value={ingredient.quantity || ''}
                    onChange={(e) => updateIngredient(index, 'quantity', parseFloat(e.target.value) || 0)}
                    className="w-20"
                  />
                  <Select value={ingredient.unit} onValueChange={(value) => updateIngredient(index, 'unit', value)}>
                    <SelectTrigger className="w-24">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pièce">pièce</SelectItem>
                      <SelectItem value="kg">kg</SelectItem>
                      <SelectItem value="g">g</SelectItem>
                      <SelectItem value="l">l</SelectItem>
                      <SelectItem value="ml">ml</SelectItem>
                      <SelectItem value="cuillère">cuillère</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button
                    type="button"
                    onClick={() => removeIngredient(index)}
                    size="sm"
                    variant="ghost"
                    disabled={ingredients.length === 1}
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>

          {/* Instructions */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <Label>Instructions</Label>
              <Button type="button" onClick={addInstruction} size="sm" variant="outline">
                <Plus className="w-4 h-4 mr-1" />
                Ajouter étape
              </Button>
            </div>
            <div className="space-y-2">
              {instructions.map((instruction, index) => (
                <div key={index} className="flex gap-2 items-start">
                  <span className="flex-shrink-0 w-6 h-6 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-medium mt-2">
                    {index + 1}
                  </span>
                  <Textarea
                    placeholder={`Étape ${index + 1}`}
                    value={instruction}
                    onChange={(e) => updateInstruction(index, e.target.value)}
                    className="flex-1"
                  />
                  <Button
                    type="button"
                    onClick={() => removeInstruction(index)}
                    size="sm"
                    variant="ghost"
                    disabled={instructions.length === 1}
                    className="mt-2"
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-6 border-t">
            <Button type="button" variant="outline" onClick={onClose}>
              Annuler
            </Button>
            <Button type="submit" className="bg-green-600 hover:bg-green-700">
              <Save className="w-4 h-4 mr-2" />
              Créer la recette
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateRecipeDialog;
