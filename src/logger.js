// Winston - logger application: https://github.com/winstonjs/winston
// Logger robusto e preparado para fazer o log aplicacional de tudo que acontece na nossa aplicação (ex: error, message, warning, etc) e serve para substituir o console.log

import { createLogger, format, transports } from "winston";

const logger = createLogger({
  level: "info", // Log no nível informativo
  format: format.json(),
  transports: [
    //
    // - Write all logs with importance level of `error` or less to `error.log`
    // - Write all logs with importance level of `info` or less to `combined.log`
    //
    new transports.File({ filename: "error.log", level: "error" }),
    new transports.File({ filename: "combined.log" }),
  ],
});

export default logger;
