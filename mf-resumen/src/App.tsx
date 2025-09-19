import React, { useState, useEffect } from 'react';
import { AppState, MicrofrontendEvent } from '@rimac/shared';
import Icfamily from "./assets/ic_family.png"; 
import './App.scss';

// Placeholder images - replace with actual assets
const rimacLogo = "https://via.placeholder.com/120x40/EF3340/FFFFFF?text=RIMAC";

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState | null>(null);

  // Listen for app state updates from shell
  useEffect(() => {
    const handleAppStateUpdate = (event: CustomEvent<AppState>) => {
      console.log('mf-resumen received app state:', event.detail);
      setAppState(event.detail);
    };

    window.addEventListener('app-state-updated', handleAppStateUpdate as EventListener);
    
    // Request initial state from shell
    window.dispatchEvent(new CustomEvent('request-app-state'));
    
    return () => {
      window.removeEventListener('app-state-updated', handleAppStateUpdate as EventListener);
    };
  }, []);

  const handleNavigation = (step: AppState['currentStep']) => {
    const event: MicrofrontendEvent = {
      type: 'NAVIGATION_REQUESTED',
      payload: { step }
    };

    window.dispatchEvent(new CustomEvent('microfrontend-event', { detail: event }));
  };

  if (!appState) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Cargando información...
          </h2>
          <p className="text-gray-600">
            Por favor espera mientras cargamos tus datos
          </p>
        </div>
      </div>
    );
  }

  if (!appState.user || !appState.selectedPlan) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Información incompleta
          </h2>
          <p className="text-gray-600 mb-4">
            Por favor, completa todos los pasos anteriores
          </p>
          <button
            onClick={() => handleNavigation('home')}
            className="bg-rimac-red text-white px-6 py-2 rounded-lg font-semibold hover:bg-red-600 transition-colors"
          >
            Volver al inicio
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mf-resumen min-h-screen bg-rimac-bg">
      {/* Progress Bar */}
      <div className="bg-rimac-purple-light">
        <div className="container mx-auto px-4 py-3 sm:py-4">
          <div className="flex items-center justify-center space-x-4 sm:space-x-8">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gray-400 text-white rounded-full flex items-center justify-center text-xs sm:text-sm font-semibold">
                1
              </div>
              <span className="text-gray-600 font-medium text-sm sm:text-base">Planes y coberturas</span>
            </div>
            <div className="flex space-x-1">
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gray-400 rounded-full"></div>
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gray-400 rounded-full"></div>
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gray-400 rounded-full"></div>
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-rimac-purple rounded-full"></div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-rimac-purple text-white rounded-full flex items-center justify-center text-xs sm:text-sm font-semibold">
                2
              </div>
              <span className="text-rimac-purple font-medium text-sm sm:text-base">Resumen</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="w-full">
            {/* Main Content - Full Width */}
            <div className="w-full">
              {/* Back Button */}
              <button 
                onClick={() => handleNavigation('planes')}
                className="flex items-center text-rimac-purple hover:text-rimac-purple-800 mb-4 lg:mb-6"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                </svg>
                Volver
              </button>

              {/* Main Title */}
              <h1 className="text-3xl lg:text-4xl font-semibold text-rimac-neutral mb-6 lg:mb-8">
                Resumen del seguro
              </h1>

              {/* Summary Card */}
              <div className="bg-white rounded-2xl shadow-lg p-6 lg:p-10">
                <div className="text-xs lg:text-sm text-rimac-neutral-600 uppercase mb-4">
                  PRECIOS CALCULADOS PARA:
                </div>
                
                {/* User Info */}
                <div className="flex items-center mb-6">
                  <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-full flex items-center justify-center mr-4 lg:mr-6">
                    <img
                      src={Icfamily}
                      alt="Rimac logo"
                      className="h-6 lg:h-8"
                    />
                  </div>
                  <div className="text-xl lg:text-2xl font-bold text-rimac-neutral">
                    {appState.user.name} {appState.user.lastName}
                  </div>
                </div>

                {/* Separator */}
                <div className="border-t border-gray-200 mb-6 lg:mb-8"></div>

                {/* Content Grid - Two columns on larger screens */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
                  {/* Payment Info */}
                  <div className="space-y-4">
                    <div>
                      <div className="font-bold text-rimac-neutral mb-3 text-base lg:text-lg">Responsable de pago</div>
                      <div className="text-rimac-neutral text-base lg:text-lg mb-2">DNI: {appState.userFormData?.documentNumber || 'N/A'}</div>
                      <div className="text-rimac-neutral text-base lg:text-lg">Celular: {appState.userFormData?.phone || 'N/A'}</div>
                    </div>
                  </div>

                  {/* Plan Info */}
                  <div className="space-y-4">
                    <div>
                      <div className="font-bold text-rimac-neutral mb-3 text-base lg:text-lg">Plan elegido</div>
                      <div className="text-rimac-neutral mb-3 text-base lg:text-lg">{appState.selectedPlan.plan.name}</div>
                      <div className="text-rimac-neutral text-base lg:text-lg">
                        Costo del Plan: ${appState.selectedPlan.finalPrice} al mes
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;