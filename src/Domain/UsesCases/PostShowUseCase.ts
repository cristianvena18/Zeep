import ShowPostCommand from "../../Infraestructure/Commands/ShowPostCommand";
import Post from "../Entity/Post";
import FindAndComprobateAuthorization from "./FindAndComprobateAuthorization";

class PostShowUseCase implements IShowByIdUseCases {

    private command: ShowPostCommand;

    constructor(command: ShowPostCommand) {
        this.command = command;
    }

    public async execute(): Promise<ResponseCommand> {

        var posts = [];

        try {
            posts = await Post.find({ where: { limit: 10 } });
        } catch (error) {
            return new ResponseCommand(500, { message: error });
        }

        const validateAuth = new FindAndComprobateAuthorization();
        var validAuth: boolean;
        try {
            validAuth = await validateAuth.Comprobate(this.command.GetId(), this.command.GetAuthorization());
        } catch (error) {
            return new ResponseCommand(error.GetStatus(), error.GetObject());
        }

        if (validAuth) {
            var postsClears = [];
            for (let index = 0; index < posts.length; index++) {
                postsClears.push(posts[index].GetObjectWithComments());
            }
            return new ResponseCommand(200, {message: '', posts: postsClears});
        }
        else{
            var postsClears = [];
            for (let index = 0; index < posts.length; index++) {
                postsClears.push(posts[index].GetObjectWithOutComments());
            }
            return new ResponseCommand(200, { message: '', posts: postsClears });
        }
    }

}

export default PostShowUseCase;