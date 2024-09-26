import { gql } from '@apollo/client';

export const PROFILE = gql`
  query Profile($userId: ID!) {
    profile(userId: $userId) {
      id
      avatar
      first_name
      last_name
      full_name
    }
  }
`;

export const POSITIONS = gql`
  query Positions {
    positions {
      id
      name
    }
  }
`;

export const DEPARTMENTS = gql`
  query Departments {
    departments {
      id
      name
    }
  }
`;
