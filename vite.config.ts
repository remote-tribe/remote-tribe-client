import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import liveReload from 'vite-plugin-live-reload'
import { resolve } from 'path'
import dts from 'vite-plugin-dts'

export default defineConfig({
	plugins: [react(), liveReload('src/**/*.jsx'), dts()],
	server: {
		host: true,
		port: 3000,
	},
})
