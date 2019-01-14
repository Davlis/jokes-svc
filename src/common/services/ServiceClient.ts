import { default as fetch, Request, RequestInit, Response } from 'node-fetch'
import { Logger } from 'winston'
import ServiceClientError, { ServiceClientErrorType } from './ServiceClientError'

class ServiceClient {
  constructor(private readonly logger: Logger, public readonly endpointUrl: string) {}

  public async request<T, TR>(
    method: string,
    path: string,
    payload: T | null = null,
    headers: object = {}
  ): Promise<TR> {
    const requestUrl: string = `${this.endpointUrl}${path}`
    const requestOptions: RequestInit = {
      method,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        ...headers
      }
    }

    if (payload !== null) {
      requestOptions.body = JSON.stringify(payload)
    }

    this.logger.debug(`common/services/ServiceClient : performing request`, {
      url: requestUrl,
      method,
      headers: requestOptions.headers
    })

    const request: Request = new Request(requestUrl, requestOptions)

    let response: Response
    try {
      response = await fetch(request)
    } catch (error) {
      this.logger.error('common/services/ServiceClient : error while performing request', { error })
      throw new ServiceClientError(ServiceClientErrorType.Unknown)
    }

    let responsePayload: TR
    try {
      responsePayload = (await response.json()) as TR
    } catch (error) {
      this.logger.error('common/services/ServiceClient : error while decoding response body', { error })
      throw new ServiceClientError(ServiceClientErrorType.Unknown, response)
    }

    this.logger.debug('common/services/ServiceClient : response', { status: response.status })

    switch (response.status) {
      case 200:
      case 201: {
        return responsePayload
      }
      case 400: {
        throw new ServiceClientError(ServiceClientErrorType.Invalid, response, responsePayload)
      }
      case 403: {
        throw new ServiceClientError(ServiceClientErrorType.Forbidden, response, responsePayload)
      }
      case 404: {
        throw new ServiceClientError(ServiceClientErrorType.NotFound, response, responsePayload)
      }
      case 500:
      default: {
        throw new ServiceClientError(ServiceClientErrorType.Unknown, response, responsePayload)
      }
    }
  }
}

export default ServiceClient
