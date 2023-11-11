import { defineConfig } from 'vite'
import { resolve } from 'path'
import react from '@vitejs/plugin-react'
import viteTsconfigPaths from 'vite-tsconfig-paths'
import dns from 'dns'

dns.setDefaultResultOrder('verbatim')

export default defineConfig({
    // depending on your application, base can also be "/"
    // publicDir: './public',
    base: '',
    plugins: [react(), viteTsconfigPaths()],
    css: {
        postcss: {
            plugins: [require('tailwindcss'), require('autoprefixer')],
        },
    },
    server: {
        proxy: {
            '/api': {
                target: 'https://piserver.onrender.com/', // Set the target to your server
                changeOrigin: true, // Change the origin to match the target
                rewrite: (path) => path.replace(/^\/api/, ''), // Optionally rewrite the path
                // target: 'http://localhost:5000', // Set the target to yosur server
            },
        },
        // Add this line to handle client-side routing
        open: true,
        host: "localhost",
        port: 8080
    },
    build: {
        lib: {
            entry: resolve(__dirname, '/index.html'),
            name: 'myLib',
            fileName: 'myLib',
        },
        rollupOptions: {
            external: [/^node:\w+/], // <-- ignores all 'node:*'
        },
    },

})
