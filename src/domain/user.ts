import { brand, is, struct, string, number, Schema, parseSync } from '@effect/schema/Schema'

export const UserIdBrand = number.pipe(brand(Symbol.for('UserId')))
export type UserId = Schema.To<typeof UserIdBrand>
export const UserId = parseSync(UserIdBrand)

export const AgeBrand = number.pipe(brand(Symbol.for('Age')))
export type Age = Schema.To<typeof AgeBrand>
export const Age = parseSync(AgeBrand)

export const UserNameBrand = string.pipe(brand(Symbol.for('UserName')))
export type UserName = Schema.To<typeof UserNameBrand>
export const UserName = parseSync(UserNameBrand)

const UserSchema = struct({
  id: UserIdBrand,
  name: UserNameBrand,
  age: AgeBrand
})

export type User = Schema.To<typeof UserSchema>
export const isUser = is(UserSchema)
export const User = parseSync(UserSchema)

export function createUser(name: UserName, age: Age): User {
  return {
    id: UserId(1), // side effect should not be in domain layer
    name,
    age
  }
}
