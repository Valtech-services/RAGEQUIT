import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'node:url'

// https://vite.dev/config/
// A-019 : au prérendu (build SSR), les pages chargées à la demande sont
// importées directement pour que le HTML de chaque page soit complet.
export default defineConfig(({ isSsrBuild }) => ({
  plugins: [react()],
  resolve: {
    alias: isSsrBuild
      ? [{ find: /^\.\/pages\/lazyPages$/, replacement: fileURLToPath(new URL('./src/pages/lazyPages.ssr.jsx', import.meta.url)) }]
      : [],
  },
}))
