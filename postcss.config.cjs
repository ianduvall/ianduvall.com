const openProps = require("open-props");
const postcssJitProps = require("postcss-jit-props");
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");

module.exports = {
	plugins: [
		// configure open-props
		postcssJitProps(openProps),
		autoprefixer,
		cssnano,
	],
};
