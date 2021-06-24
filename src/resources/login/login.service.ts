import * as loginRepo from './login.memory.repository';
import { ILogin } from '../../utils/types';

const loginUser = (user: ILogin): Promise<string | undefined> =>
loginRepo.loginUser(user);

export {loginUser}