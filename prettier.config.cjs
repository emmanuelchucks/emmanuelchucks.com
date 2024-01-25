/** @type {import('prettier').Config} */
module.exports = {
	semi: false,
	useTabs: true,
	plugins: [
		"prettier-plugin-packagejson",
		"prettier-plugin-organize-imports",
		"prettier-plugin-tailwindcss",
	],
}
