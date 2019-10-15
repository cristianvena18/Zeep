import {Request, Response} from 'express';
import User from '../../Entity/User';

class PostController{
    public static async Show(req: Request, res: Response){
        const {iduser, idpost} = req.body;

        const user: User | undefined = await User.findOne(iduser);

        
    }

    public static async ShowId(req: Request, res: Response){

    }

    public static async Store(req: Request, res: Response){

    }
}

export default PostController;