import ShowPostCommand from "../../Infraestructure/Commands/ShowPostsCommand";
import Post from "../Entity/Post";
import User from "../Entity/User";
import { Roles } from "../Enums/Roles";
import { ApplicationError } from "../../Infraestructure/utils/errors/AppError";
import { injectable } from "inversify";
import { InfraestructureError } from "../../Infraestructure/utils/errors/InfraestructureError";

@injectable()
class AllPostsShowHandler {

    public async execute(command: ShowPostCommand): Promise<Post[]> {
        try {
            const userId = command.GetUser();
            if(userId === -1){
                return Post.find({ where: { limit: 10 } });
            }

            const user: User = await User.findOne({ where: { id: userId }, relations: ['roles'] });

            if (!user) {
                throw new InfraestructureError('not user found', 404);
            }

            if (user.hasRole(Roles.ZEEPER)) {
                return Post.find({ where: { limit: 10 }, relations: ['comment'] });
            } else {
                return Post.find({ where: { limit: 10 } });
            }
        } catch (error) {
            throw new ApplicationError('error db', error);
        }
    }
}

export default AllPostsShowHandler;