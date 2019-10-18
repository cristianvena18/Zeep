class ShowPostCommand implements IShowCommand, IAuthorizationCommand{
    private Id: number;
    private authorization: string;
    
    constructor(id: number, authorization: string){
        this.Id = id;
        this.authorization = authorization;
    }

    GetId() {
        return this.Id;
    }
    GetAuthorization(): string {
        return this.authorization;
    }
}

export default ShowPostCommand;