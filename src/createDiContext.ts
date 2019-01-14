import { Logger } from 'winston'
import { createLogger } from './common/lib'
import { DadJokesServiceClient, EmailServiceClient } from './common/services'

import { IEventClient } from './common/lib/createEventClient'
import createEventProducer from './createEventProducer'

import {
  DADJOKES_SERVICE_URL,
  AMQP_CONNECTION_URL
} from './config'

export interface IDependencyInjectionContext {
  logger: Logger
  dadJokesServiceClient: DadJokesServiceClient
  eventService: IEventClient
  emailServiceClient: EmailServiceClient
}

async function createDiContext(): Promise<IDependencyInjectionContext> {
  const logger: Logger = createLogger()
  const dadJokesServiceClient: DadJokesServiceClient = new DadJokesServiceClient(logger, DADJOKES_SERVICE_URL)
  const eventService: IEventClient = await createEventProducer(logger, AMQP_CONNECTION_URL)
  const emailServiceClient: EmailServiceClient = new EmailServiceClient(logger, eventService)

  const diContext: IDependencyInjectionContext = {
    logger,
    dadJokesServiceClient,
    eventService,
    emailServiceClient
  }

  return diContext
}

export default createDiContext
