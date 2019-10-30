import User from "../Entity/User";
import CreateUserCommand from "../../Infraestructure/Commands/CreateUserCommands";
import { ApplicationError } from "../../Infraestructure/utils/errors/AppError";
import { injectable, inject } from "inversify";
import Role from "../Entity/Role";
import { Roles } from "../Enums/Roles";

@injectable()
class UserStoreHandler {

    public async execute(command: CreateUserCommand): Promise<string> {

        const user = new User();

        user.password = command.GetPassword();
        user.username = command.GetUserName();
        user.isBlocked = false;

        const roleBasic = await Role.findOne({where: {Name: Roles.ZEEPER}});

        user.addRole(roleBasic);

        try {
            await user.save();
            return "user successfully created";
        } catch (error) {
            throw new ApplicationError('error db', error);
        }
    }
}

export default UserStoreHandler;