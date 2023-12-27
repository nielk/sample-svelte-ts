import { Chunk, Context, Effect, Option, Stream, StreamEmit } from 'effect'
import { head } from 'effect/ReadonlyArray'
import { Input, type NoteMessageEvent, WebMidi } from 'webmidi'

import { type Midi as MidiType } from '_/application/ports'
import { MIDIError } from '_/domain/error'

const getMIDIEvent = Effect.tryPromise(() => WebMidi.enable()).pipe(
  Effect.map(midi => head(midi.inputs)),
  Effect.flatMap(
    Option.match({
      onSome: v => Effect.succeed(v),
      onNone: () =>
        Effect.fail(new MIDIError({ message: 'Can‘t connect to midi device' }))
    })
  )
)

const midiEventStream = (input: Input) =>
  Stream.async((emit: StreamEmit.Emit<never, never, NoteMessageEvent, void>) => {
    input.addListener('noteon', e => {
      emit(Effect.succeed(Chunk.of(e))).catch(
        () => new MIDIError({ message: 'Can‘t read note from input' })
      )
    })
  })

const midiStream = getMIDIEvent.pipe(Stream.flatMap(midiEventStream))

export const Midi = Context.Tag<MidiType>()

export const MidiLive = Midi.of({
  listen: midiStream
})
