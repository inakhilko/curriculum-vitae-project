import { TextField, TextFieldProps } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';

interface FormInputProps extends TextFieldProps {
  label?: string;
  placeholder?: string;
  name: string;
}

function FormInput(props: FormInputProps) {
  const { label, placeholder, name, type, endAdornment, ...otherProps } = props;

  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      rules={{ required: `${label} is required` }}
      render={({
        field: { onChange, value },
        fieldState,
        formState: { errors },
      }) => (
        <TextField
          variant="outlined"
          label={label}
          fullWidth
          onChange={onChange}
          value={value}
          type={type}
          error={!!errors[name]}
          helperText={errors[name]?.message}
        />
      )}
    />
  );
}

export default FormInput;
