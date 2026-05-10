import { defineConfig } from 'vite'
import { TanStackRouterVite } from '@tanstack/router-plugin/vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [
    TanStackRouterVite({
      codeSplittingOptions: {
        addHmr: false,
      },
    }),
    tanstackStart({
      server: { entry: 'src/server.ts' }
    }),
    react(),
    tailwindcss(),
    tsconfigPaths(),
  ],
})
