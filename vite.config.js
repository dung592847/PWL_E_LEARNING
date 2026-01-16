import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: './', // Ensures relative paths for simple hosting
  resolve: {
    alias: {
      '@': '/src'
    }
  }
})
