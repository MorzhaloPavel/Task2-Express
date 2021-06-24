import Express, { Router } from 'express';
import * as loginService from './login.service'

const router: Express.Router = Router();

router.route('/')
  .post(async (req: Express.Request, res: Express.Response, next: Express.NextFunction) => {    
  await loginService.loginUser(req.body).then(token1 => 
    res.status(200).json({token: token1})
  ).catch(next)
});

export { router };