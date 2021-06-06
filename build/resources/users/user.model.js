import { v4 as uuidv4 } from 'uuid';
export default class User {
    constructor({ id = uuidv4(), login, name, password } = {}) {
        this.id = id;
        this.name = name;
        this.login = login;
        this.password = password;
    }
    static toResponse(user) {
        const { id, name, login } = user;
        return { id, name, login };
    }
}
