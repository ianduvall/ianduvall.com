import * as React from 'react';
import { ThemeProvider as NextThemeProvider, useTheme as useNextTheme } from 'next-themes';

import { lightTheme, darkTheme } from '@/styles';

const colorThemeProviderValue = {
  dark: darkTheme.className,
  light: lightTheme.className,
};

export type Theme = keyof typeof colorThemeProviderValue;

export type ThemeProviderProps = {
  children: React.ReactNode;
  forcedTheme?: Theme;
};

export const ThemeProvider = ({ children, forcedTheme }: ThemeProviderProps) => {
  return (
    <NextThemeProvider attribute="class" value={colorThemeProviderValue} forcedTheme={forcedTheme}>
      {children}
    </NextThemeProvider>
  );
};
