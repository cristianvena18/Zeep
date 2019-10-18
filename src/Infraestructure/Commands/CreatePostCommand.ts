class CreatePostCommand implements IAuthorizationCommand{
    
    private idUser: number;
    private title: string;
    private content: string;
    private authorizationToken: string;

    public constructor(idUser: number, title: string, content: string, authorization: string){
        this.idUser = idUser;
        this.title = title;
        this.content = content;
        this.authorizationToken = authorization;
    }

    public GetAuthorization(): string {
        return this.authorizationToken;
    }

    public GetTitle(): string{
        return this.title;
    }

    public GetIdUser(): number{
        return this.idUser;
    }

    public GetContent(): string{
        return this.content;
    }
}