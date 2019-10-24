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
import PostsShowAdapter from "./Infraestructure/Adapters/PostsShowAdapter";
import PostShowAdapter from "./Infraestructure/Adapters/PostShowAdapter";
import AllPostsShowHandler from "./Domain/Handlers/AllPostsShowHandler";
import PostStoreAdapter from "./Infraestructure/Adapters/PostStoreAdapter";
import PostStoreHandler from "./Domain/Handlers/PostStoreHandler";
import PostShowHandler from "./Domain/Handlers/PostShowHandler";
import UserShowAdapter from "./Infraestructure/Adapters/UserShowAdapter";
import UserStoreAdapter from "./Infraestructure/Adapters/UserStoreAdapter";
import UserShowHandler from "./Domain/Handlers/UserShowHandler";
import UserStoreHandler from "./Domain/Handlers/UserStoreHandler";

var container = new Container();

// Controllers
container.bind<LoginController>(LoginController).toSelf();
container.bind<UserController>(UserController).toSelf();
container.bind<PostController>(PostController).toSelf();

// Adapters
container.bind<PostsShowAdapter>(PostsShowAdapter).toSelf();
container.bind<PostShowAdapter>(PostShowAdapter).toSelf();
container.bind<PostStoreAdapter>(PostStoreAdapter).toSelf();
container.bind<UserShowAdapter>(UserShowAdapter).toSelf();
container.bind<UserStoreAdapter>(UserStoreAdapter).toSelf();

// Handlers
container.bind<PostStoreHandler>(PostStoreHandler).toSelf();
container.bind<PostShowHandler>(PostShowHandler).toSelf();
container.bind<AllPostsShowHandler>(AllPostsShowHandler).toSelf();
container.bind<UserShowHandler>(UserShowHandler).toSelf();
container.bind<UserStoreHandler>(UserStoreHandler).toSelf();

// Services
container.bind<IHashService>(TYPES.IHashService).to(HashService);
container.bind<CurrentUserService>(CurrentUserService).toSelf();

// Middlewares
container.bind<AuthenticateMiddleware>(AuthenticateMiddleware).toSelf();
container.bind<CurrentRequestMiddleware>(CurrentRequestMiddleware).toSelf();

export default container;