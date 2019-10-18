import {Request} from 'express';
import schemaAuthorization from './Schemas/AuthorizationSchemas';
import schemaId from './Schemas/IdFindSchema';
import ShowPostCommand from '../Commands/ShowPostCommand';

class PostShowAdapter{
    public constructor(){

    }

    public adapt(req: Request){
        const {authorization} = req.headers;
        const {id} = req.body;

        const resultAuthorization = schemaAuthorization.validate(authorization);
        const resultId = schemaId.validate(id);

        if(resultAuthorization.error){
            throw resultAuthorization.error;
        }

        if(resultId.error){
            throw resultId.error;
        }

        return new ShowPostCommand(resultId.value, resultAuthorization.value);
    }
}

export default PostShowAdapter;