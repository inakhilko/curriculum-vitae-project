import { TextFieldProps } from '@mui/material';
import FormInput from '../FormInput';

interface FormTextAreaProps extends TextFieldProps {
  name: string;
}

function FormTextArea({ name, label, readOnly }: FormTextAreaProps) {
  return (
    <FormInput
      component="textarea"
      name={name}
      label={label}
      readOnly={readOnly}
      multiline
      rows={5}
    />
  );
}

export default FormTextArea;
