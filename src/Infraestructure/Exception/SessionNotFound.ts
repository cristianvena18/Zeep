export class SessionNotFound extends Error{
    public constructor(message: string){
        super(message);
    }
}