import {
  brand,
  is,
  literal,
  parseSync,
  type Schema,
  string,
  struct
} from '@effect/schema/Schema'

export const GameIdBrand = string.pipe(brand(Symbol.for('GameId')))
export type GameId = Schema.To<typeof GameIdBrand>
export const GameId = parseSync(GameIdBrand)

const GameName = literal('noteGuesser', 'chordGuesser')

const GameSchema = struct({
  id: GameIdBrand,
  name: GameName
})

export type Game = Schema.To<typeof GameSchema>
export const isGame = is(GameSchema)
export const Game = parseSync(GameSchema)
