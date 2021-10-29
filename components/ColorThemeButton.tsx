import React from 'react';
import { Button } from '@/system/Button';
import { MoonIcon, SunIcon } from '@radix-ui/react-icons';
import { useTheme } from 'next-themes';
import { Skeleton } from '@/system';

export const ColorThemeButton = () => {
  const [isClient, setIsClient] = React.useState<boolean>(false);
  React.useEffect(() => {
    setIsClient(true);
  }, []);

  const { theme, setTheme } = useTheme();

  const ariaLabel = !isClient
    ? ''
    : theme === 'dark'
    ? 'Use light color theme'
    : 'Use dark color theme';
  const onClick = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <Button aria-label={ariaLabel} onClick={onClick}>
      {!isClient ? (
        <Skeleton css={{ size: 15, br: '$1' }} aria-hidden />
      ) : theme === 'dark' ? (
        <SunIcon aria-hidden />
      ) : (
        <MoonIcon aria-hidden />
      )}
    </Button>
  );
};
