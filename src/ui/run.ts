import { writable } from 'svelte/store'
import { Effect, Option, pipe, Stream } from 'effect'
import type { Note } from 'webmidi'

import { GenericError } from '_/domain/error'
import { Game } from '_/service/game'
import { Midi } from '_/service/midiAdapter'
import { Notifier } from '_/service/notificationAdapter'

import App from './App.svelte'

import './app.css'

const lastNoteStore = writable<Note | undefined>()

export const runSvelte = Effect.all([Notifier, Midi, Game]).pipe(
  Effect.map(([notifier, midi, game]) => {
    const lastPlayedNote = midi.listen.pipe(
      Stream.runForEach(n => {
        return pipe(
          Effect.succeed(n),
          Effect.map(lastNote => {
            lastNoteStore.set(lastNote.note)
            notifier.notify(`note: ${lastNote.note.name}`)
          })
        )
      })
    )

    Effect.runPromise(lastPlayedNote)

    const mountSvelte = pipe(
      Effect.succeed(Option.fromNullable(document.getElementById('app'))),
      Effect.map(v => Option.getOrThrow(v)),
      Effect.map(element => {
        new App({
          target: element,
          props: {
            lastNote: lastNoteStore,
            game
          }
        })

        notifier.notify('svelte app mounted')
      })
    )

    Effect.runPromise(mountSvelte)
  }),
  Effect.catchAll(() => new GenericError({ message: 'Something went worng with Svelte' }))
)
