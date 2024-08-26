import { gql } from '@apollo/client';

export const LOGIN = gql`
  query Login($auth: AuthInput!) {
    login(auth: $auth) {
      user {
        id
        email
      }
      access_token
      refresh_token
    }
  }
`;
export const USERS = gql`
  query Users {
    users {
      id
      email
    }
  }
`;

export const USER = gql`
  query User($userId: ID!) {
    user(userId: $userId) {
      id
      email
    }
  }
`;
