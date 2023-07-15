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
});
