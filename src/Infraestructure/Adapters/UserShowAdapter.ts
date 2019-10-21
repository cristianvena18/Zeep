import {Request} from 'express';
import schemaAuthorization from './Schemas/AuthorizationSchemas';
import schemaId from './Schemas/IdFindSchema';
import ShowUserCommand from '../Commands/ShowUserCommand';
import AuthorizationService from '../Services/AuthorizationService';
import User from '../../Domain/Entity/User';

class UserShowAdapter{

    public async adap(req: Request){
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

        const authenticator = new AuthorizationService();
        const user: User = await authenticator.Comprobate(resultAuthorization.value);

        return new ShowUserCommand(user, resultId.value);
    }
}

export default UserShowAdapter;