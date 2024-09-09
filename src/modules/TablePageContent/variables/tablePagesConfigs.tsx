import {
  cvsColumns,
  departmentsColumns,
  languagesColumns,
  positionsColumns,
  projectsColumns,
  skillsColumns,
  usersColumns,
} from './columns.ts';
import {
  CVS,
  DEPARTMENTS,
  LANGUAGES,
  POSITIONS,
  PROJECTS,
  SKILLS,
  USERS,
} from '../../../apollo/queries/queries.ts';
import {
  Cv,
  Department,
  Language,
  Position,
  Project,
  Skill,
  User,
} from 'cv-graphql';
import { Avatar, IconButton } from '@mui/material';
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
import i18n from '../../../i18next/i18n.ts';

export const tablePagesConfigs = {
  users: {
    columns: usersColumns,
    query: USERS,
    search: (data: { users: User[] }, searchedData: string): User[] => {
      return data?.users.filter((user) => {
        if (user.profile.full_name === null && searchedData === '') {
          return true;
        }
        return user.profile?.full_name
          ?.toLowerCase()
          .includes(searchedData.toLowerCase());
      });
    },
    createRows: (data: User[]) => {
      return data?.map((user) => ({
        avatar: user.profile.avatar,
        firstName: user.profile.first_name,
        lastName: user.profile.last_name,
        email: user.email,
        department: user.department_name,
        position: user.position_name,
        id: user.id,
      }));
    },
    chooseResponsiveColumns: (isMobile: Boolean, isTablet: Boolean) => {
      if (isMobile) {
        return ['email', 'lastName', 'position'];
      }
      if (isTablet) {
        return ['email'];
      }
    },
    getCellContent: (data, columnId: string, onClick: (id: string) => void) => {
      if (columnId === 'avatar') {
        return <Avatar src={data['avatar']} alt="avatar" />;
      }
      if (columnId === 'more') {
        return (
          <IconButton onClick={() => onClick(`${data['id']}`)}>
            <ArrowForwardIosOutlinedIcon
              sx={{ width: '1rem', height: '1rem' }}
            />
          </IconButton>
        );
      }
      return data[columnId];
    },
  },
  projects: {
    columns: projectsColumns,
    query: PROJECTS,
    search: (
      data: { projects: Project[] },
      searchedData: string
    ): Project[] => {
      return data?.projects.filter((project) => {
        if (
          (project.name === null || project.internal_name === null) &&
          searchedData === ''
        ) {
          return true;
        }
        return (
          project.name?.toLowerCase().includes(searchedData.toLowerCase()) ||
          project.internal_name
            ?.toLowerCase()
            .includes(searchedData.toLowerCase())
        );
      });
    },
    createRows: (data: Project[]) => {
      return data?.map((project) => ({
        name: project.name,
        internalName: project.internal_name,
        domain: project.domain,
        startDate: project.start_date,
        endDate: project.end_date,
        id: project.id,
      }));
    },
    chooseResponsiveColumns: (isMobile: Boolean, isTablet: Boolean) => {
      if (isMobile) {
        return ['startDate', 'internalName', 'domain'];
      }
      if (isTablet) {
        return ['startDate'];
      }
    },
    getCellContent: (
      data,
      columnId: string,
      onClick: (id: string) => void,
      translate
    ) => {
      if (columnId === 'endDate' && data['endDate'] === null) {
        return translate('tillNow');
      }
      return data[columnId];
    },
  },
  cvs: {
    columns: cvsColumns,
    query: CVS,
    search: (data: { cvs: Cv[] }, searchedData: string): Cv[] => {
      return data?.cvs.filter((cv) => {
        if (
          (cv.name === null || cv.description === null) &&
          searchedData === ''
        ) {
          return true;
        }
        return (
          cv.name?.toLowerCase().includes(searchedData.toLowerCase()) ||
          cv.description?.toLowerCase().includes(searchedData.toLowerCase())
        );
      });
    },
    createRows: (data: Cv[]) => {
      return data?.map((cv) => ({
        name: cv.name,
        description: cv.description,
        user: cv.user?.email,
        id: cv.id,
      }));
    },
    chooseResponsiveColumns: (isMobile: Boolean) => {
      if (isMobile) {
        return ['user'];
      }
    },
    getCellContent: (data, columnId: string, onClick: (id: string) => void) => {
      if (columnId === 'more') {
        return (
          <IconButton onClick={() => onClick(`${data['id']}`)}>
            <ArrowForwardIosOutlinedIcon
              sx={{ width: '1rem', height: '1rem' }}
            />
          </IconButton>
        );
      }
      return data[columnId];
    },
  },
  departments: {
    columns: departmentsColumns,
    query: DEPARTMENTS,
    search: (
      data: { departments: Department[] },
      searchedData: string
    ): Department[] => {
      return data?.departments.filter((department) => {
        if (department.name === null && searchedData === '') {
          return true;
        }
        return department.name
          ?.toLowerCase()
          .includes(searchedData.toLowerCase());
      });
    },
    createRows: (data: Department[]) => {
      return data?.map((department) => ({
        name: department.name,
        id: department.id,
      }));
    },
  },
  positions: {
    columns: positionsColumns,
    query: POSITIONS,
    search: (
      data: { positions: Position[] },
      searchedData: string
    ): Position[] => {
      return data?.positions.filter((position) => {
        if (position.name === null && searchedData === '') {
          return true;
        }
        return position.name
          ?.toLowerCase()
          .includes(searchedData.toLowerCase());
      });
    },
    createRows: (data: Position[]) => {
      return data?.map((position) => ({
        name: position.name,
        id: position.id,
      }));
    },
  },
  skills: {
    columns: skillsColumns,
    query: SKILLS,
    search: (data: { skills: Skill[] }, searchedData: string): Skill[] => {
      return data?.skills.filter((skill) => {
        if (skill.name === null && searchedData === '') {
          return true;
        }
        return skill.name?.toLowerCase().includes(searchedData.toLowerCase());
      });
    },
    createRows: (data: Skill[]) => {
      return data?.map((skill) => ({
        name: skill.name,
        category: skill.category_name,
        id: skill.id,
      }));
    },
  },
  languages: {
    columns: languagesColumns,
    query: LANGUAGES,
    search: (
      data: { languages: Language[] },
      searchedData: string
    ): Language[] => {
      return data?.languages.filter((language) => {
        if (language.name === null && searchedData === '') {
          return true;
        }
        return language.name
          ?.toLowerCase()
          .includes(searchedData.toLowerCase());
      });
    },
    createRows: (data: Language[]) => {
      return data?.map((language) => ({
        name: language.name,
        nativeName: language.native_name,
        iso2: language.iso2,
        id: language.id,
      }));
    },
  },
};
