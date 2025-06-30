
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Ingredient } from '@/types';

interface AddIngredientDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (ingredient: Ingredient) => void;
}

const categories = [
  'Légumes',
  'Fruits',
  'Viandes',
  'Poissons',
  'Céréales',
  'Légumineuses',
  'Produits laitiers',
  'Épices',
  'Condiments',
  'Autres'
];

const units = [
  'g',
  'kg',
  'ml',
  'l',
  'pièce',
  'cuillère',
  'tasse',
  'sachet',
  'boîte'
];

const AddIngredientDialog: React.FC<AddIngredientDialogProps> = ({
  isOpen,
  onClose,
  onSave,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    quantity: '',
    unit: '',
    expiry: '',
    organic: false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.category || !formData.quantity || !formData.unit) {
      return;
    }

    const newIngredient: Ingredient = {
      id: Date.now().toString(),
      name: formData.name,
      category: formData.category.toLowerCase(),
      quantity: parseFloat(formData.quantity),
      unit: formData.unit,
      organic: formData.organic,
      expiry_date: formData.expiry || undefined
    };

    onSave(newIngredient);
    
    // Reset form
    setFormData({
      name: '',
      category: '',
      quantity: '',
      unit: '',
      expiry: '',
      organic: false
    });
    
    onClose();
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Ajouter un ingrédient</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Nom de l'ingrédient *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              placeholder="Ex: Tomate"
              required
            />
          </div>

          <div>
            <Label htmlFor="category">Catégorie *</Label>
            <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner une catégorie" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="quantity">Quantité *</Label>
              <Input
                id="quantity"
                type="number"
                step="0.1"
                value={formData.quantity}
                onChange={(e) => handleInputChange('quantity', e.target.value)}
                placeholder="Ex: 3"
                required
              />
            </div>
            <div>
              <Label htmlFor="unit">Unité *</Label>
              <Select value={formData.unit} onValueChange={(value) => handleInputChange('unit', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Unité" />
                </SelectTrigger>
                <SelectContent>
                  {units.map(unit => (
                    <SelectItem key={unit} value={unit}>
                      {unit}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="expiry">Date d'expiration (optionnel)</Label>
            <Input
              id="expiry"
              type="date"
              value={formData.expiry}
              onChange={(e) => handleInputChange('expiry', e.target.value)}
            />
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="organic"
              checked={formData.organic}
              onCheckedChange={(checked) => handleInputChange('organic', checked)}
            />
            <Label htmlFor="organic">Produit biologique</Label>
          </div>

          <div className="flex gap-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Annuler
            </Button>
            <Button type="submit" className="flex-1 bg-cuisine-green hover:bg-cuisine-green-dark">
              Ajouter
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddIngredientDialog;
