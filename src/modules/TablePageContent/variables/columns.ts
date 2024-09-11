import { TableColumn } from '../../../types/tableTypes.ts';

export const usersColumns: TableColumn[] = [
  { id: 'avatar', label: '', sortable: false },
  { id: 'firstName', label: 'firstName', sortable: true },
  { id: 'lastName', label: 'lastName', sortable: true },
  { id: 'email', label: 'email', sortable: true },
  {
    id: 'department',
    label: 'departments',
    sortable: true,
  },
  { id: 'position', label: 'positions', sortable: true },
  { id: 'more', label: '', sortable: false },
];

export const projectsColumns: TableColumn[] = [
  { id: 'name', label: 'name', sortable: true },
  { id: 'internalName', label: 'internalName', sortable: true },
  { id: 'domain', label: 'domain', sortable: true },
  { id: 'startDate', label: 'startDate', sortable: true },
  { id: 'endDate', label: 'endDate', sortable: true },
];
export const cvsColumns: TableColumn[] = [
  { id: 'name', label: 'name', sortable: true },
  { id: 'description', label: 'description', sortable: true },
  { id: 'user', label: 'user', sortable: true },
  { id: 'more', label: '', sortable: false },
];
export const departmentsColumns: TableColumn[] = [
  { id: 'name', label: 'name', sortable: true },
];
export const positionsColumns: TableColumn[] = [
  { id: 'name', label: 'name', sortable: true },
];
export const skillsColumns: TableColumn[] = [
  { id: 'name', label: 'name', sortable: true },
  { id: 'category', label: 'category', sortable: true },
];

export const languagesColumns: TableColumn[] = [
  { id: 'name', label: 'name', sortable: true },
  { id: 'nativeName', label: 'nativeName', sortable: true },
  { id: 'iso2', label: 'iso2', sortable: true },
];
