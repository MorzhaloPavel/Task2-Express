import { Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import User from './user.model.js';
import * as usersService from './user.service.js';
import { errorResponse } from '../../utils/errorResponse.js';
const router = Router();
router.route('/').get(async (_req, res) => {
    const users = await usersService.getAll();
    if (!users)
        return errorResponse(res, StatusCodes.NOT_FOUND);
    return res.status(StatusCodes.OK).json(users.map(User.toResponse));
});
router
    .route('/:id')
    .get(async (req, res, next) => {
    await usersService.get(req.params["id"]).then(user => {
        res.status(200).json(User.toResponse(user));
    }).catch(next);
});
router.route('/').post(async (req, res) => {
    const user = await usersService.create(new User({ ...req.body }));
    if (!user)
        return errorResponse(res, StatusCodes.BAD_REQUEST);
    return res.status(StatusCodes.CREATED).json(User.toResponse(user));
});
router
    .route('/:id')
    .put(async (req, res) => {
    const { id } = req.params;
    if (!id)
        return errorResponse(res, StatusCodes.BAD_REQUEST);
    const userData = req.body;
    const user = await usersService.update(id, userData);
    if (!user)
        return errorResponse(res, StatusCodes.BAD_REQUEST);
    return res.status(StatusCodes.OK).json(User.toResponse(user));
});
router
    .route('/:id')
    .delete(async (req, res) => {
    const { id } = req.params;
    if (!id)
        return errorResponse(res, StatusCodes.BAD_REQUEST);
    const answer = await usersService.remove(id);
    if (!answer.every((item) => !!item)) {
        return errorResponse(res, StatusCodes.NOT_FOUND);
    }
    return res.status(StatusCodes.NO_CONTENT).send();
});
export { router };
