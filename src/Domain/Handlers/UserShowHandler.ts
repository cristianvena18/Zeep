import User from "../Entity/User";
import ShowUserCommand from "../../Infraestructure/Commands/ShowUserCommand";
import { EntityNotFound } from "../../Infraestructure/Exception/EntityNotFound";
import { DataBaseError } from "../../Infraestructure/Exception/DataBaseError";
import UnAuthorizedException from "../Exceptions/UnAuthorizedException";

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
                    throw new UnAuthorizedException('user blocked!');
                }

                return userSearched;
            }
            else {
                throw new EntityNotFound('not user found with id!');
            }
        } catch (error) {
            throw new DataBaseError(error);
        }
    }

}

export default UserShowHandler;