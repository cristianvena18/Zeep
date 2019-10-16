import User from "../Entity/User";

class UserStoreUseCase implements IStoreUseCases{

    private command: ICreateUserCommand;

    constructor(command: ICreateUserCommand){
        this.command = command;
    }

    public async execute(): Promise<ResponseCommand>{

        const user = new User(this.command);

        try {
            await user.save();

            return new ResponseCommand(201, {message: "The user has been successfully created"});
        } catch (error) {
            return new ResponseCommand(500, {message: error});
        }
        
    }
}

export default UserStoreUseCase;