import { injectable } from "inversify";
import { Request } from "express";
import schema from "./Schemas/IdFindSchema";
import { InvalidData } from "../utils/errors/InvalidData";
import UpdatePostCommand from "../Commands/UpdatePostCommand";

@injectable()
class PostUpdateAdapter {
    constructor() {

    }

    public adapt = (req: Request) => {
        const { currentUserId, content } = req.body;
        const { id } = req.params;

        const result = schema.validate({ id });

        if (result.error) {
            throw new InvalidData('not valid id');
        }

        return new UpdatePostCommand(result.value, currentUserId, content);
    }
}

export default PostUpdateAdapter;