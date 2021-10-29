import React from 'react';
import {
  HamburgerMenuIcon,
  DotFilledIcon,
  CheckIcon,
  ChevronRightIcon,
} from '@radix-ui/react-icons';
import { Box, Button, Menu, Text } from '@/system';
import { Header } from '@/components/Header';
import TitleAndMetaTags from '@/components/TitleAndMetaTags';

export default function MenuPage() {
  const [{ x, y }, setPosition] = React.useState<{ x: number; y: number }>({ x: 50, y: 80 });

  const menuAnchorRef = React.useRef<null | HTMLDivElement>(null);

  const min = 0;
  const max = 100;
  const buttonSize = 40;

  return (
    <>
      <TitleAndMetaTags />
      <Header />
      <Box css={{ overflowX: 'hidden' }}>
        <Box
          css={{
            display: 'flex',
            gap: '$4',
            p: '$4',
            '@bp1': {
              p: '$5',
            },
            '@bp2': {
              p: '$6',
            },
          }}
        >
          <label>
            <Text>x axis</Text>
            <input
              type="range"
              name="x"
              min={min}
              max={max}
              defaultValue={50}
              onChange={(e) => {
                e.preventDefault();
                const value = Math.min(Math.max(e.currentTarget.valueAsNumber, min), max);
                setPosition((prev) => ({ ...prev, x: value }));
              }}
            />
          </label>
          <label>
            <Text>y axis</Text>
            <input
              type="range"
              name="y"
              min={min}
              max={max}
              defaultValue={80}
              onChange={(e) => {
                e.preventDefault();
                const value = Math.min(Math.max(e.currentTarget.valueAsNumber, min), max);
                setPosition((prev) => ({ ...prev, y: value }));
              }}
            />
          </label>
        </Box>

        <Box css={{ m: '100px' }}>
          <Text css={{ lineHeight: '$0' }}>Container</Text>

          <Box
            ref={menuAnchorRef}
            css={{
              position: 'relative',
              height: '50vh',
              border: '1px solid $gray5',
            }}
          >
            <Box
              css={{
                position: 'absolute',
                left: `calc(${x}% - ${(buttonSize * x) / 100}px)`,
                top: `calc(${y}% - ${(buttonSize * y) / 100}px)`,
              }}
            >
              <DropdownMenu menuAnchorRef={menuAnchorRef} />
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}

const DropdownMenu = ({ menuAnchorRef }: { menuAnchorRef: any }) => {
  const [bookmarksChecked, setBookmarksChecked] = React.useState(true);
  const [urlsChecked, setUrlsChecked] = React.useState<boolean>(false);
  const [person, setPerson] = React.useState<'bill' | 'steve'>('steve');

  return (
    <Menu.Root>
      {/* TODO - how to set Popper collision boundary as menuAnchorRef.current */}
      <Menu.Trigger asChild>
        <Button aria-label="Customize options">
          <HamburgerMenuIcon />
        </Button>
      </Menu.Trigger>

      <Menu.Content>
        <Menu.Item>
          New Tab <Box css={{ ml: 'auto' }}>⌘+T</Box>
        </Menu.Item>
        <Menu.Item>
          New Window <Box css={{ ml: 'auto' }}>⌘+N</Box>
        </Menu.Item>
        <Menu.Item disabled>
          New Private Window <Box css={{ ml: 'auto' }}>⇧+⌘+N</Box>
        </Menu.Item>
        <Menu.Root>
          <Menu.TriggerItem>
            More Tools
            <Box css={{ ml: 'auto' }}>
              <ChevronRightIcon />
            </Box>
          </Menu.TriggerItem>
          <Menu.Content>
            <Menu.Item>
              Save Page As… <Box css={{ ml: 'auto' }}>⌘+S</Box>
            </Menu.Item>
            <Menu.Item>Create Shortcut…</Menu.Item>
            <Menu.Item>Name Window…</Menu.Item>
            <Menu.Separator />
            <Menu.Item>Developer Tools</Menu.Item>
          </Menu.Content>
        </Menu.Root>
        <Menu.Separator />
        <Menu.CheckboxItem checked={bookmarksChecked} onCheckedChange={setBookmarksChecked}>
          <Menu.ItemIndicator>
            <CheckIcon />
          </Menu.ItemIndicator>
          Show Bookmarks <Box css={{ ml: 'auto' }}>⌘+B</Box>
        </Menu.CheckboxItem>
        <Menu.CheckboxItem checked={urlsChecked} onCheckedChange={setUrlsChecked}>
          <Menu.ItemIndicator>
            <CheckIcon />
          </Menu.ItemIndicator>
          Show Full URLs
        </Menu.CheckboxItem>
        <Menu.Separator />
        <Menu.Label>People</Menu.Label>
        <Menu.RadioGroup
          value={person}
          onValueChange={(value) => {
            if (value === 'bill' || value === 'steve') {
              setPerson(value);
            }
          }}
        >
          <Menu.RadioItem value="bill">
            <Menu.ItemIndicator>
              <DotFilledIcon />
            </Menu.ItemIndicator>
            Bill Gates
          </Menu.RadioItem>
          <Menu.RadioItem value="steve">
            <Menu.ItemIndicator>
              <DotFilledIcon />
            </Menu.ItemIndicator>
            Steve Jobs
          </Menu.RadioItem>
        </Menu.RadioGroup>
      </Menu.Content>
    </Menu.Root>
  );
};
