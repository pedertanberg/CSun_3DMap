import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import vitePluginFaviconsInject from 'vite-plugin-favicons-inject';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/CSun_3DMap/', // Replace with your repository name
  plugins: [react(),
    vitePluginFaviconsInject('./src/assets/Terra.svg'), // change the path accordingly
  ],
  build: {
    chunkSizeWarningLimit: 2000,
    outDir: 'build',
  },
  server: {
    open: true
  } 
  
})
