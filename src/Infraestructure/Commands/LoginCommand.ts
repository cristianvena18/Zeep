class LoginCommand{

    private username: string;
    private password: string;

    public constructor(username: string, password: string){
        this.password = password;
        this.username = username;
    }

    public GetUsername(): string{
        return this.username;
    }

    public GetPassword(): string{
        return this.password;
    }
}

export default LoginCommand;