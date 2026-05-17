import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    lib: {
      entry: 'src/pocket.js',
      name: 'Pocket',
      fileName: 'pocket',
      formats: ['iife']
    }
  }
})
