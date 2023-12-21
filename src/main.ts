import { DeepReadonly } from 'ts-essentials'
import { WebMidi } from 'webmidi'
import { Context, Layer, Effect, Runtime } from 'effect'

import './app.css'
import App from './App.svelte'
import { NotificationService } from './application/ports'
import { useNotifier } from './service/notificationAdapter'

function runSvelte() {
  const root: DeepReadonly<HTMLElement> = document.getElementById('app') as unknown as HTMLElement

  new App({
    target: root as HTMLElement,
    props: {
      title: 'hello'
    }
  })
}

function runMidi() {
  // eslint-disable-next-line @typescript-eslint/no-floating-promises
  WebMidi.enable().then((result) => {
    if (result.enabled) {
      onEnabled()
    } else {
      console.error('error')
    }
  })

  function onEnabled() {
    // Inputs
    WebMidi.inputs.forEach((input) => console.log(input.name))

    // Outputs
    WebMidi.outputs.forEach((output) => console.log(output.manufacturer, output.name))

    const myInput = WebMidi.getInputByName('MPK Mini Mk II')

    myInput?.addListener('noteon', (e) => {
      console.log(e.note.identifier, e)
    })
  }
}

// Define Midi as a service
const MidiLive = Layer.effectDiscard(
  Effect.gen(function* (_) {
    const notifier = yield* _(Notifier)
    const runFork = Runtime.runFork(yield* _(Effect.runtime<never>()))

    runMidi()

    runFork(Effect.sync(() => notifier.notify('Midi initiated')))
  })
)

// Define Notifier as a service
const Notifier = Context.Tag<NotificationService>()
const NotifierLive = Layer.sync(Notifier, () => useNotifier())

// Init Setup
const InitLive = Layer.scopedDiscard(
  Effect.gen(function* (_) {
    const notifier = yield* _(Notifier)
    yield* _(
      Effect.acquireRelease(
        Effect.sync(() => {
          notifier.notify('Example app initiated')

          runSvelte()
        }),
        () => Effect.sync(() => notifier.notify('Example app terminated'))
      )
    )
  })
)

// Combine the layers
const AppLive = InitLive.pipe(Layer.provide(MidiLive), Layer.provide(NotifierLive))

// Run the program
Effect.runFork(Layer.launch(AppLive))
