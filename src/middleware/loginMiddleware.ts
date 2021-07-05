import Express from 'express';
import jwt from 'jsonwebtoken'
import {getManager} from "typeorm";
import User from '../entity/user';

const loginMiddleware = async (req: Express.Request, res: Express.Response, next: Express.NextFunction): Promise<void> => {
  if(req.method === 'OPTIONS') {
    next()
  } else {

    const auth = req.headers.authorization

    if(!auth) {
      res.status(401).json({message: "Unauthorized error"})
      return 
    }
    if(auth.split(' ')[0] !== 'Bearer') {
      res.status(401).json({message: "Unauthorized error"})
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
            res.status(401).json({message: "Unauthorized error"})
          }
        })
      } else {
          res.status(401).json({message: "Unauthorized error"})
        }
      }
    );
  }
}

export default loginMiddleware