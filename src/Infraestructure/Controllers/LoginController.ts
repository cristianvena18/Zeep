import HashController from './HashController';
import User from '../../Domain/Entity/User';
import {Request, Response} from 'express';
import Session from '../../Domain/Entity/Sessions';


class LoginController{

    public static async LogIn(req: Request, res: Response){

        const {nickname, password} = req.body;

        if(!nickname || !password){
            res.status(400).json({message: "not username and/or password found"});
        }

        const user: User | undefined = await User.findOne({Nickname: nickname});

        if(user){
            const hasher = new HashController();

            const hashPassword = hasher.Encrypt(password);
            const valid: boolean = hasher.Equals(user.Password, hashPassword);

            if (valid) {
                const token = hasher.GeneratedToken();
                const session = new Session(user.Id, token);
                await session.save();
                res.status(200).json({name: user.Name, nickname: user.Nickname, token: token});
            }
            else{
                res.status(400).json({message: 'not valid password!'});
            }
        }
        else{
            res.status(404).json({message: 'the user not found'});
        }
    }

    public static async LogOut(req: Request, res: Response){
        
    }
}

export default LoginController;