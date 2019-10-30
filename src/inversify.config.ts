import { Container } from "inversify";
import 'reflect-metadata';
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
import LoginAdapter from "./Infraestructure/Adapters/LoginAdapter";
import LogOutAdapter from "./Infraestructure/Adapters/LogOutAdapter";
import LoginHandler from "./Domain/Handlers/LoginHandler";
import LogOutHandler from "./Domain/Handlers/LogOutHandler";
import { ErrorHandler } from "./Infraestructure/utils/ErrorHandler";
import PostUpdateAdapter from "./Infraestructure/Adapters/PostUpdateAdapter";
import PostUpdateHandler from "./Domain/Handlers/PostUpdateHandler";
import CommentInCommentHandler from "./Domain/Handlers/CommentInCommentHandler";
import CommentInCommentAdapter from "./Infraestructure/Adapters/CommentInCommentAdapter";

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
container.bind<LoginAdapter>(LoginAdapter).toSelf();
container.bind<LogOutAdapter>(LogOutAdapter).toSelf();
container.bind<PostUpdateAdapter>(PostUpdateAdapter).toSelf();
container.bind<CommentInCommentAdapter>(CommentInCommentAdapter).toSelf();

// Handlers
container.bind<PostStoreHandler>(PostStoreHandler).toSelf();
container.bind<PostShowHandler>(PostShowHandler).toSelf();
container.bind<AllPostsShowHandler>(AllPostsShowHandler).toSelf();
container.bind<UserShowHandler>(UserShowHandler).toSelf();
container.bind<UserStoreHandler>(UserStoreHandler).toSelf();
container.bind<LoginHandler>(LoginHandler).toSelf();
container.bind<LogOutHandler>(LogOutHandler).toSelf();
container.bind<ErrorHandler>(ErrorHandler).toSelf();
container.bind<PostUpdateHandler>(PostUpdateHandler).toSelf();
container.bind<CommentInCommentHandler>(CommentInCommentHandler).toSelf();

// Services
container.bind<IHashService>(TYPES.IHashService).to(HashService);
container.bind<CurrentUserService>(CurrentUserService).toSelf();

// Middlewares
container.bind<AuthenticateMiddleware>(AuthenticateMiddleware).toSelf();
container.bind<CurrentRequestMiddleware>(CurrentRequestMiddleware).toSelf();

export default container;