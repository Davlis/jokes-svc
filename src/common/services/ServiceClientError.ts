import { Response } from 'node-fetch'

export enum ServiceClientErrorType {
  NotFound,
  Invalid,
  Forbidden,
  Unknown
}

class ServiceClientError extends Error {
  public readonly name = 'ServiceClientError'

  constructor(
    readonly type: ServiceClientErrorType,
    readonly response: Response | null = null,
    readonly responsePayload: any | null = null
  ) {
    super()
  }
}

export default ServiceClientError
