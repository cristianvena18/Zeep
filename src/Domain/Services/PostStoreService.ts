import Post from "../Entity/Post";
import CreatePostCommand from '../../Infraestructure/Commands/CreatePostCommand';
import { DataBaseError } from "../../Infraestructure/Exception/DataBaseError";

class PostStoreUseCase {

    public async execute(command: CreatePostCommand): Promise<void> {
        try {
            const post = new Post(command.GetTitle(), command.GetContent(), command.GetUser().Id);
            post.save();
        } catch (error) {
            throw new DataBaseError(error);
        }
    }
}

export default PostStoreUseCase;