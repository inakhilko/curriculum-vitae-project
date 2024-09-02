import { makeVar } from '@apollo/client';

type themeType = 'light' | 'dark' | 'system';
export const isAuthenticatedVar = makeVar(false);
export const theme = makeVar<themeType>(
  (localStorage.getItem('cvp_theme') as themeType) ?? 'system'
);
