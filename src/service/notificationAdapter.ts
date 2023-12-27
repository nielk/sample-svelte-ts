import { Context } from 'effect'

import { type NotificationService } from '../application/ports'

export const Notifier = Context.Tag<NotificationService>()

export const NotifierLive = Notifier.of({
  notify: (message: string) => {
    console.log(message)
  }
})
