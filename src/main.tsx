import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './styles/theme.css';
import './index.css';
import App from './App.tsx';

const queryClient = new QueryClient();

// Wake up Hostinger shared hosting server on app load
fetch('https://frameshiftcms.enriquesolis.me/wp-json/wp/v2').catch(() => {});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>,
);
