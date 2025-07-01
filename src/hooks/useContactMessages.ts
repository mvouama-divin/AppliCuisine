
import { useState, useEffect } from 'react';

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  type: 'commentaire' | 'recette' | 'suggestion' | 'probleme';
  message: string;
  recipe_request?: string;
  created_at: string;
  status: 'nouveau' | 'lu' | 'traité';
}

export const useContactMessages = () => {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);

  // Données simulées pour les messages de contact
  const mockMessages: ContactMessage[] = [
    {
      id: '1',
      name: 'Marie Dupont',
      email: 'marie@example.com',
      type: 'recette',
      message: 'J\'aimerais avoir une recette de couscous royal authentique.',
      recipe_request: 'Couscous royal',
      created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      status: 'nouveau'
    },
    {
      id: '2',
      name: 'Ahmed Ben Ali',
      email: 'ahmed@example.com',
      type: 'commentaire',
      message: 'Excellente application ! Les recettes sont très détaillées et faciles à suivre.',
      created_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      status: 'lu'
    },
    {
      id: '3',
      name: 'Sophie Martin',
      email: 'sophie@example.com',
      type: 'suggestion',
      message: 'Pourriez-vous ajouter une fonction pour calculer automatiquement les quantités selon le nombre de personnes ?',
      created_at: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
      status: 'nouveau'
    },
    {
      id: '4',
      name: 'Karim Alami',
      email: 'karim@example.com',
      type: 'recette',
      message: 'Serait-il possible d\'avoir une recette de pastilla au poisson ?',
      recipe_request: 'Pastilla au poisson',
      created_at: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
      status: 'traité'
    }
  ];

  useEffect(() => {
    // Simulation du chargement
    setTimeout(() => {
      const savedMessages = localStorage.getItem('contactMessages');
      if (savedMessages) {
        setMessages(JSON.parse(savedMessages));
      } else {
        setMessages(mockMessages);
        localStorage.setItem('contactMessages', JSON.stringify(mockMessages));
      }
      setLoading(false);
    }, 500);
  }, []);

  const addMessage = (messageData: Omit<ContactMessage, 'id' | 'created_at' | 'status'>) => {
    const newMessage: ContactMessage = {
      ...messageData,
      id: Date.now().toString(),
      created_at: new Date().toISOString(),
      status: 'nouveau'
    };
    
    const updatedMessages = [newMessage, ...messages];
    setMessages(updatedMessages);
    localStorage.setItem('contactMessages', JSON.stringify(updatedMessages));
    
    return { success: true, data: newMessage };
  };

  const updateMessageStatus = (id: string, status: ContactMessage['status']) => {
    const updatedMessages = messages.map(msg => 
      msg.id === id ? { ...msg, status } : msg
    );
    setMessages(updatedMessages);
    localStorage.setItem('contactMessages', JSON.stringify(updatedMessages));
    
    return { success: true };
  };

  const deleteMessage = (id: string) => {
    const updatedMessages = messages.filter(msg => msg.id !== id);
    setMessages(updatedMessages);
    localStorage.setItem('contactMessages', JSON.stringify(updatedMessages));
    
    return { success: true };
  };

  return {
    messages,
    loading,
    addMessage,
    updateMessageStatus,
    deleteMessage
  };
};
