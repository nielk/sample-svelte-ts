import { Age, createUser, UserName } from '../domain/user'
import { useUserStorage } from '../service/storageAdapter'

export function setUser(name: UserName, age: Age) {
  const userStorage = useUserStorage()

  const user = createUser(name, age)

  userStorage.updateUser(user)
}
