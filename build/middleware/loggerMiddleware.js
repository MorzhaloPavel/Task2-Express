import { finished } from 'stream';
import logger from '../utils/logger.js';
const loggerMiddleware = (req, res, next) => {
    if (req.originalUrl === '/') {
        res.send('Service is running!');
        return;
    }
    const { method, url, body, query } = req;
    const start = Date.now();
    next();
    finished(res, () => {
        const ms = Date.now() - start;
        const { statusCode } = res;
        logger.info(`method: ${method}, URL: ${decodeURI(url)}, query parameters: ${JSON.stringify(query)}, request body: ${JSON.stringify(body)}, ${statusCode}, [${ms}ms]`);
    });
};
export default loggerMiddleware;
