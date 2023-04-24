import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import liveReload from 'vite-plugin-live-reload'

export default defineConfig({
	plugins: [react(), liveReload('src/**/*.jsx')],
	server: {
		host: true,
		port: 3000,
	},
})
