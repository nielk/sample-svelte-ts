import { string, TaggedError } from '@effect/schema/Schema'

export type GenericErrorTag = 'GenericError'

export class GenericError extends TaggedError<GenericErrorTag>()('GenericError', {
  message: string
}) {}

export type MIDIErrorTag = 'MIDIError'

export class MIDIError extends TaggedError<MIDIErrorTag>()('MIDIError', {
  message: string
}) {}
