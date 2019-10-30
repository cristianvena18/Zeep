import User from "../Entity/User";
import ShowUserCommand from "../../Infraestructure/Commands/ShowUserCommand";
import { EntityNotFound } from "../../Infraestructure/utils/errors/EntityNotFound";
import { DataBaseError } from "../../Infraestructure/utils/errors/DataBaseError";
import UnAuthorizedException from "../../Infraestructure/utils/errors/UnAuthorizedException";
import { ApplicationError } from "../../Infraestructure/utils/errors/AppError";
import { injectable } from "inversify";

@injectable()
class UserShowHandler {

    constructor() {
    }

    public async execute(command: ShowUserCommand) {
        try {
            const userSearched: User = await User.findOne({ where: { id: command.GetId(), isBlocked: false } });

            if (userSearched) {
                if (userSearched.isBlocked) {
                    throw new UnAuthorizedException('user blocked!');
                }
            } else {
                throw new EntityNotFound('not user found with id!');
            }

            return userSearched;
        }
        catch (error) {
            throw new DataBaseError(error);
        }
    }
}

export default UserShowHandler;