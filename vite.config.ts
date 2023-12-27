import { resolve } from 'path'
import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

const config = defineConfig({
  plugins: [svelte()],
  resolve: {
    alias: [
      {
        find: /_\/(.*)/,
        replacement: resolve('./', './src/$1')
      }
    ]
  }
})

export default config
