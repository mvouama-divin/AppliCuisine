
import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Mail, MessageSquare, ChefHat, Lightbulb, AlertTriangle } from 'lucide-react';
import { useContactMessages } from '@/hooks/useContactMessages';
import { toast } from 'sonner';

const Contact = () => {
  const { addMessage } = useContactMessages();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    type: '',
    message: '',
    recipe_request: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.type || !formData.message) {
      toast.error('Veuillez remplir tous les champs obligatoires');
      return;
    }

    const messageData = {
      name: formData.name,
      email: formData.email,
      type: formData.type as 'commentaire' | 'recette' | 'suggestion' | 'probleme',
      message: formData.message,
      ...(formData.type === 'recette' && formData.recipe_request && {
        recipe_request: formData.recipe_request
      })
    };

    const result = addMessage(messageData);
    if (result.success) {
      toast.success('Votre message a été envoyé avec succès !');
      setFormData({
        name: '',
        email: '',
        type: '',
        message: '',
        recipe_request: ''
      });
    } else {
      toast.error('Erreur lors de l\'envoi du message');
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'recette': return <ChefHat className="w-5 h-5" />;
      case 'suggestion': return <Lightbulb className="w-5 h-5" />;
      case 'probleme': return <AlertTriangle className="w-5 h-5" />;
      default: return <MessageSquare className="w-5 h-5" />;
    }
  };

  return (
    <div className="min-h-screen bg-cuisine-cream">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4">
            Contactez-<span className="gradient-text">nous</span>
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Nous sommes là pour vous aider ! Partagez vos commentaires, demandez une recette spécifique ou signalez un problème.
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="w-5 h-5 text-orange-500" />
                Envoyer un message
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Nom complet *
                    </label>
                    <Input
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Votre nom"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Email *
                    </label>
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="votre@email.com"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Type de message *
                  </label>
                  <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choisissez le type de votre message" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="commentaire">
                        <div className="flex items-center gap-2">
                          <MessageSquare className="w-4 h-4" />
                          Commentaire général
                        </div>
                      </SelectItem>
                      <SelectItem value="recette">
                        <div className="flex items-center gap-2">
                          <ChefHat className="w-4 h-4" />
                          Demande de recette
                        </div>
                      </SelectItem>
                      <SelectItem value="suggestion">
                        <div className="flex items-center gap-2">
                          <Lightbulb className="w-4 h-4" />
                          Suggestion d'amélioration
                        </div>
                      </SelectItem>
                      <SelectItem value="probleme">
                        <div className="flex items-center gap-2">
                          <AlertTriangle className="w-4 h-4" />
                          Signaler un problème
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {formData.type === 'recette' && (
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Quelle recette souhaitez-vous ?
                    </label>
                    <Input
                      value={formData.recipe_request}
                      onChange={(e) => setFormData({ ...formData, recipe_request: e.target.value })}
                      placeholder="Ex: Couscous royal, Tajine d'agneau..."
                    />
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Message *
                  </label>
                  <Textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Décrivez votre demande en détail..."
                    rows={5}
                    required
                  />
                </div>

                <Button type="submit" className="w-full bg-orange-500 hover:bg-orange-600">
                  <Mail className="w-4 h-4 mr-2" />
                  Envoyer le message
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;
