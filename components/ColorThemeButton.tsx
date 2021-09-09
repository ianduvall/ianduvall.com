import React from 'react';
import { SecondaryButton } from '@/system/Button';
import { MoonIcon, SunIcon } from '@radix-ui/react-icons';
import { lightTheme, darkTheme } from 'stitches.config';

const getInitialColorTheme = () => {
  try {
    if (typeof global.window === 'undefined') {
      return lightTheme;
    }

    const mql = global.window.matchMedia('(prefers-color-scheme: dark)');
    const hasMediaQueryPreference = typeof mql.matches === 'boolean';
    if (hasMediaQueryPreference) {
      return mql.matches ? darkTheme : lightTheme;
    }
  } catch (error) {
    console.log(error);
  }

  return lightTheme;
};

export const ColorThemeButton = () => {
  const [theme, setTheme] = React.useState<undefined | typeof lightTheme | typeof darkTheme>(
    undefined
  );

  React.useEffect(() => {
    setTheme(getInitialColorTheme);
  }, []);

  React.useEffect(() => {
    if (document.body && theme) {
      document.body.classList.remove(lightTheme, darkTheme);
      document.body.classList.add(theme);
    }
  }, [theme]);

  return theme ? (
    <SecondaryButton
      aria-label={theme === darkTheme ? 'Use light color theme' : 'Use dark color theme'}
      onClick={() => {
        setTheme((prevTheme) => (prevTheme === lightTheme ? darkTheme : lightTheme));
      }}
    >
      {theme === darkTheme ? <SunIcon aria-hidden /> : <MoonIcon aria-hidden />}
    </SecondaryButton>
  ) : null;
};
