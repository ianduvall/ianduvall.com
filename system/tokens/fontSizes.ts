const majorSecondTypeScale = 1.125;

const scaleFontSize = (step: number, multiple: number) => Math.pow(multiple, step);

const toRem = (fontSize: number) => `${fontSize.toFixed(3)}rem`;

const createScaleFontSizeToRem = (scaleMultiple: number) => (step: number) =>
  toRem(scaleFontSize(step, scaleMultiple));

const scaleFontSizeToRem = createScaleFontSizeToRem(majorSecondTypeScale);

export const majorSecondTypeScaleFontSizes = {
  '-2': scaleFontSizeToRem(-2),
  '-1': scaleFontSizeToRem(-1),
  0: scaleFontSizeToRem(0),
  1: scaleFontSizeToRem(1),
  2: scaleFontSizeToRem(2),
  3: scaleFontSizeToRem(3),
  4: scaleFontSizeToRem(4),
  5: scaleFontSizeToRem(5),
  6: scaleFontSizeToRem(6),
  7: scaleFontSizeToRem(7),
  8: scaleFontSizeToRem(8),
  9: scaleFontSizeToRem(9),
  10: scaleFontSizeToRem(10),
  11: scaleFontSizeToRem(11),
  12: scaleFontSizeToRem(12),
};
