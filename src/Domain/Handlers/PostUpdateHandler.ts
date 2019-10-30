import UpdatePostCommand from "../../Infraestructure/Commands/UpdatePostCommand";
import Post from "../Entity/Post";
import Comment from "../Entity/Comment";
import { EntityNotFound } from "../../Infraestructure/utils/errors/EntityNotFound";
import { DataBaseError } from "../../Infraestructure/utils/errors/DataBaseError";
import { injectable } from "inversify";

@injectable()
class PostUpdateHandler {
    public execute = async (command: UpdatePostCommand) => {
        try {
            const post = await Post.findOne({ id: command.GetIdPost() });

            if (!post) {
                throw new EntityNotFound('not post found');
            }

            const comment = new Comment();
            comment.post = post;
            comment.IdUser = command.GetIdUser();
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