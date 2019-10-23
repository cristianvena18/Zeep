import Post from "../Entity/Post";
import ShowPostCommand from '../../Infraestructure/Commands/ShowPostCommand';
import { NotFoundData } from "../Exceptions/NotFoundData";
import { DataBaseError } from "../../Infraestructure/Exception/DataBaseError";
import User from "../Entity/User";
import { Roles } from "../Enums/Roles";

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

            throw new NotFoundData('a post with that id was not found');
        } catch (error) {
            throw new DataBaseError(error);
        }
    }
}

export default PostShowHandler;