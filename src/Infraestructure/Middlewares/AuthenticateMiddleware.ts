import {NextFunction, Request, Response} from "express";
import CurrentUserService from "../Services/CurrentUserService";
import {inject, injectable} from "inversify";

@injectable()
export class AuthenticateMiddleware {

    private currentUserService: CurrentUserService;

    public constructor(@inject(CurrentUserService) currentUserService: CurrentUserService) {
        this.currentUserService = currentUserService;
    }


    public redirectIfNotAuthenticate = (req: Request, res: Response, next: NextFunction) => {
        const {authorization} = req.headers;

        const userId = this.currentUserService.getUserId(authorization);

        if(!userId){
            res.status(401).json({error: 'Unauthorized'});
        }
        //@ts-ignore
        req.currentUserId = userId;
        next();
    }
}