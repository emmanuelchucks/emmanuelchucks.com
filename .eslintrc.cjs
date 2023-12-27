module.exports = {
	env: {
		browser: true,
		es2024: true,
	},
	extends: ["xo", "plugin:solid/typescript", "prettier"],
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
