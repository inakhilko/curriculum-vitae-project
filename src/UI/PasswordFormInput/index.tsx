import { useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import {
  FormControl,
  IconButton,
  InputAdornment,
  TextField,
} from '@mui/material';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Visibility from '@mui/icons-material/Visibility';

function PasswordFormInput({ label, name }: any) {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      rules={{
        required: `${label} is required`,
        min: {
          value: 8,
          message: 'Password must be at least 8 characters long',
        },
      }}
      render={({
        field: { onChange, value },
        fieldState,
        formState: { errors },
      }) => {
        return (
          <>
            <FormControl variant="outlined">
              <TextField
                name={name}
                type={showPassword ? 'text' : 'password'}
                value={value}
                onChange={onChange}
                label={label}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                error={!!errors[name]}
                helperText={errors[name]?.message}
              />
            </FormControl>
          </>
        );
      }}
    />
  );
}

export default PasswordFormInput;
