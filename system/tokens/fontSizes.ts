export const desktopBaseFontSize = 14;
const majorSecondTypeScale = 1.125; // major second type scale

const scaleFontSize = (baseFontSize: number, step: number, multiple: number) =>
  Math.round(baseFontSize * Math.pow(multiple, step));

const toRem = (scaledFontSize: number, baseFontSize: number) =>
  `${(scaledFontSize / baseFontSize).toFixed(2)}rem`;

const scaleFontSizeToRem = (fontSize: number, scaleMultiple: number) => (step: number) =>
  toRem(scaleFontSize(fontSize, step, scaleMultiple), fontSize);

const scaleDesktopFontSizeToRem = scaleFontSizeToRem(desktopBaseFontSize, majorSecondTypeScale);

export const desktopFontSizes = {
  '-2': scaleDesktopFontSizeToRem(-2),
  '-1': scaleDesktopFontSizeToRem(-1),
  0: scaleDesktopFontSizeToRem(0),
  1: scaleDesktopFontSizeToRem(1),
  2: scaleDesktopFontSizeToRem(2),
  3: scaleDesktopFontSizeToRem(3),
  4: scaleDesktopFontSizeToRem(4),
  5: scaleDesktopFontSizeToRem(5),
  6: scaleDesktopFontSizeToRem(6),
  7: scaleDesktopFontSizeToRem(7),
  8: scaleDesktopFontSizeToRem(8),
  9: scaleDesktopFontSizeToRem(9),
  10: scaleDesktopFontSizeToRem(10),
  11: scaleDesktopFontSizeToRem(11),
  12: scaleDesktopFontSizeToRem(12),
};
