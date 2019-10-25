import { InfraestructureError } from "../../Infraestructure/utils/errors/InfraestructureError";
import { ApplicationError } from "../../Infraestructure/utils/errors/AppError";
import { DeleteResult } from "typeorm";
import Session from "../Entity/Sessions";
import User from "../Entity/User";
import LogOutCommand from "../../Infraestructure/Commands/LogOutCommand";
import { injectable } from "inversify";

@injectable()
class LogOutHandler{
    public constructor(){

    }

    public async execute(command: LogOutCommand){
        try {
            const user: User | undefined = await User.findOne({ username: command.GetUsername() });

            if (!user) {
                throw new InfraestructureError({ message: 'not user found' }, 404);
            }
            else {
                const a: DeleteResult = await Session.delete({ IdUser: user.id });

                if (a.affected === 1) {
                    return { message: 'successful logout!' };
                }
                else {
                    throw new ApplicationError('error', 'problems with user logout' );
                }
            }
        } catch (error) {
            throw new InfraestructureError(error, 500);
        }
    }
}

export default LogOutHandler;