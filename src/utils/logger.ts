import pkg from 'winston';

const { createLogger, format, transports } = pkg;

const logger = createLogger({
  level: 'silly',
  format: format.combine(format.colorize(), format.cli()),
  transports: [
    // new transports.Console(),
    new transports.File({
      filename: './logger/error.log',
      level: 'error',
      format: format.combine(
        format.uncolorize(),
        format.json()
      )
    }),
    new transports.File({
      filename: './logger/info.log',
      level: 'info',
      format: format.combine(
        format.uncolorize(), 
        format.json()
      )
    })
  ]
});

export default logger;
