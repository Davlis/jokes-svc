import { Logger } from 'winston'
import { IEventClient } from '../lib/createEventClient'
import { AMQP_MAILING_QUEUE } from '../../config'

const EventType = {
  SEND_EMAIL: 'SEND_EMAIL'
}

class EmailServiceClient {
  constructor(private logger: Logger, private eventClient: IEventClient) { }

  public sendEmail(
    from: string,
    to: string,
    subject: string,
    text: string
  ) {
    const data = {
      from,
      to,
      subject,
      text
    }

    this.logger.info('services/emailServiceClient: creating email message')
    return this.eventClient.publishEvent(AMQP_MAILING_QUEUE, {
      event: EventType.SEND_EMAIL,
      data
    })
  }
}

export default EmailServiceClient
