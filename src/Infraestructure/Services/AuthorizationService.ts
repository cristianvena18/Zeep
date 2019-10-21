import Session from "../../Domain/Entity/Sessions";
import { SessionNotFound } from "../Exception/SessionNotFound";
import { SessionInvalid } from "../Exception/SessionInvalid";
import { DataBaseError } from "../Exception/DataBaseError";
import HashService from "./HashService";
import User from "../../Domain/Entity/User";
import { EntityNotFound } from "../Exception/EntityNotFound";

class AuthorizationService {
    public async Comprobate(authorization: string): Promise<User> {
        try {

            const session: Session | undefined = await Session.findOne({ Token: authorization });

            if(!session){
                throw new SessionNotFound('Session not found');
            }

            const user: User | undefined = await User.findOne({Id: session.IdUser})

            if(!user){
                throw new EntityNotFound('forbbiden');
            }

            const hasher = new HashService();

            if (hasher.Equals(session.Token, authorization)) {
                return user;
            }
            else {
                throw new SessionInvalid('Session invalid, login again');
            }

        } catch (error) {
            throw new DataBaseError('error db');
        }
    }
}

export default AuthorizationService;