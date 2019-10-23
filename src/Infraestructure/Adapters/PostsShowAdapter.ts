import { Request } from 'express';
import schemaAuthorization from './Schemas/AuthorizationSchemas';
import schemaId from './Schemas/IdFindSchema';
import ShowPostCommand from '../Commands/ShowPostsCommand';
import { inject, injectable } from 'inversify';
import CurrentUserService from '../Services/CurrentUserService';
import { InfraestructureError } from '../utils/errors/InfraestructureError';

@injectable()
class PostsShowAdapter {

    private currentUserService: CurrentUserService;

    public constructor(@inject(CurrentUserService) currentUserService: CurrentUserService) {
        this.currentUserService = currentUserService;
    }

    public async adapt(req: Request) {
        const { authorization } = req.headers;
        const { id } = req.body;

        if (authorization === '') {
            throw new InfraestructureError('invalid authorization token', 403);
        }

        const resultAuthorization = schemaAuthorization.validate(authorization);
        const resultId = schemaId.validate(id);

        if (resultAuthorization.error) {
            throw new InfraestructureError(resultAuthorization.error.message, 400);
        }

        if (resultId.error) {
            throw new InfraestructureError(resultId.error.message, 400);
        }

        const user = await this.currentUserService.getUserId(resultAuthorization.value);

        return new ShowPostCommand(user);
    }
}

export default PostsShowAdapter;
