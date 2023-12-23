/** @type {import("eslint").Linter.Config} */
module.exports = {
	env: {
		browser: true,
		es2024: true,
	},
	extends: ["xo", "prettier"],
	overrides: [
		{
			env: {
				node: true,
			},
			files: [".eslintrc.{js,cjs}"],
			parserOptions: {
				sourceType: "script",
			},
		},
		{
			extends: ["xo-typescript", "prettier"],
			files: ["*.ts", "*.tsx"],
		},
	],
	parserOptions: {
		ecmaVersion: "latest",
		sourceType: "module",
	},
	rules: {},
}
