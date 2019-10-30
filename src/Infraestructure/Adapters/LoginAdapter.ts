import { Request } from "express";
import userSchema from './Schemas/UserSchemas';
import { inject, injectable } from "inversify";
import TYPES from "../../types";
import IHashService from "../Services/IHashService";
import LoginCommand from '../Commands/LoginCommand';
import { InvalidData } from "../utils/errors/InvalidData";

@injectable()
class LoginAdapter{

    private hashService: IHashService;

    public constructor(@inject(TYPES.IHashService) hasher: IHashService){
        this.hashService = hasher;
    }

    public async adapt(req: Request){
        const { username, password } = req.body;

        if (username === undefined || password === undefined) {
            throw new InvalidData("not username and/or password found");
        }

        const schema = userSchema.validate(req.body);

        console.log('paso antes');
        if(schema.error){
            throw new InvalidData('Bad request');
        }

        console.log('paso');
        const hashPassword = this.hashService.Encrypt(password);

        return new LoginCommand(username, hashPassword);
    }
}

export default LoginAdapter;