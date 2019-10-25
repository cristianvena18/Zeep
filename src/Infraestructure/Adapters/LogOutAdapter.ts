import { Request } from "express";
import schema from "./Schemas/UserSchemas";
import { InfraestructureError } from "../utils/errors/InfraestructureError";
import LogOutCommand from "../Commands/LogOutCommand";
import { injectable } from "inversify";

@injectable()
class LogOutAdapter{
    public constructor(){

    }

    public adapt(req: Request){
        const {username} = req.body;

        const result = schema.validate(username);

        if(result.error){
            throw new InfraestructureError(result.error.message, 400);
        }

        return new LogOutCommand(result.value);
    }
}

export default LogOutAdapter;