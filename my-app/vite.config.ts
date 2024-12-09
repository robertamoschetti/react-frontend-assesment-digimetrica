import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    // @ts-ignore
    'process.env': process.env, // Espone le variabili d'ambiente a Vite
  },
})
