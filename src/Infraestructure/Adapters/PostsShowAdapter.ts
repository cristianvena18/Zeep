import {Request} from 'express';
import schemaAuthorization from './Schemas/AuthorizationSchemas';
import schemaId from './Schemas/IdFindSchema';
import ShowPostCommand from '../Commands/ShowPostsCommand';
import AuthorizationService from '../Services/AuthorizationService';
import UnAuthorizedException from '../../Domain/Exceptions/UnAuthorizedException';

class PostsShowAdapter{
    public constructor(){

    }

    public async adapt(req: Request){
        const {authorization} = req.headers;
        const {id} = req.body;

        if(authorization === ''){
            throw new UnAuthorizedException('invalid authorization token');
        }

        const resultAuthorization = schemaAuthorization.validate(authorization);
        const resultId = schemaId.validate(id);

        if(resultAuthorization.error){
            throw resultAuthorization.error;
        }

        if(resultId.error){
            throw resultId.error;
        }

        try {
            const authentication = new AuthorizationService();
            const user = await authentication.Comprobate(resultAuthorization.value);

            return new ShowPostCommand(user);
        } catch (error) {
            throw error;
        }
        
    }
}

export default PostsShowAdapter;
