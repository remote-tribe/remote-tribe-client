/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{js,jsx,ts,tsx}'],
	plugins: [
		require('@tailwindcss/typography'),
		require('@tailwindcss/aspect-ratio'),
		require('tailwind-scrollbar'),
	],
	darkMode: 'class',
	themes: ['light', 'dark'],
}
