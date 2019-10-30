import { Request } from "express";
import schema from "./Schemas/AuthorizationSchemas";
import LogOutCommand from "../Commands/LogOutCommand";
import { injectable } from "inversify";
import { InvalidData } from "../utils/errors/InvalidData";

@injectable()
class LogOutAdapter{
    public constructor(){

    }

    public adapt(req: Request){
        const {authorization} = req.headers;

        const result = schema.validate({authorization});

        if(result.error){
            throw new InvalidData(result.error.message);
        }

        return new LogOutCommand(authorization);
    }
}

export default LogOutAdapter;