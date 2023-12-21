import { createUser, Age, UserName } from '../domain/user'
import { useNotifier } from '../service/notificationAdapter'
import { useUserStorage } from '../service/storageAdapter'

export function setUser(name: UserName, age: Age) {
  const notifier = useNotifier()
  const userStorage = useUserStorage()

  const user = createUser(name, age)

  userStorage.updateUser(user)

  notifier.notify('Successfully created user')
}
