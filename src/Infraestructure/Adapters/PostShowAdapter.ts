import { Request } from "express";
import schemaAuthorization from './Schemas/AuthorizationSchemas';
import schemaId from './Schemas/IdFindSchema';
import User from "../../Domain/Entity/User";
import ShowPostCommand from '../Commands/ShowPostCommand';
import UnAuthorizedException from "../../Domain/Exceptions/UnAuthorizedException";
import AuthorizationService from "../Services/AuthorizationService";

class PostShowAdapter {
    public async adapt(req: Request): Promise<ShowPostCommand> {
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

        const validateAuth = new AuthorizationService();
        
        const validAuth: User = await validateAuth.Comprobate(resultAuthorization.value);

        if(validAuth){
            return new ShowPostCommand(resultIdUser.value, resultIdPost.value, resultAuthorization.value);
        }else{
            throw new UnAuthorizedException('not valid authorization, login again');
        }
    }
}

export default PostShowAdapter;