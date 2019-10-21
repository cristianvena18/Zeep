import ShowPostCommand from "../../Infraestructure/Commands/ShowPostsCommand";
import Post from "../Entity/Post";
import { DataBaseError } from "../../Infraestructure/Exception/DataBaseError";

class PostShowUseCase{

    public async execute(command: ShowPostCommand): Promise<Post[]> {
        try {
            return Post.find({ where: { limit: 10 }});
        } catch (error) {
            throw new DataBaseError(error);
        }
    }

}

export default PostShowUseCase;