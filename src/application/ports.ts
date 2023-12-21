import { User } from '../domain/user'
import { Readable } from 'svelte/store'

export type UserStorageService = Readonly<{
  user: Readable<User>
  updateUser: (user: User) => void
}>

export type NotificationService = Readonly<{
  notify: (message: string) => void
}>
