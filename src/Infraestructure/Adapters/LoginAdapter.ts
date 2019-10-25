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

        if (!username || !password) {
            throw new InfraestructureError("not username and/or password found", 400);
        }

        const schema = userSchema.validate(username, password);

        if(schema.error){
            throw new InfraestructureError(schema.error.message, 400);
        }

        const hashPassword = this.hashService.Encrypt(schema.value.password);

        return new LoginCommand(schema.value.username, hashPassword);
    }
}

export default LoginAdapter;