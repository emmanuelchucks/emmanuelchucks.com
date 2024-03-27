/** @type {import('eslint').Linter.Config} */
module.exports = {
	env: {
		browser: true,
		es2021: true,
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
			rules: {
				curly: ["error", "all"],
			},
		},
	],
	parserOptions: {
		ecmaVersion: "latest",
		sourceType: "module",
	},
	plugins: ["only-warn"],
	ignorePatterns: ["dist", "node_modules"],
	rules: {
		"@typescript-eslint/explicit-function-return-type": ["error"],
	},
}
