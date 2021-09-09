const defaultFontSizeMultiple = 1.125; // major second type scale
const desktopBaseFontSize = 14;

const scaleFontSize = (
  baseFontSize: number,
  step: number,
  multiple: number = defaultFontSizeMultiple
) => Math.round(baseFontSize * Math.pow(multiple, step));

const toRem = (scaledFontSize: number, baseFontSize: number) =>
  `${(scaledFontSize / baseFontSize).toFixed(2)}rem`;

const scaleDesktopFontSizeToRem = (step: number) =>
  toRem(scaleFontSize(desktopBaseFontSize, step), desktopBaseFontSize);

export const fontSizes = {
  1: `${desktopBaseFontSize}px`,
  2: scaleDesktopFontSizeToRem(1),
  3: scaleDesktopFontSizeToRem(2),
  4: scaleDesktopFontSizeToRem(3),
  5: scaleDesktopFontSizeToRem(4),
  6: scaleDesktopFontSizeToRem(5),
  7: scaleDesktopFontSizeToRem(6),
  8: scaleDesktopFontSizeToRem(7),
  9: scaleDesktopFontSizeToRem(8),
  10: scaleDesktopFontSizeToRem(9),
  11: scaleDesktopFontSizeToRem(10),
  12: scaleDesktopFontSizeToRem(11),
};
