// @ts-ignore
import { Theme, Color, BackgroundColor } from '@adobe/leonardo-contrast-colors';

export const createColorTokens = ({
  lightness,
  contrast,
}: { lightness?: number; contrast?: number } = {}) => {
  const backgroundColorRatios = [-1.1, -1.09, -1.04, 1, 1.1, 1.2, 1.5, 2, 3, 4.5, 7, 11, 16];
  const colorRatios = backgroundColorRatios.slice(5);

  const backgroundColor = new BackgroundColor({
    name: 'gray',
    colorKeys: ['#f5f5f5'],
    ratios: backgroundColorRatios,
    colorspace: 'CAM02',
  });

  let theme = new Theme({
    colors: [
      backgroundColor,
      new Color({
        name: 'blue',
        colorKeys: ['#0e5cec'],
        ratios: colorRatios,
        colorspace: 'CAM02',
      }),
      new Color({
        name: 'green',
        colorKeys: ['#09c839'],
        ratios: colorRatios,
        colorspace: 'CAM02',
      }),
      new Color({
        name: 'orange',
        colorKeys: ['#f6a313'],
        ratios: colorRatios,
        colorspace: 'CAM02',
      }),
      new Color({
        name: 'red',
        colorKeys: ['#d30d0d'],
        ratios: colorRatios,
        colorspace: 'CAM02',
      }),
    ],
    backgroundColor,
    lightness,
    contrast,
  });

  const [
    { background },
    { values: grayColors },
    { values: blueColors },
    { values: greenColors },
    { values: orangeColors },
    { values: redColors },
  ] = theme.contrastColors;

  const getColorValue = (color: { value: string }): string => color.value;

  const gray = {
    gray25: getColorValue(grayColors[0]),
    gray50: getColorValue(grayColors[1]),
    gray75: getColorValue(grayColors[2]),
    gray100: getColorValue(grayColors[3]),
    gray200: getColorValue(grayColors[4]),
    gray300: getColorValue(grayColors[5]),
    gray400: getColorValue(grayColors[6]),
    gray500: getColorValue(grayColors[7]),
    gray600: getColorValue(grayColors[8]),
    gray700: getColorValue(grayColors[9]),
    gray800: getColorValue(grayColors[10]),
    gray900: getColorValue(grayColors[11]),
  };

  const blue = {
    blue100: getColorValue(blueColors[0]),
    blue200: getColorValue(blueColors[1]),
    blue300: getColorValue(blueColors[2]),
    blue400: getColorValue(blueColors[3]),
    blue500: getColorValue(blueColors[4]),
    blue600: getColorValue(blueColors[5]),
    blue700: getColorValue(blueColors[6]),
    blue800: getColorValue(blueColors[7]),
  };

  const green = {
    green100: getColorValue(greenColors[0]),
    green200: getColorValue(greenColors[1]),
    green300: getColorValue(greenColors[2]),
    green400: getColorValue(greenColors[3]),
    green500: getColorValue(greenColors[4]),
    green600: getColorValue(greenColors[5]),
    green700: getColorValue(greenColors[6]),
    green800: getColorValue(greenColors[7]),
  };

  const orange = {
    orange100: getColorValue(orangeColors[0]),
    orange200: getColorValue(orangeColors[1]),
    orange300: getColorValue(orangeColors[2]),
    orange400: getColorValue(orangeColors[3]),
    orange500: getColorValue(orangeColors[4]),
    orange600: getColorValue(orangeColors[5]),
    orange700: getColorValue(orangeColors[6]),
    orange800: getColorValue(orangeColors[7]),
  };

  const red = {
    red100: getColorValue(redColors[0]),
    red200: getColorValue(redColors[1]),
    red300: getColorValue(redColors[2]),
    red400: getColorValue(redColors[3]),
    red500: getColorValue(redColors[4]),
    red600: getColorValue(redColors[5]),
    red700: getColorValue(redColors[6]),
    red800: getColorValue(redColors[7]),
  };

  const colorTokens = {
    ...blue,
    ...gray,
    ...green,
    ...orange,
    ...red,
  };

  return colorTokens;
};
