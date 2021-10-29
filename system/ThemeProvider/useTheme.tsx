import { useTheme as useNextTheme } from 'next-themes';
import type { Theme } from './ThemeProvider';

export type ThemeProps = ReturnType<typeof useNextTheme> & {
  themes: Theme[];
  forcedTheme?: Theme;
  setTheme: (theme: Theme) => void;
  theme?: Theme;
  resolvedTheme?: Theme;
};

export const useTheme = (): ThemeProps => {
  // @ts-expect-error
  return useNextTheme();
};
