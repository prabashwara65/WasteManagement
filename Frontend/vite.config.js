import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,       // Enable global functions like describe, test, etc.
    environment: 'jsdom', // Simulate browser environment for React components
  },
});
