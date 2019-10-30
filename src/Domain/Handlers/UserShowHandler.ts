import User from "../Entity/User";
import ShowUserCommand from "../../Infraestructure/Commands/ShowUserCommand";
import { EntityNotFound } from "../../Infraestructure/Exception/EntityNotFound";
import { DataBaseError } from "../../Infraestructure/Exception/DataBaseError";
import UnAuthorizedException from "../Exceptions/UnAuthorizedException";
import { InfraestructureError } from "../../Infraestructure/utils/errors/InfraestructureError";
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
                    throw new InfraestructureError('user blocked!', 401);
                }
            } else {
                throw new InfraestructureError('not user found with id!', 404);
            }

            return userSearched;
        }
        catch (error) {
            throw new ApplicationError('error db', error);
        }
    }
}

export default UserShowHandler;