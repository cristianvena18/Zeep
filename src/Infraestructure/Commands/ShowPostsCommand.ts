class ShowPostCommand{
    private user: number;

    constructor(user: number){
        this.user = user;
    }

    GetUser(): number {
        return this.user;
    }
}

export default ShowPostCommand;