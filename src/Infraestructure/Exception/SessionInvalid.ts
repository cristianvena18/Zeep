export class SessionInvalid extends Error{
    public constructor(message: string){
        super(message);
    }
}