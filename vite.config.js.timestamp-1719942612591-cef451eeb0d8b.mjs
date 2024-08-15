// vite.config.js
import { fileURLToPath, URL } from "node:url";
import fs from "fs";
import { defineConfig } from "file:///F:/Projects/VScode/vue-tma-tripadvisor/node_modules/vite/dist/node/index.js";
import vue from "file:///F:/Projects/VScode/vue-tma-tripadvisor/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import vueJsx from "file:///F:/Projects/VScode/vue-tma-tripadvisor/node_modules/@vitejs/plugin-vue-jsx/dist/index.mjs";
var __vite_injected_original_import_meta_url = "file:///F:/Projects/VScode/vue-tma-tripadvisor/vite.config.js";
var vite_config_default = defineConfig({
  plugins: [vue(), vueJsx()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", __vite_injected_original_import_meta_url))
    }
  },
  server: {
    port: 443,
    host: "0.0.0.0",
    hmr: {
      host: "tg-mini-app.local",
      port: 443
    },
    https: {
      key: fs.readFileSync("./.cert/localhost-key.pem"),
      cert: fs.readFileSync("./.cert/localhost.pem")
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJGOlxcXFxQcm9qZWN0c1xcXFxWU2NvZGVcXFxcdnVlLXRtYS10cmlwYWR2aXNvclwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRjpcXFxcUHJvamVjdHNcXFxcVlNjb2RlXFxcXHZ1ZS10bWEtdHJpcGFkdmlzb3JcXFxcdml0ZS5jb25maWcuanNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Y6L1Byb2plY3RzL1ZTY29kZS92dWUtdG1hLXRyaXBhZHZpc29yL3ZpdGUuY29uZmlnLmpzXCI7aW1wb3J0IHsgZmlsZVVSTFRvUGF0aCwgVVJMIH0gZnJvbSAnbm9kZTp1cmwnXG5pbXBvcnQgZnMgZnJvbSAnZnMnXG5cbmltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZpdGUnXG5pbXBvcnQgdnVlIGZyb20gJ0B2aXRlanMvcGx1Z2luLXZ1ZSdcbmltcG9ydCB2dWVKc3ggZnJvbSAnQHZpdGVqcy9wbHVnaW4tdnVlLWpzeCdcblxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cblxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgcGx1Z2luczogW3Z1ZSgpLCB2dWVKc3goKV0sXG4gIHJlc29sdmU6IHtcbiAgICBhbGlhczoge1xuICAgICAgJ0AnOiBmaWxlVVJMVG9QYXRoKG5ldyBVUkwoJy4vc3JjJywgaW1wb3J0Lm1ldGEudXJsKSlcbiAgICB9XG4gIH0sXG4gIHNlcnZlcjoge1xuICAgIHBvcnQ6IDQ0MyxcbiAgICBob3N0OiAnMC4wLjAuMCcsXG4gICAgaG1yOiB7XG4gICAgICBob3N0OiAndGctbWluaS1hcHAubG9jYWwnLFxuICAgICAgcG9ydDogNDQzXG4gICAgfSxcbiAgICBodHRwczoge1xuICAgICAga2V5OiBmcy5yZWFkRmlsZVN5bmMoJy4vLmNlcnQvbG9jYWxob3N0LWtleS5wZW0nKSxcbiAgICAgIGNlcnQ6IGZzLnJlYWRGaWxlU3luYygnLi8uY2VydC9sb2NhbGhvc3QucGVtJylcbiAgICB9XG4gIH1cbn0pXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQTRTLFNBQVMsZUFBZSxXQUFXO0FBQy9VLE9BQU8sUUFBUTtBQUVmLFNBQVMsb0JBQW9CO0FBQzdCLE9BQU8sU0FBUztBQUNoQixPQUFPLFlBQVk7QUFMd0ssSUFBTSwyQ0FBMkM7QUFTNU8sSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsU0FBUyxDQUFDLElBQUksR0FBRyxPQUFPLENBQUM7QUFBQSxFQUN6QixTQUFTO0FBQUEsSUFDUCxPQUFPO0FBQUEsTUFDTCxLQUFLLGNBQWMsSUFBSSxJQUFJLFNBQVMsd0NBQWUsQ0FBQztBQUFBLElBQ3REO0FBQUEsRUFDRjtBQUFBLEVBQ0EsUUFBUTtBQUFBLElBQ04sTUFBTTtBQUFBLElBQ04sTUFBTTtBQUFBLElBQ04sS0FBSztBQUFBLE1BQ0gsTUFBTTtBQUFBLE1BQ04sTUFBTTtBQUFBLElBQ1I7QUFBQSxJQUNBLE9BQU87QUFBQSxNQUNMLEtBQUssR0FBRyxhQUFhLDJCQUEyQjtBQUFBLE1BQ2hELE1BQU0sR0FBRyxhQUFhLHVCQUF1QjtBQUFBLElBQy9DO0FBQUEsRUFDRjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
