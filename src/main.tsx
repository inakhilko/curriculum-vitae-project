import { StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { ApolloProvider } from '@apollo/client';
import { client } from './apollo/client.ts';
import { ThemeProvider } from '@mui/material';
import { globalTheme } from './theme/theme.ts';
import './i18next/i18n.ts';
import App from './App.tsx';
import './index.scss';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/*<Suspense fallback="loading">*/}
    <ThemeProvider theme={globalTheme}>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </ThemeProvider>
    {/*</Suspense>*/}
  </StrictMode>
);
