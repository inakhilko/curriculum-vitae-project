import {
  ApolloClient,
  ApolloLink,
  createHttpLink,
  InMemoryCache,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const refreshAuthLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('cvp_refresh_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const refreshHttpLink = createHttpLink({
  uri: import.meta.env.VITE_API_URL,
});

export const refreshClient = new ApolloClient({
  link: ApolloLink.from([refreshAuthLink, refreshHttpLink]),
  cache: new InMemoryCache(),
});
