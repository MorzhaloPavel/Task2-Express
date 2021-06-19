import Express, { Router } from 'express';
import * as boardsService from './boards.service';

const router: Express.Router = Router();

router.route('/').get(async (_req: Express.Request, res: Express.Response, next: Express.NextFunction) => {
  await boardsService.getAll().then(boards => 
    res.status(200).json(boards)
  ).catch(next)
});

router
  .route('/:id')
  .get(async (req: Express.Request, res: Express.Response, next: Express.NextFunction) => {
    await boardsService.get(req.params["id"]).then(board => {
      res.status(200).json(board)
    }).catch(next)
  });

router.route('/').post(async (req: Express.Request, res: Express.Response, next: Express.NextFunction) => {
  await boardsService.create(req.body).then(board => 
    res.status(201).json(board)
  ).catch(next)
});

// router
//   .route('/:id')
//   .put(async (req: Express.Request, res: Express.Response, next: Express.NextFunction) => {
//     await boardsService.update(req.params["id"], req.body).then(board => 
//       res.status(200).json(board)
//     ).catch(next)
//   });

router
  .route('/:id')
  .delete(async (req: Express.Request, res: Express.Response, next: Express.NextFunction) => {
    await boardsService.remove(req.params["id"]).then(() => 
      res.status(200).send()
    ).catch(next)
  });

export { router };
