import ShowPostCommand from "../../Infraestructure/Commands/ShowPostsCommand";
import Post from "../Entity/Post";
import User from "../Entity/User";
import { Roles } from "../Enums/Roles";
import { injectable } from "inversify";
import { EntityNotFound } from "../../Infraestructure/utils/errors/EntityNotFound";
import { DataBaseError } from "../../Infraestructure/utils/errors/DataBaseError";

@injectable()
class AllPostsShowHandler {

    public async execute(command: ShowPostCommand): Promise<Post[]> {
        try {
            const userId = command.GetUser();
            if (userId === -1) {
                return Post.find({ where: { limit: 10 } });
            }

            const user: User = await User.findOne({ where: { id: userId }, relations: ['roles'] });

            if (!user) {
                throw new EntityNotFound('not user found');
            }

            if (user.hasRole(Roles.ZEEPER)) {
                return Post.find({ where: { limit: 10 }, relations: ['comment', 'comment.user', 'comment.comment', 'comment.comment.user'] });
            } else {
                return Post.find({ where: { limit: 10 } });
            }
        } catch (error) {
            throw new DataBaseError('error db');
        }
    }
}

export default AllPostsShowHandler;