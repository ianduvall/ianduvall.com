import React from 'react';
import { SecondaryButton } from '@/system/Button';
import { MoonIcon, SunIcon } from '@radix-ui/react-icons';
import { useTheme } from 'next-themes';

export const ColorThemeButton = () => {
  const { theme, setTheme } = useTheme();
  if (!theme) return null;

  return (
    <SecondaryButton
      aria-label={theme === 'dark' ? 'Use light color theme' : 'Use dark color theme'}
      onClick={() => {
        setTheme(theme === 'light' ? 'dark' : 'light');
      }}
    >
      {theme === 'dark' ? <SunIcon aria-hidden /> : <MoonIcon aria-hidden />}
    </SecondaryButton>
  );
};
