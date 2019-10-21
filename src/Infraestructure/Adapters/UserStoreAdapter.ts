import {Request} from 'express';
import CreateUserCommand from '../Commands/CreateUserCommands';
import schema from './Schemas/UserSchemas';
import HashService from '../Services/HashService';
import { InvalidData } from '../Exception/InvalidData';

class UserStoreAdapter{

    private hasher: HashService;

    public constructor(){
        this.hasher = new HashService();
    }

    public adapt = (req: Request): CreateUserCommand => {
        const result = schema.validate(req.body);

        if(result.error){
            throw new InvalidData(result.error.message);
        }

        const {username, password} = result.value;

        const hashPassword = this.hasher.Encrypt(password);

        return new CreateUserCommand(username, hashPassword);
    }
}

export default UserStoreAdapter;