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
      profile {
        first_name
        last_name
        full_name
        avatar
      }
      department_name
      position_name
    }
  }
`;

export const USER = gql`
  query User($userId: ID!) {
    user(userId: $userId) {
      id
      email
      created_at
      profile {
        avatar
        first_name
        last_name
        full_name
        skills {
          name
          categoryId
          mastery
        }
        languages {
          name
          proficiency
        }
      }
      position_name
      department_name
      position {
        id
        name
      }
      department {
        id
        name
      }
      cvs {
        id
        name
        description
        education
      }
    }
  }
`;

export const PROJECTS = gql`
  query Projects {
    projects {
      id
      name
      domain
      start_date
      end_date
      internal_name
    }
  }
`;

export const CVS = gql`
  query CVS {
    cvs {
      name
      description
      user {
        id
        email
      }
      id
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

export const POSITIONS = gql`
  query Positions {
    positions {
      id
      name
    }
  }
`;

export const SKILLS = gql`
  query Skills {
    skills {
      id
      name
      category_name
      category {
        name
        id
      }
    }
  }
`;

export const SKILL_CATEGORIES = gql`
  query SkillCategories {
    skillCategories {
      id
      name
      children {
        name
      }
      parent {
        name
      }
    }
  }
`;

export const LANGUAGES = gql`
  query Languages {
    languages {
      id
      name
      native_name
      iso2
    }
  }
`;

export const CV = gql`
  query CV($cvId: ID!) {
    cv(cvId: $cvId) {
      id
      name
      education
      description
      user {
        id
        email
        position_name
        profile {
          full_name
        }
      }
      skills {
        name
        categoryId
        mastery
      }
      languages {
        name
        proficiency
      }
    }
  }
`;
