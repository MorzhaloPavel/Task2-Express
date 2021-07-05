import Express, { Router } from 'express';
import * as loginService from './login.service'

const router: Express.Router = Router();

router.route('/')
  .post(async (req: Express.Request, res: Express.Response, next: Express.NextFunction) => {    
  await loginService.loginUser(req.body).then(token => 
    res.status(200).json({token})
  ).catch(next)
});

export { router };