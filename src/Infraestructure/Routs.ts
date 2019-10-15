import {Request, Response, Express} from 'express';

import UserController from './Controllers/UserController';
import LoginController from './Controllers/LoginController';
import PostController from './Controllers/PostController';

import bodyParser = require('body-parser');

class Routs{

    private express: Express;

    public constructor(express: Express){
        this.express = express;
    }

    public Up(){
        this.UserRouts();
    }

    private UserRouts(){
        this.express.use(bodyParser.urlencoded({extended: false}));
        this.express.use(bodyParser.json());

        this.express.get('/', function(req: Request, res: Response){
            res.status(200).send("hello");
        });

        this.express.post('/user', UserController.Store);
        this.express.get('/user/:id', UserController.Show);
        this.express.post('/user/:id/block', UserController.BlockUser);
        this.express.get('/post', PostController.Show);
        this.express.get('/post/:id', PostController.ShowId);
        this.express.post('/user/:id', UserController.Update);
        this.express.post('/post', PostController.Store);
        this.express.post('/logout', LoginController.LogOut);

        this.express.post('/login', LoginController.LogIn);
    }
}

export default Routs;