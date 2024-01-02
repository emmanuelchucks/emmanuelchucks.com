/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
	theme: {
		extend: {
			backgroundImage: {
				"cancel-button":
					"linear-gradient( 45deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 43%, #000 45%, #000 55%, rgba(0, 0, 0, 0) 57%, rgba(0, 0, 0, 0) 100%), linear-gradient( 135deg, transparent 0%, transparent 43%, #000 45%, #000 55%, transparent 57%, transparent 100%)",
				"cancel-button-dark":
					"linear-gradient( 45deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 43%, #fff 45%, #fff 55%, rgba(0, 0, 0, 0) 57%, rgba(0, 0, 0, 0) 100%), linear-gradient( 135deg, transparent 0%, transparent 43%, #fff 45%, #fff 55%, transparent 57%, transparent 100%)",
			},
		},
	},
}
