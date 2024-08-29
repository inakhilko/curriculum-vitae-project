import { ReactNode } from 'react';
import { ReactiveVar, useReactiveVar } from '@apollo/client';
import { InputAdornment, MenuItem, Select, ThemeProvider } from '@mui/material';

interface HeaderSelectProps {
  menuItemsList: string[];
  startAdornment: ReactNode;
  reactVar: ReactiveVar<unknown>;
}

function HeaderSelect({
  menuItemsList,
  startAdornment,
  reactVar,
}: HeaderSelectProps) {
  const value = useReactiveVar(reactVar);
  const onChange = (event) => {
    reactVar(event.target.value);
  };

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
        {menuItemsList.map((item) => (
          <MenuItem value={item} key={item}>
            {item}
          </MenuItem>
        ))}
      </Select>
    </ThemeProvider>
  );
}

export default HeaderSelect;
