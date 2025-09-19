import React, { useState, useEffect } from 'react';
import { AppState, MicrofrontendEvent, UserFormData, User, ApiService, calculateAge } from '@rimac/shared';
import UserForm from './components/UserForm';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';
import familyImg from "./assets/family.png"; 
import rimacLogoWhite from "./assets/rimac-logo-white.png"; 
import './App.scss';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState | null>(null);
  const [userData, setUserData] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Listen for app state updates from shell
  useEffect(() => {
    const handleAppStateUpdate = (event: CustomEvent<AppState>) => {
      setAppState(event.detail);
    };

    window.addEventListener('app-state-updated', handleAppStateUpdate as EventListener);
    
    return () => {
      window.removeEventListener('app-state-updated', handleAppStateUpdate as EventListener);
    };
  }, []);

  // Load user data from API
  useEffect(() => {
    const loadUserData = async () => {
      try {
        setLoading(true);
        const response = await ApiService.getUser();
        
        if (response.error) {
          setError(response.error);
        } else {
          setUserData(response.data);
        }
      } catch (err) {
        setError('Error al cargar los datos del usuario');
      } finally {
        setLoading(false);
      }
    };

    loadUserData();
  }, []);

  const handleFormSubmit = (formData: UserFormData) => {
    if (!userData) return;

    const user: User = {
      name: formData.name,
      lastName: formData.lastName,
      birthDay: formData.birthDay
    };

    // Dispatch event to shell
    const event: MicrofrontendEvent = {
      type: 'USER_DATA_UPDATED',
      payload: {
        user,
        userFormData: formData
      }
    };

    window.dispatchEvent(new CustomEvent('microfrontend-event', { detail: event }));
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  return (
    <div className="mf-home min-h-screen bg-rimac-bg"
        style={{
        background: "linear-gradient(90deg, #F8F9FF 0%, #C333FF 50%, #00F4E2 100%)",
      }}
    >

      {/* Main Content */}
      <main className="flex flex-1 items-center justify-center px-4 sm:px-6 py-8 sm:py-12">
        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2">
          {/* Left - Family Image */}
          <div className="w-full h-64 sm:h-80 lg:h-full order-2 lg:order-1">
            <img
              src={familyImg}
              alt="Familia feliz"
              className="w-full h-full object-cover rounded-none lg:rounded-l-3xl"
            />
          </div>

          {/* Right - Form */}
          <div className="p-6 sm:p-8 lg:p-12 flex flex-col justify-center order-1 lg:order-2">
            {/* Tag */}
            <span className="bg-rimac-green text-rimac-dark text-xs sm:text-sm font-bold px-3 sm:px-4 py-1 rounded-md mb-3 sm:mb-4 inline-block">
              Seguro Salud Flexible
            </span>

            {/* Title */}
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">
              Creado para ti y tu familia
            </h1>

            {/* Subtitle */}
            <p className="text-rimac-dark font-semibold mb-4 sm:mb-6 text-sm sm:text-base">
              Tú eliges cuánto pagar. Ingresa tus datos, cotiza y recibe nuestra
              asesoría. 100% online.
            </p>

            {/* Form */}
            <UserForm initialUserData={userData} onSubmit={handleFormSubmit} />
          </div>
        </div>
      </main>

      {/* Footer */}
      <div className="bg-rimac-dark text-white py-4 sm:py-6 mt-8 sm:mt-16">
        <div className="container mx-auto px-4 flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0">
            <img
              src={rimacLogoWhite}
              alt="Rimac logo"
              className="h-8"
            />
          <div className="text-xs sm:text-sm text-rimac-bg text-center sm:text-right">
            © 2025 RIMAC Seguros y Reaseguros.
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
