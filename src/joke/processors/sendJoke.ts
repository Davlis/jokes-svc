import { IGetDadJokeResponse } from '../../common/services'
import { IDependencyInjectionContext } from '../../createDiContext'

export interface ISendSettings {
  from: string
  to: string
}

async function getJoke(
  diContext: IDependencyInjectionContext,
  sendSettings: ISendSettings
): Promise<IGetDadJokeResponse> {
  const { logger, emailServiceClient, dadJokesServiceClient } = diContext

  logger.debug('processors/sendJoke: starting processing')

  const joke: IGetDadJokeResponse = await dadJokesServiceClient.getJoke()

  await emailServiceClient.sendEmail(
    sendSettings.from,
    sendSettings.to,
    'Hahaha check this out',
    joke.joke
  )

  return joke
}

export default getJoke
