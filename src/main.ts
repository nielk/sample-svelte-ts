import { DeepReadonly } from 'ts-essentials'

import './app.css'
import App from './App.svelte'

const root: DeepReadonly<HTMLElement> = document.getElementById('app') as unknown as HTMLElement

const app: DeepReadonly<App> = new App({
  target: root as HTMLElement
})

export default app
