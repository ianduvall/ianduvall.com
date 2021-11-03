import { css } from '@/styles';

export const pre = css({
  $$background: 'hsla(206 12% 89.5% / 85%)',
  $$text: '$colors$gray900',
  $$syntax1: '$colors$orange700',
  $$syntax2: '$colors$orange400',
  $$syntax3: '$colors$blue700',
  $$syntax4: '$colors$blue700',
  $$comment: '$colors$green700',
  $$removed: '$colors$blue700',
  $$added: '$colors$orange400',
  $$lineNumbers: '$colors$gray10',
  $$fadedLines: '$colors$gray10',
  $$highlightedWordBg: 'hsl(345deg 66% 73% / 30%)',
  $$highlightedWordBgActive: 'hsl(345deg 66% 73% / 100%)',
  $$highlightedWordText: '$colors$gray700',
  $$deletedWordBg: '$colors$red',
  $$deletedWordBgActive: 'hsl(206deg 22% 64% / 30%)',
  $$deletedWordText: '$colors$gray101000',
  $$addedWordBg: 'rgba(0, 245, 196, 0.1)',
  $$addedWordBgActive: 'hsl(206deg 22% 64% / 30%)',
  $$addedWordText: '$colors$orange400',

  padding: '$3',
  overflow: 'auto',
  fontFamily: '$mono',
  fontSize: '$2',
  lineHeight: '$3',
  whiteSpace: 'pre',
  position: 'relative',
  backgroundColor: '$$background',
  color: '$$text',

  '& > code': {
    display: 'block',
  },

  '.language-diff': {
    color: '$$comment',
  },

  '.token.parameter': {
    color: '$$text',
  },

  '.token.tag, .token.class-name, .token.selector, .token.selector .class, .token.function': {
    color: '$$syntax1',
  },

  '.token.attr-value, .token.class, .token.string, .token.number, .token.unit, .token.color': {
    color: '$$syntax2',
  },

  '.token.attr-name, .token.keyword, .token.rule, .token.operator, .token.pseudo-class, .token.important':
    {
      color: '$$syntax3',
    },

  '.token.punctuation, .token.module, .token.property': {
    color: '$$syntax4',
  },

  '.token.comment': {
    color: '$$comment',
  },

  '.token.atapply .token:not(.rule):not(.important)': {
    color: 'inherit',
  },

  '.language-shell .token:not(.comment)': {
    color: 'inherit',
  },

  '.language-css .token.function': {
    color: 'inherit',
  },

  '.token.deleted:not(.prefix), .token.inserted:not(.prefix)': {
    display: 'block',
    px: '$4',
    mx: '-20px',
  },

  '.token.deleted:not(.prefix)': {
    color: '$$removed',
  },

  '.token.inserted:not(.prefix)': {
    color: '$$added',
  },

  '.token.deleted.prefix, .token.inserted.prefix': {
    userSelect: 'none',
    position: 'absolute',
    left: '$3',
  },

  // Styles for highlighted word
  '.highlight-word': {
    $$bgAndShadow: '$$highlightedWordBg',
    $$xOffset: '1px',
    textDecoration: 'none',
    color: '$$highlightedWordText',
    backgroundColor: '$$bgAndShadow',
    display: 'inline-block',
    boxShadow: '$$xOffset 0 0 0 $$bgAndShadow, -$$xOffset 0 0 0 $$bgAndShadow',
    borderRadius: '$1',

    // reset the color for tokens inside highlighted words
    '.token': {
      color: 'inherit',
    },

    '&:is(a):hover, &.on': {
      $$bgAndShadow: '$$highlightedWordBgActive' as any,
      transition: 'all 100ms ease',
    },
  },

  '.token.deleted .highlight-word': {
    $$bgAndShadow: '$$deletedWordBg',
    color: '$$deletedWordText',

    '&.on': {
      $$bgAndShadow: '$$deletedWordBgActive' as any,
    },
  },

  '.token.inserted .highlight-word': {
    $$bgAndShadow: '$$addedWordBg',
    color: '$$addedWordText',

    '&.on': {
      $$bgAndShadow: '$$addedWordBgActive' as any,
    },
  },

  // Styles for highlighted lines
  '.highlight-line': {
    '&, *': {
      transition: 'color 150ms ease',
    },
    '&[data-highlighted=false]': {
      '&, *': {
        color: '$$fadedLines',
      },
    },
  },

  variants: {
    showLineNumbers: {
      true: {
        '.highlight-line': {
          position: 'relative',
          paddingLeft: '$4',

          '&::before': {
            content: 'attr(data-line)',
            position: 'absolute',
            left: -5,
            top: 0,
            color: '$$lineNumbers',
          },
        },
      },
    },
    theme: {
      orange: {
        $$background: 'rgb(255 135 31 / 10%)',
        $$syntax1: '$colors$blue700',
        $$syntax2: '$colors$orange400',
        $$syntax3: '$colors$orange700',
        $$syntax4: '$colors$orange700',
      },
      pink: {
        $$background: 'hsl(345deg 66% 73% / 20%)',
        $$syntax1: '$colors$orange700',
        $$syntax2: '$colors$orange400',
        $$syntax3: '$colors$blue700',
        $$syntax4: '$colors$blue700',
      },
      orange400: {
        $$background: 'rgba(0, 245, 196, 0.15)',
        $$syntax1: '$colors$orange700',
        $$syntax2: '$colors$blue700',
        $$syntax3: '$colors$orange400',
        $$syntax4: '$colors$orange400',
      },
    },
  },
});
