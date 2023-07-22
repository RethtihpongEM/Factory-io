import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
// import reactRefresh from '@vitejs/plugin-react-refresh';
import react from '@vitejs/plugin-react';
// import React from "react";
export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.jsx'],
            refresh: true,
        }),
        // reactRefresh(),
      react()
    ],
  build: {
    rollupOptions: {
      output:{
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return id.toString().split('node_modules/')[1].split('/')[0].toString();
          }
        }
      }
    }
  }
});
