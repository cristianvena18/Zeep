import Comment from "../Entity/Comment";
import { DataBaseError } from "../../Infraestructure/utils/errors/DataBaseError";
import CommentInCommentCommand from "../../Infraestructure/Commands/CommentInCommentCommand";
import { EntityNotFound } from "../../Infraestructure/utils/errors/EntityNotFound";
import { injectable } from "inversify";
import User from "../Entity/User";
import { Roles } from "../Enums/Roles";
import UnAuthorizedException from "../../Infraestructure/utils/errors/UnAuthorizedException";

@injectable()
class CommentInCommentHandler {

    public execute = async (command: CommentInCommentCommand) => {

        try {

            const user = await User.findOne(command.GetIdUser(), {relations: ['roles']});

            if(user.hasRole(Roles.ZEEPER)){
                throw new UnAuthorizedException('not is zeeper');
            }

            const comment = await Comment.findOne(command.GetIdComment(), { relations: ['comment'] });

            if (!comment) {
                throw new EntityNotFound('not comment found');
            }

            const commentInComment = new Comment();
            commentInComment.user = user;
            commentInComment.content = command.GetContent();
            commentInComment.parent = comment;
            await commentInComment.save();

            comment.addComment(commentInComment);

            await comment.save();

            return { message: 'comment saved' };
        } catch (error) {
            throw new DataBaseError(error);
        }
    }

}

export default CommentInCommentHandler;