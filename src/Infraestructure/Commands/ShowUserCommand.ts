import User from "../../Domain/Entity/User";

class ShowUserCommand{
    
    private user: User;
    private Id: number;

    public constructor(user: User, idSearchedUser: number){
        this.user = user;
        this.Id = idSearchedUser; 
    }

    GetId(): number{
        return this.Id;
    }

    GetUser(): User {
        return this.user;
    }
}

export default ShowUserCommand;