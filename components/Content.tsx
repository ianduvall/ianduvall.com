import { styled, keyframes, StitchesCss } from '@/styles';

const widthConstraint: StitchesCss = {
  maxWidth: '45rem',
  mx: 'auto',
};

export const Root = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '2rem',
});
Root.toString = () => 'Content.Root';

export const Header = styled('header', {
  ...widthConstraint,

  display: 'flex',
  flexDirection: 'column',
  gap: '$5',
});
Header.toString = () => 'Content.Header';

export const Section = styled('section', {
  ...widthConstraint,
});
Section.toString = () => 'Content.Section';
