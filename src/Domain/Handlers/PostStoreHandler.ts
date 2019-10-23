import Post from "../Entity/Post";
import CreatePostCommand from '../../Infraestructure/Commands/CreatePostCommand';
import { DataBaseError } from "../../Infraestructure/Exception/DataBaseError";
import User from "../Entity/User";
import { EntityNotFound } from "../../Infraestructure/Exception/EntityNotFound";
import { injectable } from "inversify";

@injectable()
class PostStoreHandler {

    public async execute(command: CreatePostCommand): Promise<void> {
        try {
            const post = new Post();
            post.title = command.GetTitle();
            post.body = command.GetContent();

            const user: User = await User.findOneOrFail({where: {id: command.GetUser()}});

            post.user = user;
            post.save();
        } catch (error) {
            if(error instanceof EntityNotFound){
                throw new EntityNotFound('not user found');
            }else{
                throw new DataBaseError(error);
            }
        }
    }
}

export default PostStoreHandler;