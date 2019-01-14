class LoggerMock {
  public silly = jest.fn()
  public debug = jest.fn()
  public info = jest.fn()
  public warn = jest.fn()
  public error = jest.fn()
}

export default LoggerMock as any
