import Post from "../Entity/Post";
import FindAndComprobateAuthorization from "./FindAndComprobateAuthorization";

class PostShowByIdUseCase implements IShowByIdUseCases{
    
    private command: ShowPostByIdCommand;

    constructor(command: ShowPostByIdCommand){
        this.command = command;
    }

    public async execute(): Promise<ResponseCommand>{
        
        var postFind: Post | undefined;
        
        try {
            postFind = await Post.findOne({ Id: this.command.GetIdPost() });
        } catch (error) {
            return new ResponseCommand(500, {message: error});
        }
        
        if (!postFind) {
            return new ResponseCommand(404, {message: 'not post found!'});
        }

        const validateAuth = new FindAndComprobateAuthorization();
        var validAuth: boolean;
        try {
            validAuth = await validateAuth.Comprobate(this.command.GetIdUser(), this.command.GetAuthorization());
        } catch (error) {
            return new ResponseCommand(error.GetStatus(), error.GetObject());
        }

        if(validAuth){
            return new ResponseCommand(200, {
                message: 'post found!',
                posts: [postFind.GetObjectWithComments()]
            });
        }
        else{
            return new ResponseCommand(200, {
                message: 'post found!', posts: [postFind.GetObjectWithOutComments()]
            });
        }
    }
}

export default PostShowByIdUseCase;