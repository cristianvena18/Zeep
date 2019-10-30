import { Request, Response } from 'express';
import LoginAdapter from '../Adapters/LoginAdapter';
import LoginHandler from '../../Domain/Handlers/LoginHandler';
import LogOutAdapter from '../Adapters/LogOutAdapter';
import LogOutHandler from '../../Domain/Handlers/LogOutHandler';
import { injectable, inject } from 'inversify';

@injectable()
class LoginController {

    private loginAdapter: LoginAdapter;
    private loginHandler: LoginHandler;
    private logoutAdapter: LogOutAdapter;
    private logoutHandler: LogOutHandler;

    public constructor(
        @inject(LoginAdapter) loginAdapter: LoginAdapter,
        @inject(LoginHandler) loginHandler: LoginHandler,
        @inject(LogOutAdapter) logoutAdapter: LogOutAdapter,
        @inject(LogOutHandler) logoutHandler: LogOutHandler
    ) {
        this.loginAdapter = loginAdapter;
        this.loginHandler = loginHandler;
        this.logoutAdapter = logoutAdapter;
        this.logoutHandler = logoutHandler;
    }

    public LogIn = async (req: Request, res: Response) => {
        try {
            const command = await this.loginAdapter.adapt(req);

            const response = await this.loginHandler.execute(command);

            res.status(200).json(response);
        } catch (error) {
            res.status(500).json({message: error});
        }
    }

    public LogOut = async (req: Request, res: Response) => {

        const command = this.logoutAdapter.adapt(req);

        const response = this.logoutHandler.execute(command);

        res.status(200).json(response);
    }
}

export default LoginController;