class UpdatePostCommand{
    private idPost: number;
    private idUser: number;
    private content: string;

    public constructor(idPost: number, idUser: number, content: string){
        this.idPost = idPost;
        this.idUser = idUser;
        this.content = content;
    }

    public GetIdPost(){
        return this.idPost;
    }

    public GetIdUser(){
        return this.idUser;
    }

    public GetContent(){
        return this.content;
    }
}

export default UpdatePostCommand;