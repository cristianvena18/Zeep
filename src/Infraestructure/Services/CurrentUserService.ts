import User from "../../Domain/Entity/User";
import Session from "../../Domain/Entity/Session";
import IHashService from "./IHashService";
import { inject, injectable } from "inversify";
import TYPES from "../../types";
import { InfraestructureError } from "../utils/errors/InfraestructureError";
import { SessionNotFound } from "../utils/errors/SessionNotFound";
import { EntityNotFound } from "../utils/errors/EntityNotFound";

@injectable()
class CurrentUserService {

    private hashService: IHashService;

    public constructor(@inject(TYPES.IHashService) hashService: IHashService) {
        this.hashService = hashService;
    }

    public getUserId = async (token: string): Promise<number> => {
        const session: Session | undefined = await Session.findOne({ Token: token });
        if (!session) {
            throw new SessionNotFound('Forbidden');
        }

        const result: number = await User.count({ where: { id: session.IdUser, isBlocked: false } });
        if (result != 1) {
            throw new EntityNotFound('User not found');
        }

        if (this.hashService.Equals(token, session.Token)) {
            return session.IdUser;
        }

        throw new SessionNotFound('Forbidden');
    }
}

export default CurrentUserService;
