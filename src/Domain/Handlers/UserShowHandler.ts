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
        const id: number = command.GetId();

        try {
            const userSearched = await User.findOne(id);

            if (userSearched) {
                //no funciona
                // if (_user.hasRole('admin')) {
                //     return userSearched;
                // }

                if (userSearched.isBlocked) {
                    throw new InfraestructureError('user blocked!', 401);
                }

                return userSearched;
            }
            else {
                throw new InfraestructureError('not user found with id!', 404);
            }
        } catch (error) {
            throw new ApplicationError('error db', error);
        }
    }

}

export default UserShowHandler;