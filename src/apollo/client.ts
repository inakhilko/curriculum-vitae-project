import {
  ApolloClient,
  ApolloLink,
  createHttpLink,
  InMemoryCache,
  Observable,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import { toast } from 'react-toastify';
import { REFRESH_TOKENS } from './mutations/auth.ts';
import { refreshClient } from './refreshClient.ts';

const httpLink = createHttpLink({
  uri: import.meta.env.VITE_API_URL,
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('cvp_access_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

export async function fetchNewToken() {
  const response = await refreshClient.mutate({
    mutation: REFRESH_TOKENS,
  });

  const { access_token, refresh_token } = response.data.updateToken;

  localStorage.setItem('cvp_access_token', access_token);
  localStorage.setItem('cvp_refresh_token', refresh_token);

  return response.data.updateToken.access_token;
}

const errorLink = onError(
  ({ graphQLErrors, networkError, operation, forward }) => {
    if (graphQLErrors) {
      for (let err of graphQLErrors) {
        if (err.message === 'User already exists') {
          toast.error('User already exists');
          return;
        }
        if (err.extensions?.code === 'UNAUTHENTICATED') {
          return new Observable((observer) => {
            fetchNewToken()
              .then((newToken) => {
                operation.setContext(({ headers = {} }) => ({
                  headers: {
                    ...headers,
                    authorization: `Bearer ${newToken}`,
                  },
                }));

                forward(operation).subscribe({
                  next: observer.next.bind(observer),
                  error: observer.error.bind(observer),
                  complete: observer.complete.bind(observer),
                });
              })
              .catch((error) => {
                localStorage.removeItem('cvp_access_token');
                localStorage.removeItem('cvp_refresh_token');
                localStorage.removeItem('cvp_user_id');
                console.error('Failed to refresh token:', error);
                observer.error(error);
              });
          });
        }
      }
    }
    if (networkError) {
      console.log(`[Network error]: ${networkError}`);
    }
  }
);

export const client = new ApolloClient({
  link: ApolloLink.from([errorLink, authLink, httpLink]),
  cache: new InMemoryCache(),
});
