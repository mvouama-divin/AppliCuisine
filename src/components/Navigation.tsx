
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChefHat, Home, Search, Settings } from 'lucide-react';

const Navigation = () => {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Accueil', icon: Home },
    { path: '/recipes', label: 'Recettes', icon: ChefHat },
    { path: '/search', label: 'Recherche', icon: Search },
    { path: '/admin', label: 'Admin', icon: Settings },
  ];

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <ChefHat className="w-8 h-8 text-cuisine-orange" />
            <span className="text-xl font-bold gradient-text">CuisineApp</span>
          </div>
          
          <div className="flex space-x-8">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive
                      ? 'text-cuisine-orange bg-cuisine-orange/10'
                      : 'text-gray-600 hover:text-cuisine-orange hover:bg-cuisine-orange/5'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
