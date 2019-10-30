import { Request } from "express";
import schemaAuthorization from './Schemas/AuthorizationSchemas';
import schemaId from './Schemas/IdFindSchema';
import ShowPostCommand from '../Commands/ShowPostCommand';
import CurrentUserService from "../Services/CurrentUserService";
import { InfraestructureError } from "../utils/errors/InfraestructureError";
import { injectable, inject } from "inversify";


@injectable()
export class PostShowAdapter {
    private currentUserService: CurrentUserService;
    constructor(
        @inject(CurrentUserService)
        currentUserService: CurrentUserService) {
        this.currentUserService = currentUserService;
    }
    public adapt = async (req: Request): Promise<ShowPostCommand> => {
        const { authorization } = req.headers;
        
        let validAuth: number = -1;
        if(authorization != undefined){
            const resultAuthorization = schemaAuthorization.validate({ authorization });

            if (resultAuthorization.error) {
                throw new InfraestructureError(resultAuthorization.error.message, 400);
            }

            validAuth = await this.currentUserService.getUserId(authorization);
        }

        const { id } = req.params;

        const resultIdPost = schemaId.validate({ id });

        if (resultIdPost.error) {
            throw new InfraestructureError(resultIdPost.error.message, 400);
        }

        return new ShowPostCommand(validAuth, resultIdPost.value);
    }
}

export default PostShowAdapter;