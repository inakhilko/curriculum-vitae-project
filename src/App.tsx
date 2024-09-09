import { BrowserRouter } from 'react-router-dom';
import { useQuery, useReactiveVar } from '@apollo/client';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { darkTheme, lightTheme } from './theme/theme.ts';
import PublicRouter from './router/PublicRouter.tsx';
import PrivateRouter from './router/PrivateRouter.tsx';
import { isAuthenticatedVar, theme } from './apollo/reactiveVars.ts';
import { USER } from './apollo/queries/queries.ts';
import useSystemMode from './hooks/useMode.ts';
import Loader from './UI/Loader';
import './App.scss';

function App() {
  const { loading } = useQuery(USER, {
    variables: {
      userId: localStorage.getItem('cvp_user_id'),
    },
    onCompleted: () => isAuthenticatedVar(true),
  });

  const isAuthenticated = useReactiveVar(isAuthenticatedVar);

  const systemMode = useSystemMode();

  const currentTheme = useReactiveVar(theme);

  const selectedTheme = currentTheme === 'system' ? systemMode : currentTheme;

  return (
    <>
      <ThemeProvider theme={selectedTheme === 'light' ? lightTheme : darkTheme}>
        <CssBaseline />
        <BrowserRouter>
          {loading ? (
            <Loader />
          ) : isAuthenticated ? (
            <PrivateRouter />
          ) : (
            <PublicRouter />
          )}
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}

export default App;
