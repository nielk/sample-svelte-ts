import { is, struct, number, Schema, parseSync } from '@effect/schema/Schema'
import { UserIdBrand } from './user'
import { GameIdBrand } from './game'

const ScoreSchema = struct({
  userId: UserIdBrand,
  gameId: GameIdBrand,
  value: number
})

export type Score = Schema.To<typeof ScoreSchema>
export const isScore = is(ScoreSchema)
export const Score = parseSync(ScoreSchema)
