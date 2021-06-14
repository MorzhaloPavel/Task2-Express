import { Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as tasksService from './tasks.service.js';
import Task from './tasks.model.js';
import { errorResponse } from '../../utils/errorResponse.js';
const router = Router({ mergeParams: true });
router.route('/').get(async (req, res) => {
    const { boardId } = req.params;
    if (!boardId)
        return errorResponse(res, StatusCodes.BAD_REQUEST);
    const tasks = await tasksService.getAll(boardId);
    if (!tasks)
        return errorResponse(res, StatusCodes.NOT_FOUND);
    return res.status(StatusCodes.OK).json(tasks);
});
router
    .route('/:taskId')
    .get(async (req, res, next) => {
    await tasksService.get(req.params["boardId"], req.params["taskId"]).then(task => {
        res.status(200).json(task);
    }).catch(next);
});
router.route('/').post(async (req, res) => {
    const { boardId } = req.params;
    const task = await tasksService.create(new Task({
        ...req.body,
        boardId,
    }));
    if (!task)
        return errorResponse(res, StatusCodes.BAD_REQUEST);
    return res.status(StatusCodes.CREATED).json(task);
});
router
    .route('/:taskId')
    .put(async (req, res) => {
    const { taskId, boardId } = req.params;
    if (!taskId || !boardId)
        return errorResponse(res, StatusCodes.BAD_REQUEST);
    const taskData = req.body;
    const task = await tasksService.update(boardId, taskId, taskData);
    if (!task)
        return errorResponse(res, StatusCodes.BAD_REQUEST);
    return res.status(StatusCodes.OK).json(task);
});
router
    .route('/:taskId')
    .delete(async (req, res) => {
    const { taskId, boardId } = req.params;
    if (!taskId || !boardId)
        return errorResponse(res, StatusCodes.BAD_REQUEST);
    const isSuccess = await tasksService.remove(boardId, taskId);
    if (!isSuccess) {
        return errorResponse(res, StatusCodes.NOT_FOUND);
    }
    return res.status(StatusCodes.NO_CONTENT).send();
});
export { router };
