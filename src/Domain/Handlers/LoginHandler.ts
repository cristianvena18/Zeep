import User from "../Entity/User";
import { inject, injectable } from "inversify";
import TYPES from "../../types";
import IHashService from "../../Infraestructure/Services/IHashService";
import Session from "../Entity/Session";
import LoginCommand from "../../Infraestructure/Commands/LoginCommand";
import { SessionInvalid } from "../../Infraestructure/utils/errors/SessionInvalid";
import { EntityNotFound } from "../../Infraestructure/utils/errors/EntityNotFound";

@injectable()
class LoginHandler{

    private hashService;

    public constructor(@inject(TYPES.IHashService) hasher: IHashService){
        this.hashService = hasher;
    }

    public async execute(command: LoginCommand): Promise<object>{

        const user = await User.findOne({where : {username: command.GetUsername()}})

        if (user) {
            const valid: boolean = this.hashService.Equals(user.password, command.GetPassword());

            if (valid) {
                const token = this.hashService.GeneratedToken();
                const session = new Session(user.id, token);
                await session.save();

                return { username: user.username, token: token };
            }
            else {
                throw new SessionInvalid('not valid password!');
            }
        }
        else {
            throw new EntityNotFound('the user not found');
        }
    }
}

export default LoginHandler;