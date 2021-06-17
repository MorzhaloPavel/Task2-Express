import {getManager} from "typeorm";
import { IUser } from '../../types';
import ErrorNotFound from '../../utils/ErrorNotFound';
import User from './user.model';

const getAll = async (): Promise<IUser[]> => {
  const userRepository = getManager().getRepository(User);
  const users = await  userRepository.find()
  if(!users){
    throw new ErrorNotFound("Not Found!");
  }
  return users
}

const get = async (id: string): Promise<IUser> => {
  const userRepository = getManager().getRepository(User);
  const user = await userRepository.findOne(id)
  if(!user){
    throw new ErrorNotFound("Not Found!");
  }
  return user
}
  
const create = async (user: IUser): Promise<IUser | undefined> => {
  const userRepository = getManager().getRepository(User);
  const userCreate = await userRepository.create(user)
  const newUser = await userRepository.save(userCreate);
  if(!newUser){
    throw new ErrorNotFound("Not Found!");
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
    throw new ErrorNotFound("Not Found!");
  }
  return userUpdate;
};

const remove = async (userId: string): Promise<boolean> => {
  const userRepository = getManager().getRepository(User);
  const userRemove = await userRepository.delete(userId)
  if(!userRemove){
    throw new ErrorNotFound("Not Found!");
  }
  return !!userRemove
};

export { getAll, get, create, update, remove };
