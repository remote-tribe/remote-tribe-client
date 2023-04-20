export const RandomTailwindColor = () => {
	const colors = ['red', 'orange', 'yellow', 'green', 'teal', 'blue', 'indigo', 'purple', 'pink']
	const randomIndex = Math.floor(Math.random() * colors.length)
	return ` bg-${colors[randomIndex]}-300 dark:bg-${colors[randomIndex]}-700`
}
