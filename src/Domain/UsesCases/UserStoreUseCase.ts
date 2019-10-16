import User from "../Entity/User";

class UserStoreUseCase implements IUseCases{

    private command: ICreateUserCommand;

    constructor(command: ICreateUserCommand){
        this.command = command;
    }

    public async execute(){

        const user = new User(this.command);

        await user.save();
    }
}

export default UserStoreUseCase;