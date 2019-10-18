import Post from "../Entity/Post";
import FindAndComprobateAuthorization from "./FindAndComprobateAuthorization";

class PostStoreUseCase implements IStoreUseCases {

    private command: CreatePostCommand;

    constructor(command: CreatePostCommand) {
        this.command = command;
    }

    public async execute(): Promise<ResponseCommand> {
        try {
            const comprobateAuth = new FindAndComprobateAuthorization();
            var isValidAuth: boolean;

            try {
                isValidAuth = await comprobateAuth.Comprobate(this.command.GetIdUser(), this.command.GetAuthorization());
            } catch (error) {
                return new ResponseCommand(error.GetStatus(), error.GetObject());
            }

            if (isValidAuth) {
                const post = new Post(this.command.GetTitle(), this.command.GetContent(), this.command.GetIdUser());

                post.save();
                return new ResponseCommand(200, { message: 'posted' });
            }
            else{
                return new ResponseCommand(403, {message: 'not authorized'});
            }
        } catch (error) {
            return new ResponseCommand(500, { message: error });
        }
    }
}

export default PostStoreUseCase;