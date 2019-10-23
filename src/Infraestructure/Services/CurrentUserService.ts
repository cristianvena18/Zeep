import User from "../../Domain/Entity/User";
import Session from "../../Domain/Entity/Sessions";
import IHashService from "./IHashService";
import {inject, injectable} from "inversify";
import TYPES from "../../types";
import { EntityNotFound } from "../Exception/EntityNotFound";
import UnAuthorizedException from "../../Domain/Exceptions/UnAuthorizedException";
import { InfraestructureError } from "../utils/errors/InfraestructureError";

@injectable()
class CurrentUserService {

    private hashService: IHashService;

    public constructor(@inject(TYPES.IHashService) hashService: IHashService) {
        this.hashService = hashService;
    }

    public async getUserId(token: string): Promise<number> {
        const session: Session | undefined = await Session.findOne({ Token: token });
        if(!session){
            throw new InfraestructureError('Forbidden', 401);
        }

        const result: number = await User.count({ where :{ id: session.IdUser, isBlocked: false} });
        if (result != 1) {
            throw new InfraestructureError('User not found', 404);
        }

        if (this.hashService.Equals(token, session.Token)) {
            return session.IdUser;
        }

        throw new InfraestructureError('Forbidden', 401);
    }
}

export default CurrentUserService;
