import dotenv from 'dotenv'
dotenv.load()

export const LOG_LEVEL: string = process.env.LOG_LEVEL as string
export const AMQP_CONNECTION_URL: string = process.env.AMQP_CONNECTION_URL as string
export const AMQP_JOKE_QUEUE: string = process.env.AMQP_JOKE_QUEUE as string
export const AMQP_MAILING_QUEUE: string = process.env.AMQP_MAILING_QUEUE as string
export const DADJOKES_SERVICE_URL: string = process.env.DADJOKES_SERVICE_URL as string
