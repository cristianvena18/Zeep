import {NextFunction, Request, Response} from "express";
import CurrentUserService from "../Services/CurrentUserService";
import {inject, injectable} from "inversify";
import { InfraestructureError } from "../utils/errors/InfraestructureError";
import Role from "../../Domain/Entity/Role";
import { Roles } from "../../Domain/Enums/Roles";

@injectable()
export class AuthenticateMiddleware {

    private currentUserService: CurrentUserService;

    public constructor(@inject(CurrentUserService) currentUserService: CurrentUserService) {
        this.currentUserService = currentUserService;
    }


    public redirectIfNotAuthenticate = async (req: Request, res: Response, next: NextFunction) => {
        const {authorization} = req.headers;

        try {
            const userId = await this.currentUserService.getUserId(authorization);

            if(userId === undefined){
                res.status(401).json({error: 'Unauthorized'});
            }else{
               // console.log(userId);
                req.body.currentUserId = userId;
            }
            next();
        } catch (error) {
            if(error instanceof InfraestructureError){
                res.status(error.getStatusCode()).json(error.message);
            }
        }
    }
}