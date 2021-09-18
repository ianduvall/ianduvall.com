import React from 'react';
import { SecondaryButton } from '@/system/Button';
import { MoonIcon, SunIcon } from '@radix-ui/react-icons';
import { lightTheme, darkTheme } from 'stitches.config';
import Script from 'next/script';

const getInitialColorTheme = () => {
  try {
    if (typeof global.window === 'undefined') {
      return lightTheme;
    }
    return document.body.className === darkTheme.className ? darkTheme : lightTheme;
  } catch (error) {
    console.log(error);
  }

  return lightTheme;
};

export const ColorThemeButton = () => {
  const themeChangedRef = React.useRef<boolean>(false);
  const [theme, setTheme] = React.useState<typeof lightTheme | typeof darkTheme>(
    getInitialColorTheme
  );

  React.useEffect(() => {
    const themeChanged = themeChangedRef.current;
    if (themeChanged) {
      if (document.body) {
        document.body.classList.remove(lightTheme, darkTheme);
        document.body.classList.add(theme);
      }

      localStorage.setItem('color_theme', theme.className);
    }
  }, [theme]);

  return (
    <>
      <Script src="/determineColorMode.js" strategy="beforeInteractive"></Script>
      <SecondaryButton
        aria-label={theme === darkTheme ? 'Use light color theme' : 'Use dark color theme'}
        onClick={() => {
          themeChangedRef.current = true;
          setTheme((prevTheme) => (prevTheme === lightTheme ? darkTheme : lightTheme));
        }}
      >
        {theme === darkTheme ? <SunIcon aria-hidden /> : <MoonIcon aria-hidden />}
      </SecondaryButton>
    </>
  );
};
