import { Request } from 'express';
import schemaTitleAndContent from './Schemas/TitleAndContentSchema';
import CreatePostCommand from '../Commands/CreatePostCommand';
import { injectable } from 'inversify';
import { InfraestructureError } from '../utils/errors/InfraestructureError';

@injectable()
class PostStoreAdapter {

    public adapt = async(req: Request) => {
        var { currentUserId, title, content } = req.body;

        const object = {title, content};

        const resultTitle = schemaTitleAndContent.validate(object);

        if (resultTitle.error) {
            throw new InfraestructureError(resultTitle.error.message, 400);
        }

        return new CreatePostCommand(currentUserId, title, content);
    }
}

export default PostStoreAdapter;