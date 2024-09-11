import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { serverHost } from './src/config.js'
import basicSsl from '@vitejs/plugin-basic-ssl'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), basicSsl()],
  server: {
    host: serverHost,
    https: true,
  }
})
