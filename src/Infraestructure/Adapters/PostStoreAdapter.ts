import { Request } from 'express';
import schemaAuthorization from './Schemas/AuthorizationSchemas';
import schemaId from './Schemas/IdFindSchema';
import schemaTitleAndContent from './Schemas/TitleAndContentSchema';
import CreatePostCommand from '../Commands/CreatePostCommand';
import AuthorizationService from '../Services/AuthorizationService';
import { InvalidData } from '../Exception/InvalidData';

class PostStoreAdapter {
    public async adapt(req: Request) {
        const {authorization} = req.headers;
        var {id, title, content} = req.body;

        const resultAuthorization = schemaAuthorization.validate(authorization);
        const resultId = schemaId.validate(id);

        const resultTitle = schemaTitleAndContent.validate(title, content);

        if(resultAuthorization.error){
            throw new InvalidData(resultAuthorization.error.message);
        }

        if(resultId.error){
            throw new InvalidData(resultId.error.message);
        }

        if(resultTitle.error){
            throw new InvalidData(resultTitle.error.message);
        }

        const authenticator = new AuthorizationService();
        const user = await authenticator.Comprobate(resultAuthorization.value);


        return new CreatePostCommand(user, resultTitle.value.title, resultTitle.value.content);
    }
}

export default PostStoreAdapter;