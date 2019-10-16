import {Request} from 'express';
import CreateUserCommand from './Commands/CreateUserCommands';
import schema from './Schemas/UserSchemas';
import HashService from '../Services/HashService';

class UserAdapter{

    private hasher: IHashService;

    public constructor(){
        this.hasher = new HashService();
    }

    public adapt = (req: Request): CreateUserCommand => {
        const result = schema.validate(req.body);

        if(result.error){
            throw result.error;
        }

        const {name, password} = result.value;

        const hashPassword = this.hasher.Encrypt(password);

        return new CreateUserCommand(name, hashPassword);
    }
}

export default UserAdapter;