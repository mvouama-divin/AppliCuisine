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
  },
  {
    id: '4',
    title: 'Tanjia Marrakchia',
    description: 'Spécialité de Marrakech, cuite traditionnellement dans les cendres d\'un four à bois.',
    imageUrl: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?w=500',
    prepTime: 30,
    cookTime: 300,
    servings: 6,
    difficulty: 'difficile',
    mealType: 'déjeuner',
    season: 'automne',
    dietType: 'halal',
    ingredients: [
      { ingredientId: '15', name: 'Viande de bœuf ou agneau', quantity: 1000, unit: 'g' },
      { ingredientId: '16', name: 'Ail', quantity: 6, unit: 'pièce' },
      { ingredientId: '17', name: 'Cumin', quantity: 1, unit: 'cuillère' },
      { ingredientId: '18', name: 'Gingembre', quantity: 0.5, unit: 'cuillère' },
      { ingredientId: '19', name: 'Curcuma', quantity: 0.5, unit: 'cuillère' },
      { ingredientId: '20', name: 'Citron confit', quantity: 1, unit: 'pièce' },
      { ingredientId: '21', name: 'Huile d\'olive', quantity: 200, unit: 'ml' }
    ],
    instructions: [
      'Mettre la viande dans une kedra ou une marmite',
      'Ajouter les épices, l\'ail écrasé, le citron confit en morceaux, l\'huile et le smen',
      'Ajouter un peu d\'eau (environ 1 verre)',
      'Fermer la tanjia avec du papier sulfurisé + ficelle',
      'Cuire dans les braises ou au four pendant 4 à 5 heures à basse température'
    ],
    tags: ['marocain', 'traditionnel', 'festif'],
    nutritionInfo: {
      calories: 450,
      protein: 40,
      carbs: 8,
      fat: 28,
      fiber: 2
    },
    rating: 4.7,
    reviews: 95,
    createdAt: new Date('2024-03-01')
  },
  {
    id: '5',
    title: 'Tajine Marocain à la viande et légumes',
    description: 'Tajine traditionnel avec viande tendre et légumes de saison.',
    imageUrl: 'https://images.unsplash.com/photo-1539136788836-5699e78bfc75?w=500',
    prepTime: 20,
    cookTime: 80,
    servings: 4,
    difficulty: 'moyen',
    mealType: 'déjeuner',
    season: 'automne',
    dietType: 'halal',
    ingredients: [
      { ingredientId: '22', name: 'Viande bœuf ou agneau', quantity: 500, unit: 'g' },
      { ingredientId: '23', name: 'Oignon', quantity: 2, unit: 'pièce' },
      { ingredientId: '24', name: 'Carotte', quantity: 2, unit: 'pièce' },
      { ingredientId: '25', name: 'Pomme de terre', quantity: 2, unit: 'pièce' },
      { ingredientId: '26', name: 'Tomate', quantity: 1, unit: 'pièce' },
      { ingredientId: '27', name: 'Courgette', quantity: 1, unit: 'pièce' },
      { ingredientId: '28', name: 'Persil', quantity: 1, unit: 'cuillère' },
      { ingredientId: '29', name: 'Coriandre', quantity: 1, unit: 'cuillère' }
    ],
    instructions: [
      'Dans un tajine, faire revenir la viande avec l\'oignon, l\'huile, et les épices',
      'Ajouter un peu d\'eau et laisser mijoter 20 minutes',
      'Ajouter les légumes en les arrangeant joliment',
      'Couvrir et laisser cuire à feu doux pendant environ 1 heure'
    ],
    tags: ['marocain', 'traditionnel', 'légumes'],
    nutritionInfo: {
      calories: 380,
      protein: 32,
      carbs: 25,
      fat: 18,
      fiber: 6
    },
    rating: 4.6,
    reviews: 142,
    createdAt: new Date('2024-03-05')
  },
  {
    id: '6',
    title: 'Couscous Marocain au 7 légumes',
    description: 'Couscous traditionnel avec viande et sept légumes de saison.',
    imageUrl: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=500',
    prepTime: 45,
    cookTime: 90,
    servings: 8,
    difficulty: 'difficile',
    mealType: 'déjeuner',
    season: 'automne',
    dietType: 'halal',
    ingredients: [
      { ingredientId: '30', name: 'Semoule de couscous', quantity: 500, unit: 'g' },
      { ingredientId: '31', name: 'Viande bœuf agneau ou poulet', quantity: 800, unit: 'g' },
      { ingredientId: '32', name: 'Carotte', quantity: 2, unit: 'pièce' },
      { ingredientId: '33', name: 'Courgette', quantity: 2, unit: 'pièce' },
      { ingredientId: '34', name: 'Navet', quantity: 2, unit: 'pièce' },
      { ingredientId: '35', name: 'Courge', quantity: 300, unit: 'g' },
      { ingredientId: '36', name: 'Pois chiches', quantity: 200, unit: 'g' },
      { ingredientId: '37', name: 'Oignon', quantity: 1, unit: 'pièce' }
    ],
    instructions: [
      'Cuire la viande avec l\'oignon et les épices dans une grande marmite',
      'Ajouter les pois chiches et un peu d\'eau, puis les légumes selon leur temps de cuisson',
      'Cuire la semoule à la vapeur 2 à 3 fois (dans un couscoussier) avec un peu d\'huile et d\'eau salée',
      'Servir la semoule en dôme avec viande et légumes au centre, sauce par-dessus'
    ],
    tags: ['marocain', 'traditionnel', 'festif'],
    nutritionInfo: {
      calories: 420,
      protein: 28,
      carbs: 55,
      fat: 12,
      fiber: 8
    },
    rating: 4.8,
    reviews: 287,
    createdAt: new Date('2024-03-10')
  },
  {
    id: '7',
    title: 'Harira Marocaine',
    description: 'Soupe traditionnelle marocaine, parfaite pour rompre le jeûne.',
    imageUrl: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=500',
    prepTime: 20,
    cookTime: 60,
    servings: 6,
    difficulty: 'moyen',
    mealType: 'dîner',
    season: 'hiver',
    dietType: 'halal',
    ingredients: [
      { ingredientId: '38', name: 'Viande agneau ou bœuf', quantity: 250, unit: 'g' },
      { ingredientId: '39', name: 'Oignon', quantity: 1, unit: 'pièce' },
      { ingredientId: '40', name: 'Tomate', quantity: 2, unit: 'pièce' },
      { ingredientId: '41', name: 'Pois chiches', quantity: 100, unit: 'g' },
      { ingredientId: '42', name: 'Lentilles', quantity: 100, unit: 'g' },
      { ingredientId: '43', name: 'Concentré de tomate', quantity: 1, unit: 'cuillère' },
      { ingredientId: '44', name: 'Coriandre', quantity: 1, unit: 'cuillère' },
      { ingredientId: '45', name: 'Persil', quantity: 1, unit: 'cuillère' },
      { ingredientId: '46', name: 'Vermicelles', quantity: 50, unit: 'g' }
    ],
    instructions: [
      'Dans une marmite, faire revenir la viande avec l\'oignon, les tomates, les pois chiches, les lentilles, les herbes et les épices',
      'Ajouter l\'eau et laisser cuire pendant 30 à 40 minutes',
      'Ajouter la tomate concentrée et les vermicelles, laisser cuire encore quelques minutes',
      'Épaissir la soupe avec le mélange farine-eau en le versant doucement tout en remuant',
      'Laisser mijoter encore 10 minutes. Servir chaud avec du citron et des dattes'
    ],
    tags: ['marocain', 'soupe', 'traditionnel'],
    nutritionInfo: {
      calories: 280,
      protein: 18,
      carbs: 35,
      fat: 8,
      fiber: 12
    },
    rating: 4.9,
    reviews: 324,
    createdAt: new Date('2024-03-15')
  },
  {
    id: '8',
    title: 'Pastilla au Poulet (Bastila)',
    description: 'Feuilleté sucré-salé traditionnel marocain avec poulet et amandes.',
    imageUrl: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=500',
    prepTime: 60,
    cookTime: 45,
    servings: 8,
    difficulty: 'difficile',
    mealType: 'dîner',
    season: 'printemps',
    dietType: 'halal',
    ingredients: [
      { ingredientId: '47', name: 'Poulet entier', quantity: 1, unit: 'pièce' },
      { ingredientId: '48', name: 'Oignon', quantity: 4, unit: 'pièce' },
      { ingredientId: '49', name: 'Œufs', quantity: 6, unit: 'pièce' },
      { ingredientId: '50', name: 'Beurre', quantity: 100, unit: 'g' },
      { ingredientId: '51', name: 'Amandes mondées', quantity: 100, unit: 'g' },
      { ingredientId: '52', name: 'Sucre glace', quantity: 3, unit: 'cuillère' },
      { ingredientId: '53', name: 'Feuilles de brick', quantity: 8, unit: 'pièce' },
      { ingredientId: '54', name: 'Cannelle', quantity: 1, unit: 'cuillère' }
    ],
    instructions: [
      'Dans une marmite, faire cuire le poulet avec les oignons, les épices, un peu de beurre et la coriandre',
      'Une fois cuit, émietter le poulet. Réduire la sauce et y faire cuire les œufs en remuant',
      'Préparer un mélange d\'amandes concassées + sucre glace + cannelle',
      'Dans un moule rond, disposer les feuilles de brick, ajouter une couche de poulet, une de sauce aux œufs, puis d\'amandes',
      'Refermer les feuilles, badigeonner de beurre fondu, et mettre au four à 180°C jusqu\'à ce que ce soit doré',
      'Saupoudrer de sucre glace et cannelle avant de servir'
    ],
    tags: ['marocain', 'festif', 'sucré-salé'],
    nutritionInfo: {
      calories: 520,
      protein: 35,
      carbs: 28,
      fat: 32,
      fiber: 3
    },
    rating: 4.7,
    reviews: 156,
    createdAt: new Date('2024-03-20')
  },
  {
    id: '9',
    title: 'Zaalouk - Salade d\'aubergines',
    description: 'Salade d\'aubergines à la tomate, un accompagnement marocain traditionnel.',
    imageUrl: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=500',
    prepTime: 15,
    cookTime: 25,
    servings: 4,
    difficulty: 'facile',
    mealType: 'déjeuner',
    season: 'été',
    dietType: 'végétarien',
    ingredients: [
      { ingredientId: '55', name: 'Aubergine', quantity: 2, unit: 'pièce' },
      { ingredientId: '56', name: 'Tomate', quantity: 3, unit: 'pièce' },
      { ingredientId: '57', name: 'Ail', quantity: 3, unit: 'pièce' },
      { ingredientId: '58', name: 'Paprika', quantity: 1, unit: 'cuillère' },
      { ingredientId: '59', name: 'Cumin', quantity: 0.5, unit: 'cuillère' },
      { ingredientId: '60', name: 'Huile d\'olive', quantity: 4, unit: 'cuillère' },
      { ingredientId: '61', name: 'Coriandre', quantity: 1, unit: 'cuillère' },
      { ingredientId: '62', name: 'Persil', quantity: 1, unit: 'cuillère' }
    ],
    instructions: [
      'Éplucher les aubergines en laissant un peu de peau, les couper en dés, et les faire cuire à la vapeur ou dans l\'eau salée. Égoutter',
      'Dans une poêle, faire revenir les tomates avec ail, huile et épices',
      'Ajouter les aubergines, bien écraser à la fourchette',
      'Laisser mijoter jusqu\'à évaporation de l\'eau',
      'Ajouter les herbes et un peu de citron. Servir tiède ou froid avec du pain'
    ],
    tags: ['marocain', 'végétarien', 'salade'],
    nutritionInfo: {
      calories: 120,
      protein: 3,
      carbs: 15,
      fat: 8,
      fiber: 6
    },
    rating: 4.4,
    reviews: 89,
    createdAt: new Date('2024-03-25')
  },
  {
    id: '10',
    title: 'Taktouka - Poivrons et tomates',
    description: 'Salade cuite de poivrons et tomates, un classique de la cuisine marocaine.',
    imageUrl: 'https://images.unsplash.com/photo-1608197273172-86b7b2b07ba3?w=500',
    prepTime: 10,
    cookTime: 20,
    servings: 4,
    difficulty: 'facile',
    mealType: 'déjeuner',
    season: 'été',
    dietType: 'végétarien',
    ingredients: [
      { ingredientId: '63', name: 'Poivron', quantity: 2, unit: 'pièce' },
      { ingredientId: '64', name: 'Tomate', quantity: 3, unit: 'pièce' },
      { ingredientId: '65', name: 'Ail', quantity: 2, unit: 'pièce' },
      { ingredientId: '66', name: 'Paprika', quantity: 1, unit: 'cuillère' },
      { ingredientId: '67', name: 'Cumin', quantity: 0.5, unit: 'cuillère' },
      { ingredientId: '68', name: 'Huile d\'olive', quantity: 3, unit: 'cuillère' },
      { ingredientId: '69', name: 'Persil', quantity: 1, unit: 'cuillère' },
      { ingredientId: '70', name: 'Coriandre', quantity: 1, unit: 'cuillère' }
    ],
    instructions: [
      'Couper les poivrons en petits morceaux',
      'Faire chauffer l\'huile dans une poêle, ajouter ail et tomates',
      'Ajouter les poivrons, épices, herbes et faire revenir jusqu\'à ce que la sauce épaississe',
      'Servir froid ou tiède'
    ],
    tags: ['marocain', 'végétarien', 'salade'],
    nutritionInfo: {
      calories: 95,
      protein: 2,
      carbs: 12,
      fat: 6,
      fiber: 4
    },
    rating: 4.3,
    reviews: 67,
    createdAt: new Date('2024-03-28')
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
