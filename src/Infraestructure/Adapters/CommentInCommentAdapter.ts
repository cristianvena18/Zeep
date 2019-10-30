import { Request } from "express";
import schema from "./Schemas/IdFindSchema";
import { InvalidData } from "../utils/errors/InvalidData";
import CommentInCommentCommand from "../Commands/CommentInCommentCommand";
import { injectable } from "inversify";

@injectable()
class CommentInCommentAdapter{

    public adapt = (req: Request) => {
        const {CurrentUserId, content} = req.body;
        const {id} = req.params;

        const result = schema.validate({id});

        if(result.error){
            throw new InvalidData(result.error.message);
        }

        return new CommentInCommentCommand(result.value, CurrentUserId, content);
    }
}

export default CommentInCommentAdapter;