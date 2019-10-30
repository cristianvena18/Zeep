class CreatePostCommand{
    
    private user: number;
    private title: string;
    private content: string;

    public constructor(user: number, title: string, content: string){
        this.user = user;
        this.title = title;
        this.content = content;
    }

    public GetTitle(): string{
        return this.title;
    }

    public GetUser(): number{
        return this.user;
    }

    public GetContent(): string{
        return this.content;
    }
}

export default CreatePostCommand;