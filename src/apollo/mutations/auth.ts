import { gql } from '@apollo/client';

export const REFRESH_TOKENS = gql`
  mutation UpdateToken {
    updateToken {
      access_token
      refresh_token
    }
  }
`;

export const SIGNUP = gql`
  mutation Signup($auth: AuthInput!) {
    signup(auth: $auth) {
      user {
        id
        email
      }
      access_token
      refresh_token
    }
  }
`;
