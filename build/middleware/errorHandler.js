import logger from '../utils/logger.js';
const errorHandler = (err, _req, res, next) => {
    logger.error(err);
    res.status(err.status || 500).send({ error: {
            error: err.status || 500,
            message: err.message || 'Oppss!'
        } });
    next();
};
export default errorHandler;
