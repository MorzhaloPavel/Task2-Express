import {getManager} from "typeorm";
import { IUser } from '../../types';
import ErrorNotFound from '../../utils/ErrorNotFound';
import User from './user.model';

const getAll = async (): Promise<IUser[]> => {
  const userRepository = getManager().getRepository(User);
  const user = userRepository.find()
  return user
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
  const newUser = await userRepository.create(user)
  await userRepository.save(newUser);
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
  await userRepository.save(user);
  if(!user){
    throw new ErrorNotFound("Not Found!");
  }
  return user;
};

const remove = async (userId: string): Promise<boolean> => {
  const userRepository = getManager().getRepository(User);
  const user = await userRepository.findOne(userId)
  await userRepository.delete(userId)
  if(!user){
    throw new ErrorNotFound("Not Found!");
  }
  return !!user
};

export { getAll, get, create, update, remove };
