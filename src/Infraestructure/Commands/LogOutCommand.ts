class LogOutCommand{
    private token: string;

    public constructor(token: string){
        this.token = token;
    }

    public GetToken(): string{
        return this.token;
    }
}

export default LogOutCommand;