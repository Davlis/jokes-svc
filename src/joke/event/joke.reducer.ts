import { IDependencyInjectionContext } from '../../createDiContext'
import { jokeActions } from './joke.actions'

export type IEventMessage = string

export interface IEvent {
  event: string
  data: IEmailData
}

export interface IEmailData {
  from: string
  to: string
}

export default function createJokeReducer(diContext: IDependencyInjectionContext) {
  diContext.logger.debug('event/createJokeReducer : creating joke reducer')

  return async function jokeReducer(event: IEventMessage): Promise<any> {
    const { logger } = diContext

    logger.debug('event/jokeReducer : handling event', { event })
    let decodedEvent: IEvent
    try {
      decodedEvent = JSON.parse(event)
    } catch (error) {
      logger.error('event/jokeReducer: error while parsing event value', { error })
      return () => {}
    }

    return jokeActions[decodedEvent.event](diContext, decodedEvent.data)
  }
}
