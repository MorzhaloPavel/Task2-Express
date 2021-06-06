import { getReasonPhrase } from 'http-status-codes';
export const errorResponse = (res, code) => res.status(code).json({ message: getReasonPhrase(code) });
