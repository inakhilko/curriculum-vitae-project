import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ApolloProvider } from '@apollo/client';
import { client } from './apollo/client.ts';
import { ThemeProvider } from '@mui/material';
import { globalTheme } from './theme/theme.ts';
import App from './App.tsx';
import './index.scss';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={globalTheme}>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </ThemeProvider>
  </StrictMode>
);
