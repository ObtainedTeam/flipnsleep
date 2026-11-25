import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Zonder dit schrijft de CSS-minifier alle media queries in de nieuwe
    // bereiknotatie (width>=768px). Safari ouder dan 16.4 (oudere iPads, iPhones
    // en Macs) kent die niet en krijgt dan op elk scherm de telefoonindeling.
    // Met deze doelen blijft het min-width/max-width.
    cssTarget: ['chrome90', 'edge90', 'firefox90', 'safari14'],
  },
})
