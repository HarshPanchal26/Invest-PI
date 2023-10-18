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
        open: true,
        host: "localhost",
        port: 3000
    }

})







// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';
// import path from 'path';
// import webpackPlugin from '@snowpack/plugin-webpack';
// import tailwindcss from 'tailwindcss';

// export default defineConfig({
//   plugins: [
//     react(),
//     webpackPlugin({
//       extendConfig: (config) => {
//         // Add Tailwind CSS as a PostCSS plugin
//         config.module.rules.push({
//           test: /\.css$/,
//           use: [
//             {
//               loader: 'postcss-loader',
//               options: {
//                 postcssOptions: {
//                   plugins: [tailwindcss],
//                 },
//               },
//             },
//           ],
//         });
//       },
//     }),
//   ],
//   build: {
//     rollupOptions: {
//       input: {
//         main: path.resolve(__dirname, 'index.html'),
//       },
//     },
//   },
// });
