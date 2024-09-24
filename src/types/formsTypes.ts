import { FC } from 'react';
import { FieldValues, UseFormWatch } from 'react-hook-form';
import { TFunction } from 'i18next';

interface FormInputDataType {
  name: string;
  id: string;
  [key: string]: any;
}

export interface FormFieldDataType {
  name: string;
  getLabel: (t: TFunction) => string;
  Element: FC;
  getFullListData?: () => FormInputDataType[] | null | undefined;
  getFilteredListData?: (
    currentUser: string
  ) => FormInputDataType[] | null | undefined;
  getDependentValue?: (watchFunction: UseFormWatch<FieldValues>) => string;
}
