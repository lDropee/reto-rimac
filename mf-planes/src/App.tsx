import React, { useState, useEffect } from 'react';
import { AppState, MicrofrontendEvent, Plan, ApiService, filterPlansByAge, calculateAge, calculateDiscount } from '@rimac/shared';
import PlanSelection from './components/PlanSelection';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';
import IcAddUserLight from "./assets/IcAddUserLight.png"; 
import IcProtectionLight from "./assets/IcProtectionLight.png"; 
import './App.scss';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState | null>(null);
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showPlans, setShowPlans] = useState(false);
  const [selectedOption, setSelectedOption] = useState<'me' | 'someone-else' | null>(null);

  // Listen for app state updates from shell
  useEffect(() => {
    const handleAppStateUpdate = (event: CustomEvent<AppState>) => {
      console.log('mf-planes received app state:', event.detail);
      setAppState(event.detail);
    };

    window.addEventListener('app-state-updated', handleAppStateUpdate as EventListener);
    
    // Request initial state from shell
    window.dispatchEvent(new CustomEvent('request-app-state'));
    
    return () => {
      window.removeEventListener('app-state-updated', handleAppStateUpdate as EventListener);
    };
  }, []);

  // Load plans from API
  useEffect(() => {
    const loadPlans = async () => {
      try {
        setLoading(true);
        const response = await ApiService.getPlans();
        
        if (response.error) {
          setError(response.error);
        } else {
          setPlans(response.data.list);
        }
      } catch (err) {
        setError('Error al cargar los planes');
      } finally {
        setLoading(false);
      }
    };

    loadPlans();
  }, []);

  // Filter plans based on user age
  const getFilteredPlans = (): Plan[] => {
    if (!appState?.user?.birthDay) return [];
    
    const userAge = calculateAge(appState.user.birthDay);
    return filterPlansByAge(plans, userAge);
  };

  const handlePlanSelection = (plan: Plan, isForSomeoneElse: boolean) => {
    const discount = calculateDiscount(plan.price, isForSomeoneElse);
    const finalPrice = plan.price - discount;

    const planSelection = {
      plan,
      isForSomeoneElse,
      discount,
      finalPrice
    };

    // Dispatch event to shell
    const event: MicrofrontendEvent = {
      type: 'PLAN_SELECTED',
      payload: planSelection
    };

    window.dispatchEvent(new CustomEvent('microfrontend-event', { detail: event }));
  };

  const handleShowPlans = () => {
    setShowPlans(true);
  };

  const handleOptionSelect = (option: 'me' | 'someone-else') => {
    if (selectedOption === option) {
      // Si ya está seleccionado, lo deselecciona y oculta los planes
      setSelectedOption(null);
      setShowPlans(false);
    } else {
      // Selecciona la nueva opción y muestra los planes inmediatamente
      setSelectedOption(option);
      setShowPlans(true);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  // Show loading while waiting for user data
  if (!appState?.user) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="text-center">
          <LoadingSpinner />
          <h2 className="text-xl font-semibold text-gray-900 mb-2 mt-4">
            Cargando información del usuario...
          </h2>
          <p className="text-gray-600">
            Por favor espera mientras se cargan tus datos
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mf-planes min-h-screen bg-rimac-bg">
      {/* Progress Bar */}
      <div className="bg-rimac-purple-light">
        <div className="container mx-auto px-4 py-3 sm:py-4">
          <div className="flex items-center justify-center space-x-4 sm:space-x-8">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-rimac-purple text-white rounded-full flex items-center justify-center text-xs sm:text-sm font-semibold">
                1
              </div>
              <span className="text-rimac-purple font-medium text-sm sm:text-base">Planes y coberturas</span>
            </div>
            <div className="flex space-x-1">
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gray-400 rounded-full"></div>
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gray-400 rounded-full"></div>
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gray-400 rounded-full"></div>
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-rimac-purple rounded-full"></div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gray-400 text-white rounded-full flex items-center justify-center text-xs sm:text-sm font-semibold">
                2
              </div>
              <span className="text-gray-600 font-medium text-sm sm:text-base">Resumen</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 sm:py-8">
        <div className="max-w-6xl mx-auto">
          {/* Back Button */}
          <button 
            onClick={() => {
              const event: MicrofrontendEvent = {
                type: 'NAVIGATION_REQUESTED',
                payload: { step: 'home' }
              };
              window.dispatchEvent(new CustomEvent('microfrontend-event', { detail: event }));
            }}
            className="flex items-center text-rimac-purple hover:text-rimac-purple-800 mb-4 sm:mb-6"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
            Volver
          </button>

          {/* Main Title */}
          <div className="text-center mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-rimac-dark mb-3 sm:mb-4">
              {appState?.user ? `${appState.user.name} ` : ''}¿Para quién deseas cotizar?
            </h1>
            <p className="text-gray-600 text-base sm:text-lg">
              Selecciona la opción que se ajuste más a tus necesidades.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            {/* Selection Cards - Always Visible */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
              {/* Para mí */}
              <div 
                onClick={() => handleOptionSelect('me')}
                className={`bg-white rounded-2xl shadow-lg p-6 sm:p-8 cursor-pointer hover:shadow-xl transition-all duration-200 border-2 relative ${
                  selectedOption === 'me' 
                    ? 'border-rimac-dark shadow-rimac-dark/20' 
                    : 'border-transparent hover:border-rimac-dark'
                }`}
              >
                {/* Checkbox in top right corner */}
                <div className="absolute top-4 right-4 w-6 h-6 flex items-center justify-center">
                  {selectedOption === 'me' ? (
                    <div className="w-6 h-6 bg-[#389E0D] rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  ) : (
                    <div className="w-6 h-6 border-2 border-gray-300 rounded-full"></div>
                  )}
                </div>

                <div className="text-left">
                  <div className="w-16 h-16 flex items-center justify-center mb-4">
                    <img
                      src={IcProtectionLight}
                      alt="Protección personal"
                      className="h-12"
                    />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Para mí</h3>
                  <p className="text-gray-600">
                    Cotiza tu seguro de salud y agrega familiares si así lo deseas.
                  </p>
                </div>
              </div>

              {/* Para alguien más */}
              <div 
                onClick={() => handleOptionSelect('someone-else')}
                className={`bg-white rounded-2xl shadow-lg p-6 sm:p-8 cursor-pointer hover:shadow-xl transition-all duration-200 border-2 relative ${
                  selectedOption === 'someone-else' 
                    ? 'border-rimac-dark shadow-rimac-dark/20' 
                    : 'border-transparent hover:border-rimac-dark'
                }`}
              >
                {/* Checkbox in top right corner */}
                <div className="absolute top-4 right-4 w-6 h-6 flex items-center justify-center">
                  {selectedOption === 'someone-else' ? (
                    <div className="w-6 h-6 bg-[#389E0D] rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  ) : (
                    <div className="w-6 h-6 border-2 border-gray-300 rounded-full"></div>
                  )}
                </div>

                <div className="text-left">
                  <div className="w-16 h-16 flex items-center justify-center mb-4">
                    <img
                      src={IcAddUserLight}
                      alt="Agregar usuario"
                      className="h-12"
                    />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Para alguien más</h3>
                  <p className="text-gray-600">
                    Realiza una cotización para uno de tus familiares o cualquier persona.
                  </p>
                </div>
              </div>
            </div>

            {/* Plans Section - Show when option is selected */}
            {showPlans && (
              <PlanSelection
                plans={getFilteredPlans()}
                userAge={appState.user ? calculateAge(appState.user.birthDay) : 0}
                onPlanSelect={handlePlanSelection}
                isForSomeoneElse={selectedOption === 'someone-else'}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
