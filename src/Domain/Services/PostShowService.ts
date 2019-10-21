import Post from "../Entity/Post";
import ShowPostCommand from '../../Infraestructure/Commands/ShowPostCommand';
import { NotFoundData } from "../Exceptions/NotFoundData";
import { DataBaseError } from "../../Infraestructure/Exception/DataBaseError";

class PostShowService {

    public async execute(command: ShowPostCommand): Promise<Post> {
        try {
            const post = await Post.findOne({ Id: command.GetIdPost() });

            if (post) {
                return post;
            }
            else {
                throw new NotFoundData('a post with that id was not found');
            }

        } catch (error) {
            throw new DataBaseError(error);
        }
    }
}

export default PostShowService;