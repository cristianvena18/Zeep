import { Request, Response, Express, NextFunction } from 'express';

import UserController from '../Controllers/UserController';
import LoginController from '../Controllers/LoginController';
import PostController from '../Controllers/PostController';

import bodyParser = require('body-parser');
import { inject } from 'inversify';
import { AuthenticateMiddleware } from '../Middlewares/AuthenticateMiddleware';
import { ErrorHandler } from '../utils/ErrorHandler';
import container from '../../inversify.config';
import RequireJsonContent from '../Middlewares/CurrentRequestMiddleware';

class Routs {

    private express: Express;
    private loginController: LoginController;
    private authMiddleware: AuthenticateMiddleware;
    private requestMiddleware: RequireJsonContent;
    private postController: PostController;
    private userController: UserController;


    constructor(
        express: Express,
        @inject(LoginController) authController: LoginController,
        @inject(AuthenticateMiddleware) authMiddleware: AuthenticateMiddleware,
        @inject(RequireJsonContent) requestService: RequireJsonContent,
        @inject(PostController) postController: PostController,
        @inject(UserController) userController: UserController
    ) {
        this.express = express;
        this.loginController = authController;
        this.authMiddleware = authMiddleware;
        this.requestMiddleware = requestService;
        this.postController = postController;
        this.userController = userController;
    }

    public Up() {
        this.UserRouts();
    }

    private UserRouts() {
        this.express.use(this.requestMiddleware.Comprobate);

        this.express.use(bodyParser.urlencoded({ extended: false }));
        this.express.use(bodyParser.json());

        this.express.use((err: Error, req: Request, res: Response, next: NextFunction) => {
            const errorHandler: ErrorHandler = container.get(ErrorHandler);

            errorHandler.handle(err, res);
        });

        this.express.post('/register', this.userController.Store);
        this.express.post('/login', this.loginController.LogIn);

        this.express.get('/post', this.postController.Show);
        this.express.get('/post/:id', this.postController.ShowId);

        this.express.use(this.authMiddleware.redirectIfNotAuthenticate);

        this.express.post('/post/:id', (req: Request, res: Response) => {
            res.status(500).json({ message: 'not implemented function' });
        });
        this.express.get('/user/:id', this.userController.Show);
        this.express.post('/user/:id', this.userController.Update);
        this.express.post('/post', this.postController.Store);
        this.express.post('/logout', this.loginController.LogOut);
    }
}

export default Routs;