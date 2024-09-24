import { Controller, useFormContext } from 'react-hook-form';
import { TextField, TextFieldProps } from '@mui/material';

interface FormInputProps extends TextFieldProps {
  label?: string;
  name: string;
  readOnly: boolean;
}

function FormInput(props: FormInputProps) {
  const { label, readOnly, name, type, multiline, rows, ...otherProps } = props;

  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      rules={{ required: `${label} is required` }}
      render={({ field: { onChange, value }, formState: { errors } }) => (
        <TextField
          variant="outlined"
          label={label}
          fullWidth
          onChange={onChange}
          value={value}
          type={type}
          error={!!errors[name]}
          helpertext={errors[name]?.message}
          InputProps={{
            readOnly: readOnly,
          }}
          multiline={multiline}
          rows={rows}
        />
      )}
    />
  );
}

export default FormInput;
