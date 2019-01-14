import { IDependencyInjectionContext } from '../../createDiContext'
import { sendJokeCommand } from './sendJoke.command'

export interface IEmailData {
  from: string,
  to: string,
}

export const jokeActions: {
  [key: string]: (diContext: IDependencyInjectionContext, data: IEmailData) => any
} = {
  SEND_JOKE: sendJokeCommand
}
