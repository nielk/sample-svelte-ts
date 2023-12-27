import { is, number, parseSync, type Schema, struct } from '@effect/schema/Schema'

import { GameIdBrand } from './game'
import { UserIdBrand } from './user'

const ScoreSchema = struct({
  userId: UserIdBrand,
  gameId: GameIdBrand,
  value: number
})

export type Score = Schema.To<typeof ScoreSchema>
export const isScore = is(ScoreSchema)
export const Score = parseSync(ScoreSchema)
