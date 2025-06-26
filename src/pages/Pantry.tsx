
import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import AddIngredientDialog from '@/components/AddIngredientDialog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Plus, Package, Calendar, MapPin, Trash2, Edit } from 'lucide-react';
import { Ingredient } from '@/types';

const Pantry = () => {
  const { toast } = useToast();
  const [showAddIngredient, setShowAddIngredient] = useState(false);
  
  // Mock data - sera remplacé par les vraies données
  const [pantryItems, setPantryItems] = useState<Ingredient[]>([
    { id: '1', name: 'Tomates', category: 'légumes', quantity: 3, unit: 'pièce', expiryDate: new Date('2024-06-25'), organic: true },
    { id: '2', name: 'Riz basmati', category: 'céréales', quantity: 1, unit: 'kg', expiryDate: new Date('2024-12-01'), organic: false },
    { id: '3', name: 'Saumon', category: 'poissons', quantity: 400, unit: 'g', expiryDate: new Date('2024-06-22'), organic: false },
    { id: '4', name: 'Huile d\'olive', category: 'condiments', quantity: 500, unit: 'ml', expiryDate: new Date('2025-01-15'), organic: true },
  ]);

  const categories = [...new Set(pantryItems.map(item => item.category))];

  const handleAddIngredient = (newIngredient: Ingredient) => {
    setPantryItems(prev => [...prev, newIngredient]);
    toast({
      title: "Ingrédient ajouté !",
      description: `${newIngredient.name} a été ajouté à votre garde-manger.`,
    });
  };

  const handleDeleteIngredient = (id: string) => {
    setPantryItems(prev => prev.filter(item => item.id !== id));
    toast({
      title: "Ingrédient supprimé",
      description: "L'ingrédient a été retiré de votre garde-manger.",
    });
  };

  return (
    <div className="min-h-screen bg-cuisine-cream">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">
              Mon <span className="gradient-text">garde-manger</span>
            </h1>
            <p className="text-muted-foreground">
              Gérez vos ingrédients pour des recommandations personnalisées
            </p>
          </div>
          <Button 
            className="bg-cuisine-green hover:bg-cuisine-green-dark"
            onClick={() => setShowAddIngredient(true)}
          >
            <Plus className="w-4 h-4 mr-2" />
            Ajouter un ingrédient
          </Button>
        </div>

        {/* Statistiques */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="text-center border-0 shadow-sm bg-white">
            <CardContent className="p-4">
              <Package className="w-8 h-8 mx-auto mb-2 text-cuisine-orange" />
              <div className="text-2xl font-bold">{pantryItems.length}</div>
              <div className="text-sm text-muted-foreground">Ingrédients</div>
            </CardContent>
          </Card>
          <Card className="text-center border-0 shadow-sm bg-white">
            <CardContent className="p-4">
              <Calendar className="w-8 h-8 mx-auto mb-2 text-red-500" />
              <div className="text-2xl font-bold">
                {pantryItems.filter(item => item.expiryDate && new Date(item.expiryDate) < new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)).length}
              </div>
              <div className="text-sm text-muted-foreground">À consommer</div>
            </CardContent>
          </Card>
          <Card className="text-center border-0 shadow-sm bg-white">
            <CardContent className="p-4">
              <MapPin className="w-8 h-8 mx-auto mb-2 text-cuisine-green" />
              <div className="text-2xl font-bold">
                {pantryItems.filter(item => item.organic).length}
              </div>
              <div className="text-sm text-muted-foreground">Bio</div>
            </CardContent>
          </Card>
          <Card className="text-center border-0 shadow-sm bg-white">
            <CardContent className="p-4">
              <Package className="w-8 h-8 mx-auto mb-2 text-blue-500" />
              <div className="text-2xl font-bold">{categories.length}</div>
              <div className="text-sm text-muted-foreground">Catégories</div>
            </CardContent>
          </Card>
        </div>

        {/* Liste par catégories */}
        {categories.map(category => (
          <Card key={category} className="mb-6 border-0 shadow-sm bg-white">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="capitalize">{category}</span>
                <Badge variant="secondary">
                  {pantryItems.filter(item => item.category === category).length} ingrédient(s)
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {pantryItems
                  .filter(item => item.category === category)
                  .map(item => {
                    const isExpiringSoon = item.expiryDate && new Date(item.expiryDate) < new Date(Date.now() + 3 * 24 * 60 * 60 * 1000);
                    
                    return (
                      <div
                        key={item.id}
                        className="p-4 border rounded-lg hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-medium">{item.name}</h4>
                          <div className="flex items-center gap-2">
                            {item.organic && (
                              <Badge className="bg-cuisine-green text-white text-xs">Bio</Badge>
                            )}
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleDeleteIngredient(item.id)}
                              className="h-6 w-6 p-0 text-red-500 hover:text-red-700 hover:bg-red-50"
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          {item.quantity} {item.unit}
                        </p>
                        {item.expiryDate && (
                          <div className="flex items-center justify-between">
                            <span className={`text-xs ${isExpiringSoon ? 'text-red-500 font-medium' : 'text-muted-foreground'}`}>
                              Expire le {new Date(item.expiryDate).toLocaleDateString()}
                            </span>
                            {isExpiringSoon && (
                              <Badge variant="destructive" className="text-xs">
                                Urgent
                              </Badge>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
              </div>
            </CardContent>
          </Card>
        ))}

        {/* Message informatif */}
        <Card className="bg-gradient-cuisine text-white border-0 text-center p-8">
          <CardContent>
            <h3 className="text-xl font-semibold mb-2">
              Connectez-vous à Supabase
            </h3>
            <p className="mb-4">
              Pour sauvegarder vos ingrédients et synchroniser votre garde-manger sur tous vos appareils.
            </p>
            <Button variant="secondary" className="bg-white text-cuisine-orange hover:bg-cuisine-cream">
              Intégrer Supabase
            </Button>
          </CardContent>
        </Card>
      </main>

      <AddIngredientDialog
        isOpen={showAddIngredient}
        onClose={() => setShowAddIngredient(false)}
        onSave={handleAddIngredient}
      />
    </div>
  );
};

export default Pantry;
