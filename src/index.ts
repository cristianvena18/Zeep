import container from './inversify.config';
import 'reflect-metadata';

import express, {Express} from 'express';
import Router from './Infraestructure/Router/Routs';
import * as dotenv from 'dotenv';

import { createConnectionDB } from './Infraestructure/DataBase/Configs';
import LoginController from './Infraestructure/Controllers/LoginController';
import { AuthenticateMiddleware } from './Infraestructure/Middlewares/AuthenticateMiddleware';
import CurrentRequestMiddleware from './Infraestructure/Middlewares/CurrentRequestMiddleware';
import PostController from './Infraestructure/Controllers/PostController';
import UserController from './Infraestructure/Controllers/UserController';

class app{

    private express: Express;
    private router: Router;

    public constructor(){
        dotenv.config();
        this.express = express();
        createConnectionDB();
        this.router = new Router(
            this.express, 
            container.get(LoginController), 
            container.get(AuthenticateMiddleware),
            container.get(CurrentRequestMiddleware),
            container.get(PostController),
            container.get(UserController)
            );
    }

    public run(){
        process.on('unhandledRejection', (reason, p) => {
            console.error(reason, 'Unhandled Rejection at Promise', p);
        })
        .on('uncaughtException', err => {
            console.error(err, 'Uncaught Exception thrown');
            process.exit(1);
        });

        this.upServer();
        this.router.Up();
    }

    private upServer(){
        this.express.listen(3000, function(){
            console.log('Example app listening on port 3000!');
        });
    }
}

const router = new app();
router.run();