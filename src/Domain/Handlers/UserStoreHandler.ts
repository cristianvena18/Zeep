import User from "../Entity/User";
import CreateUserCommand from "../../Infraestructure/Commands/CreateUserCommands";
import { ApplicationError } from "../../Infraestructure/utils/errors/AppError";
import { injectable } from "inversify";

@injectable()
class UserStoreHandler {

    public async execute(command: CreateUserCommand): Promise<string> {

        const user = new User();
        user.password = command.GetPassword();
        user.username = command.GetUserName();

        try {
            await user.save();
            return "user successfully created";
        } catch (error) {
            throw new ApplicationError('error db', error);
        }
    }
}

export default UserStoreHandler;