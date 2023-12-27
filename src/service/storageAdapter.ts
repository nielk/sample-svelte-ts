import { type UserStorageService } from '../application/ports'
import { useStore } from './store'

export function useUserStorage(): UserStorageService {
  return useStore()
}
