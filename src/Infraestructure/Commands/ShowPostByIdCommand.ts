class ShowPostByIdCommand implements IAuthorizationCommand{
    
    private IdUser: number;
    private IdPost: number;
    private token: string;

    public constructor(idUser: number, idPost: number, authorization: string){
        this.IdUser = idUser;
        this.IdPost = idPost;
        this.token = authorization;
    }

    public GetIdUser() {
        return this.IdUser;
    }

    public GetIdPost(){
        return this.IdPost;
    }

    public GetAuthorization(){
        return this.token;
    }
}