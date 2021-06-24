import Express from 'express';
import jwt from 'jsonwebtoken'
import {getManager} from "typeorm";
// import ErrorNotFound from '../utils/ErrorNotFound';
import User from '../entity/user';


const loginMiddleware = async (req: Express.Request, res: Express.Response, next: Express.NextFunction): Promise<void> => {
  if(req.method === 'OPTIONS') {
    next()
  } else {
    const auth = req.headers.authorization

    if(!auth && auth.split(' ')[0] !== 'Bearer') {
      res.status(401).json({message: "Не авторизован"})
      return 
    }
    
    const token = auth.split(' ')[1]

    jwt.verify(token, process.env['JWT_SECRET_KEY'], (_err, decoded) => {
      if(decoded){
        const userRepository = getManager().getRepository(User);
        userRepository.findOne( {id: decoded['userId']}).then( user => {
          if(user) {
            next()
          } else {
            res.status(403).json({message: "Не авторизован"})
          }
        })} else {
          res.status(401).json({message: "Не авторизован"})
        }
      }
    );
  }
}

export default loginMiddleware