import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

const config = defineConfig({
  plugins: [svelte()]
})

export default config
