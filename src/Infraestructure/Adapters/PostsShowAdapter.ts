import { Request } from 'express';
import schemaAuthorization from './Schemas/AuthorizationSchemas';
import schemaId from './Schemas/IdFindSchema';
import ShowPostCommand from '../Commands/ShowPostsCommand';
import UnAuthorizedException from '../../Domain/Exceptions/UnAuthorizedException';
import { inject } from 'inversify';
import CurrentUserService from '../Services/CurrentUserService';

class PostsShowAdapter {

    private currentUserService: CurrentUserService;

    public constructor(@inject(CurrentUserService) currentUserService: CurrentUserService) {
        this.currentUserService = currentUserService;
    }

    public async adapt(req: Request) {
        const { authorization } = req.headers;
        const { id } = req.body;

        if (authorization === '') {
            throw new UnAuthorizedException('invalid authorization token');
        }

        const resultAuthorization = schemaAuthorization.validate(authorization);
        const resultId = schemaId.validate(id);

        if (resultAuthorization.error) {
            throw resultAuthorization.error;
        }

        if (resultId.error) {
            throw resultId.error;
        }

        const user = await this.currentUserService.getUserId(resultAuthorization.value);

        return new ShowPostCommand(user);
    }
}

export default PostsShowAdapter;
