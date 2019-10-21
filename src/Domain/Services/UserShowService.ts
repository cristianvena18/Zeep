import User from "../Entity/User";
import ShowUserCommand from "../../Infraestructure/Commands/ShowUserCommand";
import { EntityNotFound } from "../../Infraestructure/Exception/EntityNotFound";
import { DataBaseError } from "../../Infraestructure/Exception/DataBaseError";
import UnAuthorizedException from "../Exceptions/UnAuthorizedException";

class UserShowService {

    constructor() {
    }

    public async execute(command: ShowUserCommand) {
        const _user: User = command.GetUser();
        const id: number = command.GetId();

        try {
            const userSearched = await User.findOne({ Id: id });

            if (userSearched) {
                //no funciona
                if (_user.hasRole('admin')) {
                    return userSearched;
                }

                if (userSearched.IsBlocked) {
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

export default UserShowService;