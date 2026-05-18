import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    lib: {
      entry: 'src/pocket.js',
      name: 'Pocket',
      formats: ['es', 'cjs', 'iife'],
      fileName: (format) => {
        if (format === 'es') return 'pocket.es.js'
        if (format === 'cjs') return 'pocket.cjs.js'
        return 'pocket.iife.js'
      }
    }
  }
})