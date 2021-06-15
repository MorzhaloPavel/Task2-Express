import Express, { Router } from 'express';
import User from './user.model';
import * as usersService from './user.service';

const router: Express.Router = Router();

router.route('/')
  .get(async (_req: Express.Request, res: Express.Response, next: Express.NextFunction) => {
  await usersService.getAll().then(users => 
    res.status(200).json((users as User[]).map(User.toResponse))
  ).catch(next)
});

router.route('/:id')
  .get(async (req: Express.Request, res: Express.Response, next: Express.NextFunction) => {
     await usersService.get(req.params["id"]).then(user => {
       res.status(200).json(User.toResponse((user as User)))
     }).catch(next)
  });

router.route('/')
  .post(async (req: Express.Request, res: Express.Response, next: Express.NextFunction) => {
  await usersService.create(req.body).then(user => 
    res.status(201).json(User.toResponse((user as User)))
  ).catch(next)
});

router.route('/:id')
  .put(async (req: Express.Request, res: Express.Response, next: Express.NextFunction) => {
    await usersService.update(req.params["id"], req.body).then(user => 
      res.status(200).json(User.toResponse((user as User)))
    ).catch(next)
  });

router.route('/:id')
  .delete(async (req: Express.Request, res: Express.Response, next: Express.NextFunction) => {
    await usersService.remove(req.params["id"]).then(() => 
      res.status(200).send()
    ).catch(next)
  });

export { router };
