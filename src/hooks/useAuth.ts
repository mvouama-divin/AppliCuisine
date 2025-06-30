
import { useState } from 'react';

// Hook simple pour gérer l'authentification admin
export const useAuth = () => {
  const [isAdmin, setIsAdmin] = useState(false);

  const loginAdmin = (password: string) => {
    // Mot de passe simple pour l'admin (en production, utiliser une vraie authentification)
    if (password === 'admin123') {
      setIsAdmin(true);
      localStorage.setItem('isAdmin', 'true');
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setIsAdmin(false);
    localStorage.removeItem('isAdmin');
  };

  // Vérifier si l'utilisateur est admin au chargement
  const checkAdminStatus = () => {
    const adminStatus = localStorage.getItem('isAdmin');
    setIsAdmin(adminStatus === 'true');
    return adminStatus === 'true';
  };

  return {
    isAdmin,
    loginAdmin,
    logoutAdmin,
    checkAdminStatus
  };
};
