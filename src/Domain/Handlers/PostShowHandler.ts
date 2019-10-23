import Post from "../Entity/Post";
import ShowPostCommand from '../../Infraestructure/Commands/ShowPostCommand';
import User from "../Entity/User";
import { Roles } from "../Enums/Roles";
import { ApplicationError } from "../../Infraestructure/utils/errors/AppError";
import { injectable } from "inversify";

@injectable()
class PostShowHandler {

    public async execute(command: ShowPostCommand): Promise<Post> {
        try {

            const user = await User.findOneOrFail({where: {id: command.GetIdUser()}, relations: ['role']});
            var post: Post | undefined;

            if(user.hasRole(Roles.ZEEPER)){
                post = await Post.findOne({ where: { Id: command.GetIdPost() }, relations: ['comment'] });
            }else{
                post = await Post.findOne({ where: { Id: command.GetIdPost() } })
            }

            if (post) {
                return post;
            }

            throw new ApplicationError('not data found', 'a post with that id was not found');
        } catch (error) {
            throw new ApplicationError('error db', error);
        }
    }
}

export default PostShowHandler;