import { StitchesCss, css } from 'stitches.config';

const _box = css({ boxSizing: 'border-box' });
export const box = (css: StitchesCss) => _box({ css });
