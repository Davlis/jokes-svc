import amqp, { Connection, ConsumeMessage } from 'amqplib'
import { Logger } from 'winston'

export interface IEventClient {
  connection: Connection
  subscribeToQueue: ISubscribeToQueueSignature
  publishEvent: IPublishEventSignature
}

export interface IAmqpEvent {
  content: Buffer
}

export type IReducerSignature = (data: any) => any
export type ISubscribeToQueueSignature = (queue: string, reducer: IReducerSignature) => void
export type IPublishEventSignature = (queue: string, data: any) => void

async function createEventClient(logger: Logger, CONNECTION_URL: string): Promise<IEventClient> {
  logger.debug(`lib/createEventClient: connecting to ${CONNECTION_URL}`)

  const connection: Connection = await amqp.connect(CONNECTION_URL)

  logger.debug(`lib/createEventClient: succesfully connected to ${CONNECTION_URL}`)

  return {
    connection,
    subscribeToQueue: (queue: string, reducer: IReducerSignature) =>
      subscribeToQueue(logger, connection, queue, reducer),
    publishEvent: (queue: string, data: any) => publishEvent(logger, connection, queue, data)
  }
}

export async function subscribeToQueue(
  logger: Logger,
  connection: Connection,
  queue: string,
  reducer: IReducerSignature
): Promise<void> {
  logger.debug(`lib/createEventClient/subscribeToQueue: subscribing to queue ${queue}`)

  const queueOptions = { durable: false }
  const channel = await connection.createChannel()
  channel.assertQueue(queue, queueOptions)

  const consumeOption = { noAck: true }
  channel.consume(
    queue,
    (data: ConsumeMessage | null) => {
      logger.debug(`lib/createEventClient/subscribeToQueue: getting data from ${queue}`)

      if (data !== null) {
        const content = data.content.toString()

        logger.debug(`lib/createEventClient/subscribeToQueue: consumed data from ${queue}: ${content}`)
  
        reducer(content)
      }
    },
    consumeOption
  )
}

export async function publishEvent(logger: Logger, connection: Connection, queue: string, data: any): Promise<void> {
  logger.debug(`lib/createEventClient/publishEvent: publishing - queue ${queue}, data ${JSON.stringify(data)}`)

  const queueOptions = { durable: false }

  const channel = await connection.createChannel()
  await channel.assertQueue(queue, queueOptions)

  await channel.sendToQueue(queue, Buffer.from(JSON.stringify(data)))

  logger.debug('lib/createEventClient/publishEvent: published succesfully')
}

export default createEventClient
