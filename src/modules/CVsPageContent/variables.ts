import { FormFieldDataType } from '../../types/formsTypes.ts';
import FormInput from '../../UI/FormInput';
import FormTextArea from '../../UI/FormTextArea';

export const CVSFormFields: FormFieldDataType[] = [
  {
    name: 'name',
    getLabel: (t) => t('name'),
    Element: FormInput,
  },
  {
    name: 'education',
    getLabel: (t) => t('education'),
    Element: FormInput,
  },
  {
    name: 'description',
    getLabel: (t) => t('description'),
    Element: FormTextArea,
  },
];
