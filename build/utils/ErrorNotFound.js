export default class ErrorNotFound extends Error {
    constructor(message) {
        super(message);
        this.status = 404;
        this.name = "ErrorNotFound";
    }
}
