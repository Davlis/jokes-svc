import { createLogger, format, Logger, transports } from 'winston'
import { LOG_LEVEL } from '../../config'

export default function createLogger_(): Logger {
  const logger: Logger = createLogger({
    level: LOG_LEVEL,
    format: format.json(),
    transports: [
      new transports.Console({
        format: format.combine(
          format.timestamp(),
          format.printf(info => `${info.timestamp} [${info.level}]: ${info.message}`)
        )
      })
    ]
  })

  logger.info(`common/lib/createLogger : created with log level "${LOG_LEVEL}"`)

  return logger
}
