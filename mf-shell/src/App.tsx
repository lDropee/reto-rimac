import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AppState, MicrofrontendEvent } from '@rimac/shared';
import Header from './components/Header';
import LoadingSpinner from './components/LoadingSpinner';
import './App.scss';

// Lazy load microfrontends
const MfHome = React.lazy(() => import('mfHome/App'));
const MfPlanes = React.lazy(() => import('mfPlanes/App'));
const MfResumen = React.lazy(() => import('mfResumen/App'));

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>({
    user: null,
    userFormData: null,
    plans: [],
    selectedPlan: null,
    currentStep: 'home'
  });

  const [isLoading, setIsLoading] = useState(false);

  // Handle microfrontend events
  useEffect(() => {
    const handleMicrofrontendEvent = (event: CustomEvent<MicrofrontendEvent>) => {
      const { type, payload } = event.detail;
      
      switch (type) {
        case 'USER_DATA_UPDATED':
          setAppState((prev: AppState) => ({
            ...prev,
            user: payload.user,
            userFormData: payload.userFormData,
            currentStep: 'planes'
          }));
          break;
        case 'PLAN_SELECTED':
          setAppState((prev: AppState) => ({
            ...prev,
            selectedPlan: payload,
            currentStep: 'resumen'
          }));
          break;
        case 'NAVIGATION_REQUESTED':
          setAppState((prev: AppState) => ({
            ...prev,
            currentStep: payload.step
          }));
          break;
      }
    };

    const handleRequestAppState = () => {
      console.log('Shell sending app state to microfrontend:', appState);
      window.dispatchEvent(new CustomEvent('app-state-updated', {
        detail: appState
      }));
    };

    window.addEventListener('microfrontend-event', handleMicrofrontendEvent as EventListener);
    window.addEventListener('request-app-state', handleRequestAppState as EventListener);
    
    return () => {
      window.removeEventListener('microfrontend-event', handleMicrofrontendEvent as EventListener);
      window.removeEventListener('request-app-state', handleRequestAppState as EventListener);
    };
  }, [appState]);

  // Publish app state to microfrontends
  useEffect(() => {
    window.dispatchEvent(new CustomEvent('app-state-updated', {
      detail: appState
    }));
  }, [appState]);

  const handleNavigation = (step: AppState['currentStep']) => {
    setAppState((prev: AppState) => ({
      ...prev,
      currentStep: step
    }));
  };

  return (
    <div className="app">
      <Header />
      
      <main className="app__main">
        <React.Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route 
              path="/" 
              element={
                appState.currentStep === 'home' ? 
                <MfHome /> : 
                <Navigate to={`/${appState.currentStep}`} replace />
              } 
            />
            <Route 
              path="/planes" 
              element={
                appState.currentStep === 'planes' ? 
                <MfPlanes /> : 
                <Navigate to={`/${appState.currentStep}`} replace />
              } 
            />
            <Route 
              path="/resumen" 
              element={
                appState.currentStep === 'resumen' ? 
                <MfResumen /> : 
                <Navigate to={`/${appState.currentStep}`} replace />
              } 
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </React.Suspense>
      </main>
    </div>
  );
};

export default App;
