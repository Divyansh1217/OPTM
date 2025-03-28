
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './styles/main.css';
import './styles/responsive/hotspots.css';
import './styles/responsive/dialog.css';
import './styles/responsive/anatomy-components.css';
import { ThemeProvider } from './components/theme-provider';
import { SymptomProvider } from './contexts/SymptomContext';
import { Toaster } from 'sonner';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <SymptomProvider>
          <App />
          <Toaster position="bottom-right" richColors />
        </SymptomProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);
