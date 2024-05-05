import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

const manifestForPlugin = {
  registerType: "prompt",
  includeAssets: ["favicon.ico", "apple-touch-icon.svg", "masked-icon.svg"],
  manifest: {
    name: "Shorch",
    short_name: "Shorch",
    icons: [
      {
          src: 'pwa-64x64.png',
          sizes: '64x64',
          type: 'image/png'
      },
      {
          src: 'pwa-192x192.png',
          sizes: '192x192',
          type: 'image/png'
      },
      {
          src: 'pwa-512x512.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'any'
      },
      {
          src: 'maskable-icon-512x512.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'maskable'
      },
      {
        src: '/apple-touch-icon.png',
        sizes: "180x180",
        type: "image/png",
        purpose: "apple touch icon"
      }
  ],
    start_url: "/",
    display: "standalone",
    theme_color: "#ffffff",
    background_color: "#ffffff"
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), VitePWA(manifestForPlugin)],
})
