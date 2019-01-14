import { Logger } from 'winston'

export interface IEvent {
  event: string
  data: any
}

export interface IEventService {
  logger: Logger
  config: { [key: string]: any }
  publishEvent: (topic: string, event: IEvent) => Promise<IEvent>
  subscribeToTopics: (topics: string[], reducer: any) => Promise<boolean>
}

export enum EventType {
  SEND_EMAIL = 'SEND_EMAIL'
}
