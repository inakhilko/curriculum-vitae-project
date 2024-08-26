import { BrowserRouter } from 'react-router-dom';
import { useQuery, useReactiveVar } from '@apollo/client';
import { ThemeProvider } from '@mui/material';
import { lightTheme } from './theme/theme.ts';
import PublicRouter from './router/PublicRouter.tsx';
import PrivateRouter from './router/PrivateRouter.tsx';
import { isAuthenticatedVar } from './apollo/reactiveVars.ts';
import { USER } from './apollo/queries/queries.ts';
import Loader from './UI/Loader';
import './App.scss';

function App() {
  const { data, loading } = useQuery(USER, {
    variables: {
      userId: localStorage.getItem('cvp_user_id'),
    },
  });

  const isAuthenticated = useReactiveVar(isAuthenticatedVar);

  if (data && data.user) {
    isAuthenticatedVar(true);
  }

  return (
    <>
      <ThemeProvider theme={lightTheme}>
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
