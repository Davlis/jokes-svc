import sendJoke from '../processors/sendJoke'
import { IDependencyInjectionContext } from '../../createDiContext'
import { IEmailData } from './joke.actions'
import { IGetDadJokeResponse } from '../../common/services';

export function sendJokeCommand(diContext: IDependencyInjectionContext, emailData: IEmailData): Promise<IGetDadJokeResponse> {
  return sendJoke(diContext, emailData)
}
