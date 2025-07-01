
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

  useEffect(() => {
    // Charger les vrais messages depuis localStorage
    setTimeout(() => {
      const savedMessages = localStorage.getItem('contactMessages');
      if (savedMessages) {
        setMessages(JSON.parse(savedMessages));
      } else {
        setMessages([]); // Aucun message fictif
      }
      setLoading(false);
    }, 300);
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
