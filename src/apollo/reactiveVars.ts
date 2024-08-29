import { makeVar } from '@apollo/client';

type languageType = 'en' | 'ru' | 'de';
type themeType = 'light' | 'dark' | 'system';
export const isAuthenticatedVar = makeVar(false);
export const theme = makeVar<themeType>('system');
export const language = makeVar<languageType>('en');
