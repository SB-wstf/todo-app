import winston from "winston";
import path from "path";

// Define the logs directory
const logsDirectory = path.join(__dirname, "../../logs");

const logger = winston.createLogger({
    level: "info",
    transports: [
        new winston.transports.Console({
            format: winston.format.combine(winston.format.colorize(), winston.format.simple()),
        }),
        new winston.transports.File({
            filename: path.join(logsDirectory, "testLog.log"),
            format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
        }),
    ],
});

// Ensure the logs directory exists
import fs from "fs";
if (!fs.existsSync(logsDirectory)) {
    fs.mkdirSync(logsDirectory);
}

export default logger;
