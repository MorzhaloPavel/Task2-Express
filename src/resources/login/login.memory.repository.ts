import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import {getManager} from "typeorm";
import User from '../../entity/user';
import ErrorNotFound from '../../utils/ErrorNotFound';
import { ILogin } from '../../types';

const loginUser = async (userLogin: ILogin): Promise<string | undefined> => {
  const {login, password} = userLogin
  const userRepository = getManager().getRepository(User);
  const user = await userRepository.findOne({where: {login}})
  if(!user){
    throw new ErrorNotFound("Пользователь не найден"); 
  }
  const comparePassword = bcrypt.compareSync(password, user.password)
  if (!comparePassword) {
    throw new ErrorNotFound("Указан не верный пароль");
  }
  const token = jwt.sign({userId: user.id, login: user.login}, process.env['JWT_SECRET_KEY'], { expiresIn: 60 * 60 * 24 * 24 })
  return token
} 

export {loginUser}