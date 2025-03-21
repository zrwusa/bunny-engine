import pino from 'pino';
import * as fs from 'fs';
import * as path from 'path';
import { multistream } from 'pino-multi-stream';

const appRoot = process.cwd();
const logsDir = path.join(appRoot, 'logs');
const logFilePath = path.join(logsDir, 'bunny-rest.log');

if (!fs.existsSync(logsDir)) fs.mkdirSync(logsDir);
if (!fs.existsSync(logFilePath)) fs.writeFileSync(logFilePath, '');

const isProduction = process.env.NODE_ENV === 'production';

const logFileStream = fs.createWriteStream(logFilePath, { flags: 'a' });

const streams = [];

if (!isProduction) {
    streams.push({
        stream: pino.transport({
            target: 'pino-pretty'
        }),
    });
}

streams.push({ stream: logFileStream });

const logger = pino({
    level: isProduction ? 'info' : 'debug',
    timestamp: pino.stdTimeFunctions.isoTime,
    base: { pid: false },
}, multistream(streams));

export default logger;
export { logger };
