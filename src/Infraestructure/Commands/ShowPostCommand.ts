class ShowPostsCommand{
    
    private user: number;
    private IdPost: number;

    public constructor(user: number, idPost: number){
        this.user = user;
        this.IdPost = idPost;
    }

    public GetIdUser(): number {
        return this.user;
    }

    public GetIdPost(): number{
        return this.IdPost;
    }
}

export default ShowPostsCommand;