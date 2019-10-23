import User from '../../Domain/Entity/User';
import { Request, Response } from 'express';
import Session from '../../Domain/Entity/Sessions';
import { DeleteResult } from 'typeorm';
import { inject, injectable } from 'inversify';
import IHashService from '../Services/IHashService';
import TYPES from '../../types';


@injectable()
class LoginController {

    private hashService: IHashService;

    public constructor(@inject(TYPES.IHashService) hashService: IHashService) {
        this.hashService = hashService;
    }

    public async LogIn(req: Request, res: Response) {

        const { username, password } = req.body;

        if (!username || !password) {
            res.status(400).json({ message: "not username and/or password found" });
        }

        const user: User | undefined = await User.findOne({ username: username });

        if (user) {

            const hashPassword = this.hashService.Encrypt(password);
            const valid: boolean = this.hashService.Equals(user.password, hashPassword);

            if (valid) {
                const token = this.hashService.GeneratedToken();
                const session = new Session(user.id, token);
                await session.save();
                res.status(200).json({ name: user.username, username: user.username, token: token });
            }
            else {
                res.status(400).json({ message: 'not valid password!' });
            }
        }
        else {
            res.status(404).json({ message: 'the user not found' });
        }
    }

    public async LogOut(req: Request, res: Response) {
        try {
            const user: User | undefined = await User.findOne({ id: req.body.iduser });

            if (!user) {
                res.status(404).json({ message: 'not user found' });
            }
            else {
                const a: DeleteResult = await Session.delete({ IdUser: user.id });

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