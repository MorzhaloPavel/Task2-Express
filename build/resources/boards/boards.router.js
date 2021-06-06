import { Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import { Board } from './boards.model.js';
import * as boardsService from './boards.service.js';
import { errorResponse } from '../../utils/errorResponse.js';
const router = Router();
router.route('/').get(async (_req, res) => {
    const boards = await boardsService.getAll();
    if (!boards)
        return errorResponse(res, StatusCodes.NOT_FOUND);
    return res.status(StatusCodes.OK).json(boards);
});
router
    .route('/:id')
    .get(async (req, res) => {
    const { id } = req.params;
    if (!id)
        return errorResponse(res, StatusCodes.BAD_REQUEST);
    const board = await boardsService.get(id);
    if (!board)
        return errorResponse(res, StatusCodes.NOT_FOUND);
    return res.status(StatusCodes.OK).json(board);
});
router.route('/').post(async (req, res) => {
    const board = await boardsService.create(new Board({ ...req.body }));
    if (!board)
        return errorResponse(res, StatusCodes.BAD_REQUEST);
    return res.status(StatusCodes.CREATED).json(board);
});
router
    .route('/:id')
    .put(async (req, res) => {
    const { id } = req.params;
    if (!id)
        return errorResponse(res, StatusCodes.BAD_REQUEST);
    const newData = await boardsService.update(id, req.body);
    if (!newData)
        return errorResponse(res, StatusCodes.BAD_REQUEST);
    return res.status(StatusCodes.OK).json(newData);
});
router
    .route('/:id')
    .delete(async (req, res) => {
    const { id } = req.params;
    if (!id)
        return errorResponse(res, StatusCodes.BAD_REQUEST);
    const answer = await boardsService.remove(id);
    if (!answer.every((item) => item)) {
        return errorResponse(res, StatusCodes.NOT_FOUND);
    }
    return res.status(StatusCodes.NO_CONTENT).send();
});
export { router };
