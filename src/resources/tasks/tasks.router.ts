import Express, { Router } from 'express';
import * as tasksService from './tasks.service';
import Task from './tasks.model';

const router: Express.Router = Router({ mergeParams: true });

router.route('/').get(async (req: Express.Request, res: Express.Response, next: Express.NextFunction) => {
  await tasksService.getAll(req.params["boardId"]).then(tasks => 
    res.status(200).json(tasks.map(Task.toResponse))
  ).catch(next)
});

router
  .route('/:taskId')
  .get(async (req: Express.Request, res: Express.Response, next: Express.NextFunction) => {
    await tasksService.get(req.params["boardId"], req.params["taskId"]).then(task => 
      res.status(200).json(task)
    ).catch(next);
  });

router.route('/').post(async (req: Express.Request, res: Express.Response, next: Express.NextFunction) => {
  await tasksService.create(req.body, req.params['boardId']).then(task => 
    res.status(201).json(Task.toResponse((task as Task)))
  ).catch(next)
});

router
  .route('/:taskId')
  .put(async (req: Express.Request, res: Express.Response, next: Express.NextFunction) => {
    await tasksService.update(req.params["boardId"], req.params["taskId"], req.body).then(task => 
      res.status(200).json(Task.toResponse((task as Task)))
    ).catch(next)
  });

router
  .route('/:taskId')
  .delete(async (req: Express.Request, res: Express.Response, next: Express.NextFunction) => {
    await tasksService.remove(req.params["boardId"], req.params["taskId"]).then(() => 
      res.status(200).send()
    ).catch(next)
  });

export { router };
