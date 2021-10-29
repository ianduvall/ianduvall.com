import React from 'react';
import {
  HamburgerMenuIcon,
  DotFilledIcon,
  CheckIcon,
  ChevronRightIcon,
  IconJarLogoIcon,
} from '@radix-ui/react-icons';
import { Box, Button, Menu } from '@/system';

export default function MenuPage() {
  const [{ x, y }, setPosition] = React.useState<{ x: number; y: number }>({ x: 50, y: 50 });

  const menuRootRef = React.useRef<null | HTMLDivElement>(null);

  const min = 0;
  const max = 100;
  const buttonSize = 40;

  return (
    <Box css={{ overflowX: 'hidden' }}>
      <Box>
        <input
          type="range"
          name="x"
          min={min}
          max={max}
          onChange={(e) => {
            e.preventDefault();
            const value = Math.min(Math.max(e.currentTarget.valueAsNumber, min), max);
            console.log({ x: value });
            setPosition((prev) => ({ ...prev, x: value }));
          }}
        />
        <input
          type="range"
          name="y"
          min={min}
          max={max}
          onChange={(e) => {
            e.preventDefault();
            const value = Math.min(Math.max(e.currentTarget.valueAsNumber, min), max);
            console.log({ y: value });
            setPosition((prev) => ({ ...prev, y: value }));
          }}
        />
      </Box>
      <Box ref={menuRootRef} css={{ position: 'relative', height: '80vh', boxShadow: '$border' }}>
        <Box
          css={{
            position: 'absolute',
            left: `calc(${x}% - ${(buttonSize * x) / 100}px)`,
            top: `calc(${y}% - ${(buttonSize * y) / 100}px)`,
          }}
        >
          <DropdownMenu menuRootRef={menuRootRef} />
        </Box>
      </Box>
    </Box>
  );
}

const DropdownMenu = ({ menuRootRef }: { menuRootRef: any }) => {
  const [bookmarksChecked, setBookmarksChecked] = React.useState(true);
  const [urlsChecked, setUrlsChecked] = React.useState<boolean>(false);
  const [person, setPerson] = React.useState<'bill' | 'steve'>('steve');

  return (
    <Menu.Root>
      <Menu.Trigger asChild>
        <Button aria-label="Customize options">
          <HamburgerMenuIcon />
        </Button>
      </Menu.Trigger>

      <Menu.Content>
        <Menu.Item>
          New Tab <Box css={{ marginLeft: 'auto' }}>⌘+T</Box>
        </Menu.Item>
        <Menu.Item>
          New Window <Box css={{ marginLeft: 'auto' }}>⌘+N</Box>
        </Menu.Item>
        <Menu.Item disabled>
          New Private Window <Box css={{ marginLeft: 'auto' }}>⇧+⌘+N</Box>
        </Menu.Item>
        <Menu.Root>
          <Menu.TriggerItem>
            More Tools
            <Box css={{ marginLeft: 'auto' }}>
              <ChevronRightIcon />
            </Box>
          </Menu.TriggerItem>
          <Menu.Content sideOffset={2} alignOffset={-5}>
            <Menu.Item>
              Save Page As… <Box css={{ marginLeft: 'auto' }}>⌘+S</Box>
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
          Show Bookmarks <Box css={{ marginLeft: 'auto' }}>⌘+B</Box>
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
