import { Context, Effect } from 'effect'

import { Game, GameLive } from './service/game'
import { Midi, MidiLive } from './service/midiAdapter'
import { Notifier, NotifierLive } from './service/notificationAdapter'
import { runSvelte } from './ui/run'

const context = Context.empty().pipe(
  Context.add(Notifier, NotifierLive),
  Context.add(Midi, MidiLive),
  Context.add(Game, GameLive)
)

const program = Effect.all([runSvelte], { mode: 'validate' })

const runnable = Effect.provide(program, context)

// Run the program
Effect.runFork(runnable)
