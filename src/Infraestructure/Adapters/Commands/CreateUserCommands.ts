class CreateUserCommand implements ICreateUserCommand{
    private username: string;
    private password: string;

    constructor(username: string, password: string){
        this.username = username;
        this.password = password;
    }

    public GetUserName(): string{
        return this.username;
    }

    public GetPassword(): string{
        return this.password;
    }
}

export default CreateUserCommand;