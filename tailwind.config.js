/** @type {import('tailwindcss').Config} */
export default {
	content: ["app/**/*.tsx", "components/**/*.tsx"],
	theme: {
		extend: {},
	},
	plugins: [require("@tailwindcss/typography")],
}
