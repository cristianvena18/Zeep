import User from '../../Domain/Entity/User';
import { Request, Response } from 'express';
import Session from '../../Domain/Entity/Sessions';
import { DeleteResult } from 'typeorm';
import HashService from '../Services/HashService';


class LoginController {

    public static async LogIn(req: Request, res: Response) {

        const { nickname, password } = req.body;

        if (!nickname || !password) {
            res.status(400).json({ message: "not username and/or password found" });
        }

        const user: User | undefined = await User.findOne({ Username: nickname });

        if (user) {
            const hasher = new HashService();

            const hashPassword = hasher.Encrypt(password);
            const valid: boolean = hasher.Equals(user.Password, hashPassword);

            if (valid) {
                const token = hasher.GeneratedToken();
                const session = new Session(user.Id, token);
                await session.save();
                res.status(200).json({iduser: user.Id, name: user.Name, nickname: user.Username, token: token });
            }
            else {
                res.status(400).json({ message: 'not valid password!' });
            }
        }
        else {
            res.status(404).json({ message: 'the user not found' });
        }
    }

    public static async LogOut(req: Request, res: Response) {
        try {
            const user: User | undefined = await User.findOne({ Id: req.body.iduser });

            if (!user) {
                res.status(404).json({ message: 'not user found' });
            }
            else {
                const a: DeleteResult = await Session.delete({ IdUser: user.Id });

                if (a.affected === 1) {
                    res.status(200).json({ message: 'successful logout!' });
                }
                else {
                    res.status(500).json({ message: 'problems with user logout' });
                }
            }
        } catch (error) {
            res.status(500).json({ message: error });
        }

    }
}

export default LoginController;