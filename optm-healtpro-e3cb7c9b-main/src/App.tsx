
import React, { useState, useEffect } from 'react';
import { ThemeProvider } from "./components/theme-provider";
import { useAuth } from './contexts/auth';
import AppRoutes from './routes/Routes';
import './styles/responsive/hotspots.css';
import './styles/responsive/dialog.css';
import './styles/responsive/anatomy-components.css';

// Handle loading state
const Loading = () => (
  <div className="flex h-screen w-full items-center justify-center">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
  </div>
);

function App() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    
    console.log('App component mounted');
    
    return () => {
      clearTimeout(timer);
      console.log('App component unmounted');
    };
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="app-container full-height-layout">
      <AppRoutes />
    </div>
  );
}

export default App;
