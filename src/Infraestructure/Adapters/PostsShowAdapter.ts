import { Request } from 'express';
import schemaAuthorization from './Schemas/AuthorizationSchemas';
import ShowPostCommand from '../Commands/ShowPostsCommand';
import { inject, injectable } from 'inversify';
import CurrentUserService from '../Services/CurrentUserService';
import { InvalidData } from '../utils/errors/InvalidData';

@injectable()
class PostsShowAdapter {

    private currentUserService: CurrentUserService;

    public constructor(@inject(CurrentUserService) currentUserService: CurrentUserService) {
        this.currentUserService = currentUserService;
    }

    public adapt = async (req: Request) => {
        const { authorization } = req.headers;

        if (authorization == undefined) {
            return new ShowPostCommand(-1);
        }

        const resultAuthorization = schemaAuthorization.validate({authorization});

        if (resultAuthorization.error) {
            throw new InvalidData('error of authorization');
        }

        const user = await this.currentUserService.getUserId(authorization);

        return new ShowPostCommand(user);
    }
}

export default PostsShowAdapter;
