import {Request} from 'express';
import schemaAuthorization from './Schemas/AuthorizationSchemas';
import schemaId from './Schemas/IdFindSchema';
import ShowUserCommand from '../Commands/ShowUserCommand';

class UserShowAdapter{

    public adap(req: Request){
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

        const idValid = resultId.value;

        return new ShowUserCommand(idValid);
    }
}

export default UserShowAdapter;