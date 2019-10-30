import { Request } from 'express';
import schemaTitleAndContent from './Schemas/TitleAndContentSchema';
import CreatePostCommand from '../Commands/CreatePostCommand';
import { injectable } from 'inversify';
import { InvalidData } from '../utils/errors/InvalidData';

@injectable()
class PostStoreAdapter {

    public adapt = async(req: Request) => {
        var { currentUserId, title, content } = req.body;

        const object = {title, content};

        const resultTitle = schemaTitleAndContent.validate(object);

        if (resultTitle.error) {
            throw new InvalidData(resultTitle.error.message);
        }

        return new CreatePostCommand(currentUserId, title, content);
    }
}

export default PostStoreAdapter;