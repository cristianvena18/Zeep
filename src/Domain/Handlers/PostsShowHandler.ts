import ShowPostCommand from "../../Infraestructure/Commands/ShowPostsCommand";
import Post from "../Entity/Post";
import { DataBaseError } from "../../Infraestructure/Exception/DataBaseError";
import User from "../Entity/User";
import { Roles } from "../Enums/Roles";

class PostShowHandler{

    public async execute(command: ShowPostCommand): Promise<Post[]> {
        try {

            const user: User = await User.findOneOrFail({where: {id: command.GetUser()}});

            if(user.hasRole(Roles.ZEEPER)){
                return Post.find({ where: { limit: 10 }, relations: ['comment']});
            }else{
                return Post.find({where: { limit: 10} })
            }
        } catch (error) {
            throw new DataBaseError(error);
        }
    }

}

export default PostShowHandler;