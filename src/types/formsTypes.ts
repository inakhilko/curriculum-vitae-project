import { FC, MouseEventHandler } from 'react';
import { FieldValues, UseFormWatch } from 'react-hook-form';
import { TFunction } from 'i18next';
import { DocumentNode } from '@apollo/client';

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
    currentUser: string,
    currentCv: string
  ) => FormInputDataType[] | null | undefined;
  getDependentValue?: (watchFunction: UseFormWatch<FieldValues>) => string;
}

export interface CVsFormValues {
  name: string;
  education: string;
  description: string;
}

export interface ButtonWithModalFormProps<FormValues> {
  defaultFormValues: FormValues;
  formFields: FormFieldDataType[];
  modalTitle: string;
  submitMutation: DocumentNode;
  createOpenButton: (
    onClick: MouseEventHandler<HTMLButtonElement>
  ) => JSX.Element;
  transformToMutationData: (formData: FormValues) => { [key: string]: any };
  isUpdate?: boolean;
  readOnlyFields?: string[];
}
