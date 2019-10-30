import UpdatePostCommand from "../../Infraestructure/Commands/UpdatePostCommand";
import Post from "../Entity/Post";
import Comment from "../Entity/Comment";
import { EntityNotFound } from "../../Infraestructure/utils/errors/EntityNotFound";
import { DataBaseError } from "../../Infraestructure/utils/errors/DataBaseError";
import { injectable } from "inversify";
import User from "../Entity/User";
import { Roles } from "../Enums/Roles";
import UnAuthorizedException from "../../Infraestructure/utils/errors/UnAuthorizedException";

@injectable()
class PostUpdateHandler {
    public execute = async (command: UpdatePostCommand) => {
        try {

            const user = await User.findOne(command.GetIdUser(), {relations: ['roles']});

            if(!user.hasRole(Roles.ZEEPER)){
                throw new UnAuthorizedException('is not zeeper');
            }

            const post = await Post.findOne(command.GetIdPost(), { relations: ['comment', 'comment.comment'] });

            if (!post) {
                throw new EntityNotFound('not post found');
            }

            const comment = new Comment();
            comment.post = post;
            comment.user = user;
            comment.content = command.GetContent();
            await comment.save();

            post.addComment(comment);

            await post.save();

            return { message: 'comment saved!' };
        } catch (error) {
            throw new DataBaseError(error);
        }
    }
}

export default PostUpdateHandler;