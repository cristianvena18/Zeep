class LogOutCommand{
    private username: string;

    public constructor(username: string){
        this.username = username;
    }

    public GetUsername(): string{
        return this.username;
    }
}

export default LogOutCommand;