import { createStitches } from '@stitches/react';
import type * as Stitches from '@stitches/react';
import { lightColors } from '@/system/tokens/colors/lightColors';
import { darkColors } from '@/system/tokens/colors/darkColors';
import { majorSecondTypeScaleFontSizes } from '@/system/tokens/fontSizes';

const mobileMax = '599px';
const tabletPortraitMin = '600px';
const tabletPortraitMax = '899px';
const tabletLandscapeMin = '900px';
const tabletLandscapeMax = '1199px';
const desktopMin = '1200px';
const desktopMax = '1799px';
const widescreenMin = '1800px';

const stitchesConfig = createStitches({
  prefix: 'iD',
  theme: {
    colors: lightColors,
    fonts: {
      system: 'system-ui',
    },
    fontSizes: majorSecondTypeScaleFontSizes,
    fontWeights: {},
    lineHeights: {
      '0': '1',
      '1': '1',
      '2': '1.3',
      '3': '1.5',
    },
    letterSpacings: {},
    space: {
      0: '0',
      1: '2px',
      2: '4px',
      3: '8px',
      4: '12px',
      5: '16px',
      6: '24px',
      7: '32px',
      8: '64px',
      9: '128px',
      'mobile-max': mobileMax,
      'tablet-portrait-min': tabletPortraitMin,
      'tablet-portrait-max': tabletPortraitMax,
      'tablet-landscape-min': tabletLandscapeMin,
      'tablet-landscape-max': tabletLandscapeMax,
      'desktop-min': desktopMin,
      'desktop-max': desktopMax,
      'widescreen-min': widescreenMin,
    },
    sizes: {
      0: '0',
      1: '2px',
      2: '4px',
      3: '8px',
      4: '12px',
      5: '16px',
      6: '24px',
      7: '32px',
      8: '64px',
      9: '128px',
    },
    radii: {
      0: '0',
      1: '4px',
      2: '6px',
      3: '8px',
      4: '12px',
      round: '50%',
      pill: '9999px',
    },
    shadows: {
      border: 'inset 0 0 0 1px $colors$gray7',
      borderHover: 'inset 0 0 0 1px $colors$gray8',
      borderActive: '$shadows$borderHover',
      borderFocus: 'inset 0 0 0 1px $colors$gray8, 0 0 0 1px $colors$gray8',
    },
    borderWidths: {
      0: '0',
      1: '1px',
      2: '2px',
      3: '4px',
      4: '8px',
    },
    borderStyles: {},
    zIndices: {},
    transitions: {},
  },
  media: {
    // default styles will apply to mobile and up

    'tablet-portrait-and-up': `(min-width: ${tabletPortraitMin})`,
    'tablet-landscape-and-up': `(min-width: ${tabletLandscapeMin})`,
    'desktop-and-up': `(min-width: ${desktopMin})`,
    'widescreen-and-up': `(min-width: ${widescreenMin})`,

    'mobile-only': `(max-width: ${mobileMax})`,
    'tablet-portrait-only': `(min-width: ${tabletPortraitMin}) and (max-width: ${tabletPortraitMax})`,
    'tablet-landscape-only': `(min-width: ${tabletLandscapeMin}) and (max-width: ${tabletLandscapeMax})`,
    'desktop-only': `(min-width: ${desktopMin}) and (max-width: ${desktopMax})`,
    'widescreen-only': `$widescreen-and-up`,

    motion: '(prefers-reduced-motion: no-preference)',
    reduceMotion: '(prefers-reduced-motion: reduce)',

    hover: '(any-hover: hover)',
    noHover: '(any-hover: none)',

    dark: '(prefers-color-scheme: dark)',
    light: '(prefers-color-scheme: light)',
  },
  utils: {
    p: (value: Stitches.PropertyValue<'padding'>) => ({
      paddingTop: value,
      paddingBottom: value,
      paddingLeft: value,
      paddingRight: value,
    }),
    pt: (value: Stitches.PropertyValue<'padding'>) => ({
      paddingTop: value,
    }),
    pr: (value: Stitches.PropertyValue<'padding'>) => ({
      paddingRight: value,
    }),
    pb: (value: Stitches.PropertyValue<'padding'>) => ({
      paddingBottom: value,
    }),
    pl: (value: Stitches.PropertyValue<'padding'>) => ({
      paddingLeft: value,
    }),
    px: (value: Stitches.PropertyValue<'padding'>) => ({
      paddingLeft: value,
      paddingRight: value,
    }),
    py: (value: Stitches.PropertyValue<'padding'>) => ({
      paddingTop: value,
      paddingBottom: value,
    }),

    m: (value: Stitches.PropertyValue<'margin'>) => ({
      marginTop: value,
      marginBottom: value,
      marginLeft: value,
      marginRight: value,
    }),
    mt: (value: Stitches.PropertyValue<'margin'>) => ({
      marginTop: value,
    }),
    mr: (value: Stitches.PropertyValue<'margin'>) => ({
      marginRight: value,
    }),
    mb: (value: Stitches.PropertyValue<'margin'>) => ({
      marginBottom: value,
    }),
    ml: (value: Stitches.PropertyValue<'margin'>) => ({
      marginLeft: value,
    }),
    mx: (value: Stitches.PropertyValue<'margin'>) => ({
      marginLeft: value,
      marginRight: value,
    }),
    my: (value: Stitches.PropertyValue<'margin'>) => ({
      marginTop: value,
      marginBottom: value,
    }),

    br: (value: Stitches.PropertyValue<'borderRadius'>) => ({
      borderRadius: value,
    }),
    btrr: (value: Stitches.PropertyValue<'borderRadius'>) => ({
      borderTopRightRadius: value,
    }),
    bbrr: (value: Stitches.PropertyValue<'borderRadius'>) => ({
      borderBottomRightRadius: value,
    }),
    bblr: (value: Stitches.PropertyValue<'borderRadius'>) => ({
      borderBottomLeftRadius: value,
    }),
    btlr: (value: Stitches.PropertyValue<'borderRadius'>) => ({
      borderTopLeftRadius: value,
    }),

    bg: (value: Stitches.PropertyValue<'background'>) => ({
      background: value,
    }),
    bc: (value: Stitches.PropertyValue<'backgroundColor'>) => ({
      backgroundColor: value,
    }),

    size: (value: Stitches.PropertyValue<'width'>) => ({
      width: value,
      height: value,
    }),

    linearGradient: (value: Stitches.PropertyValue<'backgroundImage'>) => ({
      backgroundImage: `linear-gradient(${value})`,
    }),

    appearance: (value: Stitches.PropertyValue<'appearance'>) => ({
      WebkitAppearance: value,
      appearance: value,
    }),
    userSelect: (value: Stitches.PropertyValue<'userSelect'>) => ({
      WebkitUserSelect: value,
      userSelect: value,
    }),
    backgroundClip: (value: Stitches.PropertyValue<'backgroundClip'>) => ({
      WebkitBackgroundClip: value,
      backgroundClip: value,
    }),
  },
});

export const { config, theme, styled, css, createTheme, globalCss, keyframes, getCssText } =
  stitchesConfig;

export type StitchesCss = Stitches.CSS<typeof config>;

export const lightTheme = theme;
export const darkTheme = createTheme('dark-theme', {
  colors: darkColors,
});
