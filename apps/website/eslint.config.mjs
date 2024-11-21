import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";
import reactCompiler from "eslint-plugin-react-compiler";
import reactPlugin from "eslint-plugin-react";
import reactHooksPlugin from "eslint-plugin-react-hooks";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
	baseDirectory: __dirname,
	recommendedConfig: js.configs.recommended,
	allConfig: js.configs.all,
});

const config = [
	{
		plugins: {
			"react-compiler": reactCompiler,
		},
		rules: {
			"react-compiler/react-compiler": "error",
		},
	},
	{
		plugins: {
			react: reactPlugin,
		},
		rules: reactPlugin.configs.recommended.rules,
	},
	{
		plugins: {
			"react-hooks": reactHooksPlugin,
		},
		rules: reactHooksPlugin.configs.recommended.rules,
	},
	...compat.extends("next/core-web-vitals", "next/typescript", "prettier"),
];
export default config;
