import express, {Express} from 'express';
import Router from './Infraestructure/Routs';
import 'reflect-metadata';
import * as dotenv from 'dotenv';
import { createConnectionDB } from './DataBase/Configs';

class app{

    private express: Express;
    private router: Router;

    public constructor(){
        dotenv.config();
        this.express = express();
        createConnectionDB();
        this.router = new Router(this.express);
    }

    public run(){
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