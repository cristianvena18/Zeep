import {Request} from 'express';
import schemaId from './Schemas/IdFindSchema';
import ShowUserCommand from '../Commands/ShowUserCommand';

class UserShowAdapter{

    public async adap(req: Request){
        const {id} = req.body;

        const resultId = schemaId.validate(id);

        if(resultId.error){
            throw resultId.error;
        }

        return new ShowUserCommand(resultId.value);
    }
}

export default UserShowAdapter;