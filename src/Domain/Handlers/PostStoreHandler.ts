import Post from "../Entity/Post";
import CreatePostCommand from '../../Infraestructure/Commands/CreatePostCommand';
import { DataBaseError } from "../../Infraestructure/utils/errors/DataBaseError";
import User from "../Entity/User";
import { EntityNotFound } from "../../Infraestructure/utils/errors/EntityNotFound";
import { injectable } from "inversify";
import { Roles } from "../Enums/Roles";
import UnAuthorizedException from "../../Infraestructure/utils/errors/UnAuthorizedException";

@injectable()
class PostStoreHandler {

    public async execute(command: CreatePostCommand): Promise<void> {
        try {
            const user: User = await User.findOneOrFail({ where: { id: command.GetUser() }, relations: ['roles'] });

            if (user.hasRole(Roles.ZEEPER)) {
                const post = new Post();
                post.title = command.GetTitle();
                post.body = command.GetContent();


                post.user = user.id;
                post.comment = [];
                await post.save();
            }else{
                throw new UnAuthorizedException('is not zeeper');
            }
            
        } catch (error) {
            if (error instanceof EntityNotFound) {
                throw new EntityNotFound('not user found');
            } else {
                throw new DataBaseError(error);
            }
        }
    }
}

export default PostStoreHandler;