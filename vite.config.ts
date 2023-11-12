import { defineConfig, loadEnv } from 'vite'
import { resolve } from 'path'
import react from '@vitejs/plugin-react'
import envCompatible from 'vite-plugin-env-compatible'
import viteTsconfigPaths from 'vite-tsconfig-paths'
import dns from 'dns'
dns.setDefaultResultOrder('verbatim')


export default defineConfig(({mode}) => {
    // Load environment variables
    const env = loadEnv(mode, process.cwd(), '');
    return {
        base: '/Invest-PI/', 
        define: {
            // 'process.env': env,
            'process.env.NODE_ENV': JSON.stringify(mode),
        },
        plugins: [react(), viteTsconfigPaths() , envCompatible()],
        css: {
            postcss: {
                plugins: [require('tailwindcss'), require('autoprefixer')],
            },
        },
        server: {
            proxy: {
                '/api': {
                    target: 'http://localhost:5000', // Set the target to yosur server
                    changeOrigin: true, // Change the origin to match the target
                    rewrite: (path) => path.replace(/^\/api/, ''), // Optionally rewrite the path
                },
            },
            // Add this line to handle client-side routing
            open: true,
            host: "localhost",
            port: 8080
        },
        build: {
            target : 'esnext',
            lib: {
                entry: resolve(__dirname, '/index.html'),
                name: 'myLib',
                fileName: 'myLib',
            },
            rollupOptions: {
                external: [/^node:\w+/], // <-- ignores all 'node:*'
            },
        },
    }

})


