import { DeepReadonly } from 'ts-essentials'
// import { WebMidi } from 'webmidi'
// import { Context, Layer, Effect, Runtime } from 'effect'

import './app.css'
import App from './App.svelte'

// Define Express as a service
// const Express = Context.Tag<ReturnType<typeof express>>()

// // Define the main route, IndexRouteLive, as a Layer
// const IndexRouteLive = Layer.effectDiscard(
//   Effect.gen(function* (_) {
//     const app = yield* _(Express)
//     const runFork = Runtime.runFork(yield* _(Effect.runtime<never>()))

//     app.get("/", (_, res) => {
//       runFork(Effect.sync(() => res.send("Hello World!")))
//     })
//   })
// )

// // Server Setup
// const ServerLive = Layer.scopedDiscard(
//   Effect.gen(function* (_) {
//     const port = 3001
//     const app = yield* _(Express)
//     yield* _(
//       Effect.acquireRelease(
//         Effect.sync(() =>
//           app.listen(port, () =>
//             console.log(`Example app listening on port ${port}`)
//           )
//         ),
//         (server) => Effect.sync(() => server.close())
//       )
//     )
//   })
// )

// // Setting Up Express
// const ExpressLive = Layer.sync(Express, () => express())

// // Combine the layers
// const AppLive = ServerLive.pipe(
//   Layer.provide(IndexRouteLive),
//   Layer.provide(ExpressLive)
// )

// // Run the program
// Effect.runFork(Layer.launch(AppLive))

// const result = await WebMidi.enable()

// if (result.enabled) {
//   onEnabled()
// } else {
//   console.error('error')
// }

// function onEnabled() {
//   // Inputs
//   WebMidi.inputs.forEach(input => console.log(input.name));

//   // Outputs
//   WebMidi.outputs.forEach(output => console.log(output.manufacturer, output.name))

//   const myInput = WebMidi.getInputByName("MPK Mini Mk II")

//   myInput.addListener("noteon", e => {
//     console.log(e.note.identifier, e);
//   })
// }

const root: DeepReadonly<HTMLElement> = document.getElementById('app') as unknown as HTMLElement

const app: DeepReadonly<App> = new App({
  target: root as HTMLElement,
  props: {
    title: 'hello'
  }
})

export default app
