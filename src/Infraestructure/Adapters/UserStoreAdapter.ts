import {Request} from 'express';
import CreateUserCommand from '../Commands/CreateUserCommands';
import schema from './Schemas/UserSchemas';
import HashService from '../Services/HashService';
import { inject, injectable } from 'inversify';
import IHashService from '../Services/IHashService';
import TYPES from '../../types';
import { InvalidData } from '../utils/errors/InvalidData';

@injectable()
class UserStoreAdapter{

    private hasher: HashService;

    public constructor(@inject(TYPES.IHashService) hashService: IHashService){
        this.hasher = hashService;
    }

    public adapt(req: Request): CreateUserCommand{
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