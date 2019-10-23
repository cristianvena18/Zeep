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
    public async adapt(req: Request): Promise<ShowPostCommand> {
        const { authorization } = req.headers;
        const { iduser, idpost } = req.body;
        const resultAuthorization = schemaAuthorization.validate(authorization);
        const resultIdUser = schemaId.validate({ id: iduser });
        const resultIdPost = schemaId.validate({ id: idpost });
        if (resultAuthorization.error) {
            throw new InfraestructureError(resultAuthorization.error.message, 400);
        }
        if (resultIdUser.error) {
            throw new InfraestructureError(resultIdUser.error.message, 400);
        }
        if (resultIdPost.error) {
            throw new InfraestructureError(resultIdPost.error.message, 400);
        }
        const validAuth: number = await this.currentUserService.getUserId(resultAuthorization.value);
        return new ShowPostCommand(validAuth, resultIdPost.value);
    }
}

export default PostShowAdapter;