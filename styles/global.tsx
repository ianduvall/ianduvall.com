import { globalCss } from 'stitches.config';

export const globalStyles = globalCss({
  '*, &::before, &::after': {
    boxSizing: 'border-box',
  },

  body: {
    backgroundColor: '$gray1',
    color: '$hiContrast',
    fontFamily: '$system',
    margin: 0,
    fontSize: '$1',
    lineHeight: '$2',
  },

  'h1, h2, h3, h4, h5, h6': {
    lineHeight: '$3',
  },

  ul: {
    paddingLeft: '$4',
  },

  figure: { margin: 0 },

  'pre, code': { margin: 0, fontFamily: '$mono' },

  svg: { display: 'inline-block', verticalAlign: 'middle' },

  '::selection': {
    backgroundColor: '$mint11',
    color: '$mint2',
  },
});
