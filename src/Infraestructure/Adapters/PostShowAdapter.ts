import { Request } from "express";
import schemaAuthorization from './Schemas/AuthorizationSchemas';
import schemaId from './Schemas/IdFindSchema';
import User from "../../Domain/Entity/User";
import ShowPostCommand from '../Commands/ShowPostCommand';
import UnAuthorizedException from "../../Domain/Exceptions/UnAuthorizedException";
import { inject } from "inversify";
import CurrentUserService from "../Services/CurrentUserService";

class PostShowAdapter {

    private currentUserService: CurrentUserService;

    constructor(@inject(CurrentUserService) currentUserService: CurrentUserService){
        this.currentUserService = currentUserService;
    }

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
        
        const validAuth: number = await this.currentUserService.getUserId(resultAuthorization.value);

        return new ShowPostCommand(validAuth, resultIdPost.value);
    }
}

export default PostShowAdapter;