import { createLogger, format, transports, addColors } from "winston";
import {
  FLUENTD_HOST,
  FLUENTD_LOG_PREFIX,
  FLUENTD_PORT,
  APP_NAME,
  MODE,
} from "./config";

import fluentLogger from "fluent-logger";

const winstonTransportConfigFactory = (type) => {
  // https://github.com/bithavoc/express-winston/issues/189
  addColors({
    error: "red",
    warn: "yellow",
    info: "cyan",
    debug: "green",
  });
  if (type === "file")
    return {
      //store warn and above locally
      filename: "./logs/local.log",
      level: "warn",
      colorize: false,
    };
  if (type === "console")
    return {
      colorize: true,
    };
  if (type === "fluentd")
    return {
      colorize: false,
      format: format.json(),
    };
};
let fluent;
try {
  const fluent = new (fluentLogger.support.winstonTransport(
    winstonTransportConfigFactory("fluentd")
  ))(`${APP_NAME}.${FLUENTD_LOG_PREFIX}`, {
    host: FLUENTD_HOST,
    port: FLUENTD_PORT,
    timeout: 3.0,
    requireAckResponse: true,
  });
} catch (e) {
  console.error(e);
}
const transportsList = [
  new transports.Console(winstonTransportConfigFactory("console")),
  new transports.File(winstonTransportConfigFactory("file")),
  new transports.Http({
    host: FLUENTD_HOST,
    port: 5170,
  }),
];

if (fluent) {
  transportsList.push(fluent);
}
const logger = createLogger({
  level: "debug",
  exitOnError: false,
  format:
    MODE === "local"
      ? format.combine(format.simple(), format.colorize())
      : format.json(),
  transports: transportsList,
});

logger.on("error", (error) => {
  console.log("Error in loggger: ", error);
});

logger.on("flush", () => {
  console.log("Flush");
});

// logger.on("finish", () => {
//   if (fluent) {
//     console.log(`Finish: ${fluent.sender}`);
//     fluent.sender.end("end", {}, () => {});
//   }
// });

export default logger;

/***
 * use logger.info for runtime notices, logger.debug for debugging
 * logger.warn and logger.error should be used appropriately and will
 * be cached to the /logs folder. All logs will be picked up by fluentd
 ***/
