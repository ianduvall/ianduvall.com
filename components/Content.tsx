import { styled, keyframes, StitchesCss } from '@/styles';

const widthConstraint: StitchesCss = {
  maxWidth: '100%',
  mx: 'auto',

  '@tablet-landscape-and-up': {
    maxWidth: '45rem',
  },
};

export const Root = styled('div', {
  ...widthConstraint,
});
Root.toString = () => 'Content.Root';

export const Header = styled('header', {
  display: 'flex',
  flexDirection: 'column',
  gap: '$5',

  my: '$5',
});
Header.toString = () => 'Content.Header';

export const Section = styled('section', {
  my: '$5',
});
Section.toString = () => 'Content.Section';
