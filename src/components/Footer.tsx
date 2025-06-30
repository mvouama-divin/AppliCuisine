
import React from 'react';
import { ChefHat, Mail, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <ChefHat className="w-8 h-8 text-orange-500" />
              <span className="text-2xl font-bold">CuisineApp</span>
            </div>
            <p className="text-gray-300 mb-4 max-w-md">
              Découvrez de délicieuses recettes et créez vos propres plats. 
              CuisineApp vous accompagne dans votre aventure culinaire.
            </p>
            <div className="flex space-x-4">
              <Link
                to="/contact"
                className="flex items-center space-x-2 text-orange-500 hover:text-orange-400 transition-colors"
              >
                <Mail className="w-4 h-4" />
                <span>Contact</span>
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Navigation</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white transition-colors">
                  Accueil
                </Link>
              </li>
              <li>
                <Link to="/recipes" className="text-gray-300 hover:text-white transition-colors">
                  Recettes
                </Link>
              </li>
              <li>
                <Link to="/search" className="text-gray-300 hover:text-white transition-colors">
                  Recherche
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">À propos</h3>
            <ul className="space-y-2 text-gray-300">
              <li>Recettes traditionnelles</li>
              <li>Cuisine moderne</li>
              <li>Conseils culinaires</li>
              <li>Communauté</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © 2024 CuisineApp. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
