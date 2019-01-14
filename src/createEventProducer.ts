import createEventClient, { IEventClient } from './common/lib/createEventClient'
import { Logger } from 'winston'

function createEventProducer(logger: Logger, AMQP_CONNECTION_URL: string): Promise<IEventClient> {
  return createEventClient(logger, AMQP_CONNECTION_URL)
}

export default createEventProducer
