import createDiContext, { IDependencyInjectionContext } from './createDiContext'

import createEventClient, { IEventClient } from './common/lib/createEventClient'

import { AMQP_CONNECTION_URL, AMQP_JOKE_QUEUE } from './config'
import createJokeReducer from './joke/event/joke.reducer';

const createEventConsumerService = (diContext: IDependencyInjectionContext): Promise<IEventClient> => {
  return createEventClient(diContext.logger, AMQP_CONNECTION_URL)
}

async function main(): Promise<void> {
  const diContext: IDependencyInjectionContext = await createDiContext()
  const { logger } = diContext

  const eventService = await createEventConsumerService(diContext)

  try {
    await Promise.all([
      eventService.subscribeToQueue(AMQP_JOKE_QUEUE, createJokeReducer(diContext))
    ])
    logger.debug('index : Joke service started')
  } catch (error) {
    logger.error(`index: error occured in Joke service ${error.message}`)
  }
}

main().catch(
  (error: Error): void => {
    console.log(error) // tslint:disable-line:no-console
    process.exit(1)
  }
)
