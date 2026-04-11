<<<<<<< HEAD
import { fileURLToPath } from "url"
import path from "path"
=======
>>>>>>> main
import { defineConfig } from 'vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'

<<<<<<< HEAD
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

=======
>>>>>>> main
// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] })
  ],
<<<<<<< HEAD
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
=======
>>>>>>> main
})
