import React from 'react';
import rimacLogo from "../assets/rimac-logo.png"; 

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <img
                src={rimacLogo}
                alt="Rimac logo"
                className="h-8"
              />
            </div>
          </div>

          {/* Contact Info */}
          <div className="flex items-center space-x-4 text-sm">
            <span className="font-semibold hidden sm:block">¡Compra por este medio!</span>
            <div className="flex items-center space-x-1">
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              <span className="font-bold text-lg sm:text-xl">(01) 411 6001</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
