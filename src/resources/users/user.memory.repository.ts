import {getManager} from "typeorm";
import bcrypt from "bcrypt";
import { IUser } from '../../utils/types';
import ApiErroe from '../../utils/ApiErroe';
import User from '../../entity/user';

const getAll = async (): Promise<IUser[]> => {
  const userRepository = getManager().getRepository(User);
  const users = await  userRepository.find()
  if(!users){
    throw ApiErroe.badRequest("Not Found!");
  }
  return users
}

const get = async (id: string): Promise<IUser> => {
  const userRepository = getManager().getRepository(User);
  const user = await userRepository.findOne(id)
  if(!user){
    throw ApiErroe.badRequest("Not Found!");
  }
  return user
}
  
const create = async (user: IUser): Promise<IUser | undefined> => {
  const userRepository = getManager().getRepository(User);
  const userCreate = await userRepository.create({
    name: user.name,
    login: user.login,
    password: bcrypt.hashSync(user.password, 8)
  })
  const newUser = await userRepository.save(userCreate);
  if(!newUser){
    throw ApiErroe.badRequest("Not Found!");
  }
  return newUser
};

const update = async (
  id: string,
  userData: IUser
): Promise<IUser | null | undefined> => {
  const userRepository = getManager().getRepository(User);
  let user = await userRepository.findOne(id)
  user = {...user, ...userData}
  const userUpdate = await userRepository.save(user);
  if(!userUpdate){
    throw ApiErroe.badRequest("Not Found!");
  }
  return userUpdate;
};

const remove = async (userId: string): Promise<boolean> => {
  const userRepository = getManager().getRepository(User);
  const userRemove = await userRepository.delete(userId)
  if(!userRemove){
    throw ApiErroe.badRequest("Not Found!");
  }
  return !!userRemove
};

export { getAll, get, create, update, remove };
