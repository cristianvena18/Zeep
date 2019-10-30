import { Request } from "express";
import schema from "./Schemas/AuthorizationSchemas";
import { InfraestructureError } from "../utils/errors/InfraestructureError";
import LogOutCommand from "../Commands/LogOutCommand";
import { injectable } from "inversify";

@injectable()
class LogOutAdapter{
    public constructor(){

    }

    public adapt(req: Request){
        const {authorization} = req.headers;

        const result = schema.validate({authorization});

        if(result.error){
            throw new InfraestructureError(result.error.message, 400);
        }

        return new LogOutCommand(authorization);
    }
}

export default LogOutAdapter;