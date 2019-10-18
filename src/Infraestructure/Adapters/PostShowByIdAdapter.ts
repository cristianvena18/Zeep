import { Request } from "express";
import schemaAuthorization from './Schemas/AuthorizationSchemas';
import schemaId from './Schemas/IdFindSchema';

class PostShowByIdAdapter {
    public adapt(req: Request): ShowPostByIdCommand {
        const { authorization } = req.headers;
        const { iduser, idpost } = req.body;

        const resultAuthorization = schemaAuthorization.validate(authorization);
        const resultIdUser = schemaId.validate({ id: iduser });
        const resultIdPost = schemaId.validate({id: idpost});

        if (resultAuthorization.error) {
            throw resultAuthorization.error;
        }

        if (resultIdUser.error) {
            throw resultIdUser.error;
        }

        if(resultIdPost.error){
            throw resultIdPost.error;
        }

        return new ShowPostByIdCommand(resultIdUser.value, resultIdPost.value, resultAuthorization.value);
    }
}

export default PostShowByIdAdapter;