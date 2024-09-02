import { ReactNode } from 'react';
import {
  InputAdornment,
  MenuItem,
  Select,
  SelectChangeEvent,
  ThemeProvider,
} from '@mui/material';
import { useTranslation } from 'react-i18next';

interface HeaderSelectProps {
  menuItemsList: string[];
  startAdornment: ReactNode;
  value: string;
  onChange: (event: SelectChangeEvent) => void;
  nameSpace: string;
}

function HeaderSelect({
  menuItemsList,
  startAdornment,
  value,
  onChange,
  nameSpace,
}: HeaderSelectProps) {
  const { t } = useTranslation();

  return (
    <ThemeProvider
      theme={(theme) => ({
        ...theme,
        components: {
          ...theme.components,
          MuiOutlinedInput: {
            styleOverrides: {
              notchedOutline: {
                ...theme.components?.MuiOutlinedInput?.styleOverrides
                  ?.notchedOutline,
                borderColor: 'transparent',
              },
            },
          },
        },
      })}
    >
      <Select
        value={value}
        onChange={onChange}
        size="small"
        startAdornment={
          <InputAdornment position="start">{startAdornment}</InputAdornment>
        }
      >
        {menuItemsList.map((value) => (
          <MenuItem value={value} key={value}>
            {t(value, { ns: nameSpace })}
          </MenuItem>
        ))}
      </Select>
    </ThemeProvider>
  );
}

export default HeaderSelect;
