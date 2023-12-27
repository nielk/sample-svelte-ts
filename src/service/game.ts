import { Context, Option, Stream } from 'effect'
import type { UnknownException } from 'effect/Cause'
import { head } from 'effect/ReadonlyArray'
import { type Note, type NoteMessageEvent, Utilities } from 'webmidi'

import type { MIDIError } from '_/domain/error'
import type { Score } from '_/domain/score'
import { shuffle } from '_/lib/array'

import { GameName, type GameService } from '../application/ports'

export const Game = Context.Tag<GameService>()

type Game = GameGuessNote

type GameGuessNote = {
  name: GameName.GameGuessNote
  score: Score
  pause: () => void
  play: (
    midiStream: Stream.Stream<never, UnknownException | MIDIError, NoteMessageEvent>
  ) => void
}

function* gameIterator(): Generator<Note, void> {
  const notes = shuffle(
    Utilities.buildNoteArray(['A3', 'B3', 'C3', 'D3', 'E3', 'F3', 'G3'])
  )

  const newNote: Note = Option.getOrElse(head(notes), () => Utilities.buildNote('A3'))

  yield newNote
  yield* gameIterator()
}

export const GameLive = Game.of({
  [GameName.GameGuessNote]: {
    play: gameIterator
  }
})

GameLive.GameGuessNote.play()
