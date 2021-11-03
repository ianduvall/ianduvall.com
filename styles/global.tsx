import { globalCss } from '@/styles';

const boxSizingInherit = { boxSizing: 'inherit' };

export const globalStyles = globalCss({
  html: {
    boxSizing: 'border-box',
  },

  '*': {
    ...boxSizingInherit,
    margin: 0,
    padding: 0,

    '&::before': boxSizingInherit,
    '&::after': boxSizingInherit,
  },

  body: {
    backgroundColor: '$gray1',
    color: '$hiContrast',
    fontFamily: '$system',
    fontSize: '17px',
    '@tablet-portrait-and-up': {
      fontSize: '14px',
    },
    lineHeight: '$2',
  },

  'h1, h2, h3, h4, h5, h6': {
    lineHeight: '$3',
    fontWeight: '$bold',
  },

  ul: {
    listStyle: 'none',
  },

  'pre,code': { fontFamily: '$mono' },

  svg: {
    display: 'inline-block',
    verticalAlign: 'middle',
  },

  'img,video': {
    height: 'auto',
    'max-width': '100%',
  },

  iframe: { border: '0' },

  table: {
    'border-collapse': 'collapse',
    'border-spacing': '0',
  },

  'td,th': {
    padding: '0',
  },

  '::selection': {
    backgroundColor: '$mint11',
    color: '$mint2',
  },
});
