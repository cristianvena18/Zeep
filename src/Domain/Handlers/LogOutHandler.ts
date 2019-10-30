import { DeleteResult } from "typeorm";
import Session from "../Entity/Session";
import LogOutCommand from "../../Infraestructure/Commands/LogOutCommand";
import { injectable } from "inversify";
import { DataBaseError } from "../../Infraestructure/utils/errors/DataBaseError";

@injectable()
class LogOutHandler {
    public constructor() {

    }

    public async execute(command: LogOutCommand) {
        try {
            const a: DeleteResult = await Session.delete({ Token: command.GetToken() });

            if (a.affected === 1) {
                console.log('ok');
                return { message: 'successful logout!' };
            }
            else {
                throw new DataBaseError('problems with user logout');
            }
        } catch (error) {
            throw new DataBaseError(error);
        }
    }
}

export default LogOutHandler;