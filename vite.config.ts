import { defineConfig } from 'vite'
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
                target: 'http://localhost:5000', // Set the target to your server
                changeOrigin: true, // Change the origin to match the target
                rewrite: (path) => path.replace(/^\/api/, ''), // Optionally rewrite the path
            },
        },
        // Add this line to handle client-side routing
        open: true,
        host: "localhost",
        port: 8080
    }

})
