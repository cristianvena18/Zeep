import Post from "../Entity/Post";
import ShowPostCommand from '../../Infraestructure/Commands/ShowPostCommand';
import User from "../Entity/User";
import { Roles } from "../Enums/Roles";
import { ApplicationError } from "../../Infraestructure/utils/errors/AppError";
import { injectable } from "inversify";
import Comment from "../Entity/Comment";
import { EntityNotFound } from "../../Infraestructure/utils/errors/EntityNotFound";
import { DataBaseError } from "../../Infraestructure/utils/errors/DataBaseError";

@injectable()
class PostShowHandler {

    public execute = async (command: ShowPostCommand): Promise<Post> => {
        try {

            const userId = command.GetIdUser();
            let post: Post | undefined;

            console.log(userId);
            if (userId === -1) {
                post = await Post.findOne({ where: { Id: command.GetIdPost() } });
                if (post) {
                    return post;
                } else {
                    throw new EntityNotFound('a post with that id was not found');
                }

            }

            const user = await User.findOneOrFail({ where: { id: userId }, relations: ['roles'] });

            if (user.hasRole(Roles.ZEEPER)) {
                //where: { Id: command.GetIdPost() }
                post = await Post.findOne(command.GetIdPost(), { relations: ['comment'] });
            } else {
                post = await Post.findOne({ where: { Id: command.GetIdPost() } });
            }

            if (post) {
                return post;
            }

            throw new EntityNotFound('a post with that id was not found');
        } catch (error) {
            throw new DataBaseError(error);
        }
    }
}

export default PostShowHandler;