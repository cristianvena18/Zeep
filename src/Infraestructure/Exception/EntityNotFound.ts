export class EntityNotFound extends Error{
    public constructor(message: string){
        super(message);
    }
}