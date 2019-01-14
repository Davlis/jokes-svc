import ServiceClient from './ServiceClient'

export interface IGetDadJokeResponse {
  id: string
  joke: string
  status: number
}

class DadJokesServiceClient extends ServiceClient {
  public async getJoke(): Promise<IGetDadJokeResponse> {
    return this.request<void, IGetDadJokeResponse>('get', '/', null, {
      Accept: 'application/json'
    })
  }
}

export default DadJokesServiceClient
