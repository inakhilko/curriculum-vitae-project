import { TFunction } from 'i18next';

export interface TabData {
  getLabel: (t: TFunction) => string;
  value: string;
}
