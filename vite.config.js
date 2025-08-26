import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
        additionalData: `
        @import "src/less/_variables.less";
        @import "src/less/_mixins.less";
        `
      }
    }
  }
})
