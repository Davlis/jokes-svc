import jokes from './stubs/jokes'

class DadJokesServiceClientMock {
  public getJoke = jest.fn(() => {
    return jokes
  })
}

export default DadJokesServiceClientMock as any
