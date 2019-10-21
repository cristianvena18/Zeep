class UnAuthorizedException extends Error {
    constructor(message: string) {
        super(message);
    }
}

export default UnAuthorizedException;