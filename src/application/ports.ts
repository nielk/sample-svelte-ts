import type { Readable } from 'svelte/store'
import { Stream } from 'effect'
import type { UnknownException } from 'effect/Cause'
import type { Note, NoteMessageEvent } from 'webmidi'

import type { MIDIError } from '_/domain/error'

import { User } from '../domain/user'

export type UserStorageService = Readonly<{
  user: Readable<User>
  updateUser: (user: User) => void
}>

export type NotificationService = Readonly<{
  notify: (message: string) => void
}>

export type Midi = {
  listen: Stream.Stream<never, UnknownException | MIDIError, NoteMessageEvent>
}

export enum GameName {
  GameGuessNote = 'GameGuessNote'
}

type GameInterface = Record<
  GameName,
  {
    play: () => Generator<Note, void>
  }
>

export type GameService = Readonly<GameInterface>
