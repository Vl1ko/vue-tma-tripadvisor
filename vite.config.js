import { fileURLToPath, URL } from 'node:url'
import fs from 'fs'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
// import vitePluginRequire from 'vite-plugin-require'

// https://vitejs.dev/config/

export default defineConfig({
  plugins: [vue(), vueJsx()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    port: 443,
    host: '0.0.0.0',
    hmr: {
      host: 'tg-mini-app.local',
      port: 443
    },
    https: {
      key: fs.readFileSync('./.cert/localhost-key.pem'),
      cert: fs.readFileSync('./.cert/localhost.pem')
    }
  }
})
