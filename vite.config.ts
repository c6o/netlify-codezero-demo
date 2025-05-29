import path from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
    server: {
        hmr: {
            host: 'localhost',
            protocol: 'ws',
            clientPort: 5173,
        },
    },
    build: {
        outDir: 'out',
    },
})
