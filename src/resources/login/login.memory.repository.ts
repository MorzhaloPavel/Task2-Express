import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import {getManager} from "typeorm";
import User from '../../entity/user';
import ApiErroe from '../../utils/ApiErroe';
import { ILogin } from '../../types';

const loginUser = async (userLogin: ILogin): Promise<string | undefined> => {
  const {login, password} = userLogin
  const userRepository = getManager().getRepository(User);
  const user = await userRepository.findOne({login})
  if(!user){
    throw ApiErroe.forbidden("Пользователь не найден")
  }
  const comparePassword = bcrypt.compareSync(password, user.password)
  if (!comparePassword) {
    throw ApiErroe.forbidden("Указан не верный пароль")
  }
  const token = jwt.sign({userId: user.id, login: user.login}, process.env['JWT_SECRET_KEY'], { expiresIn: '24h' })
  return token
} 

export {loginUser}