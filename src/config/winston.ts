import winston from "winston";

export default winston.createLogger({
  transports: [new winston.transports.Console()],
});
