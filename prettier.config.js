/** @type {import('prettier').Config} */
export default {
	semi: false,
	useTabs: true,
	plugins: [
		"prettier-plugin-packagejson",
		"prettier-plugin-organize-imports",
		"prettier-plugin-tailwindcss",
	],
};
