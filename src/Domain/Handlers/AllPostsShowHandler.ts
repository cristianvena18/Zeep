import ShowPostCommand from "../../Infraestructure/Commands/ShowPostsCommand";
import Post from "../Entity/Post";
import User from "../Entity/User";
import { Roles } from "../Enums/Roles";
import { ApplicationError } from "../../Infraestructure/utils/errors/AppError";
import { injectable } from "inversify";

@injectable()
class AllPostsShowHandler{

    public async execute(command: ShowPostCommand): Promise<Post[]> {
        try {

            const user: User = await User.findOneOrFail({where: {id: command.GetUser()}});

            if(user.hasRole(Roles.ZEEPER)){
                return Post.find({ where: { limit: 10 }, relations: ['comment']});
            }else{
                return Post.find({where: { limit: 10} })
            }
        } catch (error) {
            throw new ApplicationError('error db', error);
        }
    }

}

export default AllPostsShowHandler;