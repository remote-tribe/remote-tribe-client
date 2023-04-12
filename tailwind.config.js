/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{js,jsx,ts,tsx}'],
	plugins: [require('@tailwindcss/typography')],
	darkMode: 'class',
	themes: ['light', 'dark'],
}
