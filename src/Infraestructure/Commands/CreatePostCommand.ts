import User from "../../Domain/Entity/User";

class CreatePostCommand{
    
    private user: User;
    private title: string;
    private content: string;

    public constructor(user: User, title: string, content: string){
        this.user = user;
        this.title = title;
        this.content = content;
    }

    public GetTitle(): string{
        return this.title;
    }

    public GetUser(): User{
        return this.user;
    }

    public GetContent(): string{
        return this.content;
    }
}

export default CreatePostCommand;