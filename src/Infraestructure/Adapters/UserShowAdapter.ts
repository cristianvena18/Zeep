import {Request} from 'express';
import schema from './Schemas/FindSchemas';
import ShowUserCommand from '../Commands/ShowUserCommand';

class UserShowAdapter{

    public adap(req: Request){
        const {authorization} = req.headers;
        const {id} = req.body;

        const result = schema.validate(authorization, id);

        if(result.error){
            throw result.error;
        }

        const {idValid} = result.value;

        return new ShowUserCommand(idValid);
    }
}

export default UserShowAdapter;