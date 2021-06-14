import { memoryDb } from '../../memoryDb/memoryDb.js';
import ErrorNotFound from '../../utils/ErrorNotFound.js';
const { users } = memoryDb;
const getAll = async () => [...users];
const get = async (id) => {
    const user = await users.filter(us => us.id === id);
    if (!user) {
        throw new ErrorNotFound("Not Found!");
    }
    return user[0];
};
const create = async (user) => {
    users.push(user);
    return get(user.id);
};
const update = async (id, userData) => {
    const index = users.findIndex((user) => user.id === id);
    if (index !== -1) {
        users[index] = { ...users[index], ...userData, id };
        return get(id);
    }
    return null;
};
const remove = async (userId) => {
    const index = users.findIndex((user) => user.id === userId);
    if (index === -1)
        return false;
    return !!users.splice(index, 1).length;
};
export { getAll, get, create, update, remove };
