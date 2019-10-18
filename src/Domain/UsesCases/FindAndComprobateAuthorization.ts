import User from "../Entity/User";
import Session from "../Entity/Sessions";

class FindAndComprobateAuthorization {
    public async Comprobate(id: number, authorization: string): Promise<boolean> {
        try {
            const user: User | undefined = await User.findOne({ Id: id });

            if (!user) {
                throw new ResponseCommand(404, { message: 'not user found' });
            }

            const session: Session | undefined = await Session.findOne({ IdUser: user.Id });

            if(!session){
                throw new ResponseCommand(401, { message: 'session invalid, retry login session!' });
            }

            if (authorization === session.Token) {
                return true;
            }
            else {
                throw new ResponseCommand(403, { message: 'session invalid, retry login session!' });
            }

        } catch (error) {
            throw new ResponseCommand(500, { message: error });
        }
    }
}

export default FindAndComprobateAuthorization;