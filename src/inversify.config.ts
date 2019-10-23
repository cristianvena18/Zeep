import { Container } from "inversify";
import TYPES from "./types";
import LoginController from "./Infraestructure/Controllers/LoginController";
import IHashService from "./Infraestructure/Services/IHashService";
import HashService from "./Infraestructure/Services/HashService";
import { AuthenticateMiddleware } from "./Infraestructure/Middlewares/AuthenticateMiddleware";
import CurrentUserService from "./Infraestructure/Services/CurrentUserService";
import UserController from "./Infraestructure/Controllers/UserController";
import PostController from "./Infraestructure/Controllers/PostController";
import CurrentRequestMiddleware from "./Infraestructure/Middlewares/CurrentRequestMiddleware";

var container = new Container();

// Controllers
container.bind<LoginController>(LoginController).toSelf();
container.bind<UserController>(UserController).toSelf();
container.bind<PostController>(PostController).toSelf();

// Services
container.bind<IHashService>(TYPES.IHashService).to(HashService);
container.bind<CurrentUserService>(CurrentUserService).toSelf();

//middlewares
container.bind<AuthenticateMiddleware>(AuthenticateMiddleware).toSelf();
container.bind<CurrentRequestMiddleware>(CurrentRequestMiddleware).toSelf();

export default container;