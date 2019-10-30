class CommentInCommentCommand{
    private idUser: number;
    private idComment: number;
    private content: string;

    public constructor(idComment: number, idUser: number, content: string){
        this.content = content;
        this.idComment = idComment;
        this.idUser = idUser;
    }

    public GetIdUser(){
        return this.idUser;
    }

    public GetIdComment(){
        return this.idComment;
    }

    public GetContent(){
        return this.content;
    }
}

export default CommentInCommentCommand;