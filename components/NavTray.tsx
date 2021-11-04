import React from 'react';
import { useAtom } from 'jotai';
import { HamburgerMenuIcon, Cross1Icon } from '@radix-ui/react-icons';
import { Box, Button, Text } from '@/system';
import { navAtom } from '@/atoms';
import { Tray } from '@/system';

export const NavTray = () => {
  const [nav, setNav] = useAtom(navAtom);

  return (
    <Tray.Root
      open={nav === 'open'}
      onOpenChange={(isOpen) => setNav(isOpen ? 'open' : 'closed')}
      css={{
        '@desktop-and-up': {
          display: 'none',
        },
      }}
    >
      <Tray.Overlay />
      <Tray.Trigger asChild>
        <Button
          aria-label={nav === 'closed' ? 'Open Navigation' : 'Close Navigation'}
          onClick={() => setNav((prev) => (prev === 'closed' ? 'open' : 'closed'))}
        >
          {nav === 'closed' ? <HamburgerMenuIcon /> : <Cross1Icon />}
        </Button>
      </Tray.Trigger>
      <Tray.Content>
        <Box css={{ display: 'flex', alignItems: 'center' }}>
          <Tray.Title>Navigation</Tray.Title>
          <Box css={{ flex: 1 }} />
          <Tray.Close asChild>
            <Button aria-label="Close">
              <Cross1Icon />
            </Button>
          </Tray.Close>
        </Box>
        <Tray.Description>Navigate to other pages of the site.</Tray.Description>

        <Box>hi</Box>
      </Tray.Content>
    </Tray.Root>
  );
};
