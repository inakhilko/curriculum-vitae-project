import { gql } from '@apollo/client';

export const PROFILE = gql`
  query Profile($userId: ID!) {
    profile(userId: $userId) {
      id
      avatar
    }
  }
`;
