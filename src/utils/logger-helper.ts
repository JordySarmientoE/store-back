import winston from "winston";

const customLevels = {
  levels: {
    fatal: 0,
    critical: 1,
    error: 2,
    warn: 3,
    notice: 4,
    info: 5,
    debug: 6,
  },
  colors: {
    fatal: "red",
    critical: "magenta",
    error: "red",
    warn: "yellow",
    notice: "blue",
    info: "green",
    debug: "white",
  },
};

const Logger = winston.createLogger({
  levels: customLevels.levels,
  level: "debug",
  format: winston.format.combine(
    winston.format.json(),
    winston.format.timestamp(),
    winston.format.printf(({ level, message, timestamp }: any) => {
      const logMessage = typeof message === "object" ? JSON.stringify(message) : message;
      return `[${timestamp}] ${level}: ${logMessage}`;
    })
  ),
  transports: [new winston.transports.Console()],
});

export default Logger;
