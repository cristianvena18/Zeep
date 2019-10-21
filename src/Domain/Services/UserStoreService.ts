import User from "../Entity/User";
import CreateUserCommand from "../../Infraestructure/Commands/CreateUserCommands";
import { DataBaseError } from "../../Infraestructure/Exception/DataBaseError";

class UserStoreService {

    public async execute(command: CreateUserCommand): Promise<string> {

        const user = new User(command.GetUserName(), command.GetPassword());

        try {
            await user.save();
            return "user successfully created";
        } catch (error) {
            throw new DataBaseError('error db \n' + error);
        }
    }
}

export default UserStoreService;