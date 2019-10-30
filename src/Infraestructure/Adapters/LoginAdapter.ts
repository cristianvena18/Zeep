import { Request } from "express";
import { InfraestructureError } from "../utils/errors/InfraestructureError";
import userSchema from './Schemas/UserSchemas';
import { inject, injectable } from "inversify";
import TYPES from "../../types";
import IHashService from "../Services/IHashService";
import LoginCommand from '../Commands/LoginCommand';

@injectable()
class LoginAdapter{

    private hashService: IHashService;

    public constructor(@inject(TYPES.IHashService) hasher: IHashService){
        this.hashService = hasher;
    }

    public async adapt(req: Request){
        const { username, password } = req.body;

        if (username === undefined || password === undefined) {
            throw new InfraestructureError("not username and/or password found", 400);
        }

        const schema = userSchema.validate(req.body);

        console.log('paso antes');
        if(schema.error){
            throw new InfraestructureError('Bad request', 400);
        }

        console.log('paso');
        const hashPassword = this.hashService.Encrypt(password);

        return new LoginCommand(username, hashPassword);
    }
}

export default LoginAdapter;