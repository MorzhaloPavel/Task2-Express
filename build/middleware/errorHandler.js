import { INTERNAL_SERVER_ERROR, getStatusText } from 'http-status-codes';
import logger from '../utils/logger.js';
const errorHandler = (err, _req, res, next) => {
    if (err.status) {
        res.status(err.status).send(err.message);
    }
    else {
        logger.error(getStatusText(INTERNAL_SERVER_ERROR));
        res
            .status(INTERNAL_SERVER_ERROR)
            .send(getStatusText(INTERNAL_SERVER_ERROR));
    }
    next();
};
export default errorHandler;
