import { Request } from 'express';
import schemaAuthorization from './Schemas/AuthorizationSchemas';
import schemaId from './Schemas/IdFindSchema';
import schemaTitleAndContent from './Schemas/TitleAndContentSchema';

class PostStoreAdapter {
    public adapt(req: Request) {
        const {authorization} = req.headers;
        var {id, title, content} = req.body;

        const resultAuthorization = schemaAuthorization.validate(authorization);
        const resultId = schemaId.validate(id);

        const resultTitle = schemaTitleAndContent.validate(title, content);

        if(resultAuthorization.error){
            throw resultAuthorization.error;
        }

        if(resultId.error){
            throw resultId.error;
        }

        if(resultTitle.error){
            throw resultTitle.error;
        }

        return new CreatePostCommand(resultId.value, resultTitle.value.title, resultTitle.value.content, resultAuthorization.value);
    }
}

export default PostStoreAdapter;