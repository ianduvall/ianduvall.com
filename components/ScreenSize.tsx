import { Text } from '@/system';

export const ScreenSize = () => (
  <>
    <Text
      css={{
        display: 'none',
        '@mobile-only': {
          display: 'block',
        },
      }}
    >
      Mobile
    </Text>
    <Text
      css={{
        display: 'none',
        '@tablet-portrait-only': {
          display: 'block',
        },
      }}
    >
      Tablet Portrait
    </Text>
    <Text
      css={{
        display: 'none',
        '@tablet-landscape-only': {
          display: 'block',
        },
      }}
    >
      Tablet Landscape
    </Text>
    <Text
      css={{
        display: 'none',
        '@desktop-only': {
          display: 'block',
        },
      }}
    >
      Desktop
    </Text>
    <Text
      css={{
        display: 'none',
        '@widescreen-only': {
          display: 'block',
        },
      }}
    >
      Widescreen
    </Text>
  </>
);
