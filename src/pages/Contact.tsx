import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useContactMessages } from '@/hooks/useContactMessages';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, MessageSquare, ChefHat } from 'lucide-react';
import { toast } from 'sonner';

const Contact = () => {
  const { addMessage } = useContactMessages();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    type: 'commentaire' as const,
    message: '',
    recipe_request: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { name, email, type, message, recipe_request } = formData;

    const result = addMessage({
      name,
      email,
      type,
      message,
      recipe_request: recipe_request || undefined,
    });

    if (result.success) {
      toast.success('Votre message a été envoyé avec succès !');
      setFormData({
        name: '',
        email: '',
        type: 'commentaire',
        message: '',
        recipe_request: ''
      });
    } else {
      toast.error("Erreur lors de l'envoi du message");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-4">
              Contactez <span className="text-orange-500">CuisineApp</span>
            </h1>
            <p className="text-gray-600">
              Laissez-nous un commentaire ou demandez une recette spécifique
            </p>
          </div>

          <Card className="bg-white shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-orange-500" />
                Formulaire de Contact
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">
                      Nom complet *
                    </label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full"
                      placeholder="Votre nom"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                      Email *
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full"
                      placeholder="votre@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="type" className="block text-sm font-medium mb-2">
                    Type de message *
                  </label>
                  <select
                    id="type"
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  >
                    <option value="commentaire">Commentaire général</option>
                    <option value="recette">Demande de recette</option>
                    <option value="suggestion">Suggestion d'amélioration</option>
                    <option value="probleme">Signaler un problème</option>
                  </select>
                </div>

                {formData.type === 'recette' && (
                  <div>
                    <label htmlFor="recipeRequest" className="block text-sm font-medium mb-2">
                      Quelle recette souhaitez-vous ?
                    </label>
                    <Input
                      id="recipeRequest"
                      name="recipe_request"
                      type="text"
                      value={formData.recipe_request}
                      onChange={handleChange}
                      className="w-full"
                      placeholder="Ex: Couscous royal, Tajine aux légumes..."
                    />
                  </div>
                )}

                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    Message *
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full"
                    placeholder="Écrivez votre message ici..."
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-orange-500 hover:bg-orange-600"
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Envoyer le message
                </Button>
              </form>
            </CardContent>
          </Card>

          <div className="mt-8 grid md:grid-cols-2 gap-6">
            <Card className="bg-orange-50 border-orange-200">
              <CardContent className="p-6 text-center">
                <ChefHat className="w-12 h-12 text-orange-500 mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Demandes de recettes</h3>
                <p className="text-sm text-gray-600">
                  Vous cherchez une recette spécifique ? Demandez-la nous et nous l'ajouterons !
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="p-6 text-center">
                <MessageSquare className="w-12 h-12 text-blue-500 mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Vos commentaires</h3>
                <p className="text-sm text-gray-600">
                  Partagez vos suggestions pour améliorer CuisineApp
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Contact;
