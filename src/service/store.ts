import { writable } from 'svelte/store'

import { User } from '../domain/user'

export const useStore = () => {
  const state = writable<User>()

  return {
    user: state,
    updateUser: (user: User) => {
      state.set(user)
    }
  }
}
