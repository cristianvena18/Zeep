import { Request, Response } from 'express';
import PostStoreAdapter from '../Adapters/PostStoreAdapter';
import PostStoreHandler from '../../Domain/Handlers/PostStoreHandler';
import PostShowAdapter from "../Adapters/PostShowAdapter";
import PostsShowAdapter from '../Adapters/PostsShowAdapter';
import AllPostsShowHandler from '../../Domain/Handlers/AllPostsShowHandler';
import PostShowHandler from '../../Domain/Handlers/PostShowHandler';
import UnAuthorizedException from '../utils/errors/UnAuthorizedException';
import { SessionInvalid } from '../utils/errors/SessionInvalid';
import { EntityNotFound } from '../utils/errors/EntityNotFound';
import { SessionNotFound } from '../utils/errors/SessionNotFound';
import { DataBaseError } from '../utils/errors/DataBaseError';
import { InvalidData } from '../utils/errors/InvalidData';
import { injectable, inject } from 'inversify';
import CreatePostCommand from '../Commands/CreatePostCommand';
import { InfraestructureError } from '../utils/errors/InfraestructureError';
import { ApplicationError } from '../utils/errors/AppError';
import PostUpdateAdapter from '../Adapters/PostUpdateAdapter';
import PostUpdateHandler from '../../Domain/Handlers/PostUpdateHandler';

@injectable()
class PostController {

    private postsShowAdapter: PostsShowAdapter;
    private postsShowHandler: AllPostsShowHandler;
    private postShowAdapter: PostShowAdapter;
    private postShowHandler: PostShowHandler;
    private postStoreAdapter: PostStoreAdapter;
    private postStoreHandler: PostStoreHandler;
    private postUpdateAdapter: PostUpdateAdapter;
    private postUpdateHandler: PostUpdateHandler;

    constructor(
        @inject(PostsShowAdapter) postsShowAdapter: PostsShowAdapter,
        @inject(AllPostsShowHandler) postsShowHandler: AllPostsShowHandler,
        @inject(PostShowAdapter) postShowAdapter: PostShowAdapter,
        @inject(PostShowHandler) postShowHandler: PostShowHandler,
        @inject(PostStoreAdapter) postStoreAdapter: PostStoreAdapter,
        @inject(PostStoreHandler) postStoreHandler: PostStoreHandler,
        @inject(PostUpdateAdapter) postUpdateAdapter: PostUpdateAdapter,
        @inject(PostUpdateHandler) postUpdateHandler: PostUpdateHandler
    ) {
        this.postsShowAdapter = postsShowAdapter;
        this.postsShowHandler = postsShowHandler;
        this.postShowAdapter = postShowAdapter;
        this.postShowHandler = postShowHandler;
        this.postStoreAdapter = postStoreAdapter;
        this.postStoreHandler = postStoreHandler;
        this.postUpdateAdapter = postUpdateAdapter;
        this.postUpdateHandler = postUpdateHandler;
    }

    public Show = async (req: Request, res: Response) => {

        try {
            const commandAdapter = await this.postsShowAdapter.adapt(req);

            const posts = await this.postsShowHandler.execute(commandAdapter);

            res.status(200).json({ message: 'ok', posts });
        } catch (error) {
            if (error instanceof InfraestructureError) {
                res.status(error.getStatusCode()).json(error.message);
            }
            else if (error instanceof ApplicationError) {
                res.status(500).json({ message: error.getDescription() });
            } else {
                res.status(500).json({ message: 'error unexpected' });
            }
        }
    }

    public ShowId = async (req: Request, res: Response) => {
        try {
            const commandAdapter = await this.postShowAdapter.adapt(req);
            const post = await this.postShowHandler.execute(commandAdapter);

            res.status(200).json({ message: 'ok', posts: [post] });
        } catch (error) {
            if (error instanceof InfraestructureError) {
                res.status(error.getStatusCode()).json(error.message);
            }
            else if (error instanceof ApplicationError) {
                res.status(500).json({ message: error.getDescription() });
            } else {
                res.status(500).json({ message: 'error unexpected' });
            }
        }
    }

    public Store = async (req: Request, res: Response) => {

        try {
            const commandAdapter: CreatePostCommand = await this.postStoreAdapter.adapt(req);
            await this.postStoreHandler.execute(commandAdapter);

            res.status(200).json({ message: 'post saved' });
        } catch (error) {
            if (error instanceof UnAuthorizedException) {
                res.status(401).json({ message: error.message });
            } else if (error instanceof SessionInvalid) {
                res.status(403).json({ message: error.message });
            } else if (error instanceof EntityNotFound) {
                res.status(404).json({ message: error.message });
            } else if (error instanceof SessionNotFound) {
                //revisar
            } else if (error instanceof InvalidData) {
                res.status(400).json({ message: error.message })
            } else if (error instanceof DataBaseError) {
                res.status(500).json({ message: error.message });
            } else {
                res.status(500).json({ message: error.message });
            }
        }
    }

    public Update = async (req: Request, res: Response) => {
        try {
            const commandAdapter = this.postUpdateAdapter.adapt(req);
            const respose = this.postUpdateHandler.execute(commandAdapter);

            res.status(200).json(respose);
        } catch (error) {
            if (error instanceof InfraestructureError) {
                res.status(error.getStatusCode()).json({ message: error.message });
            }else if(error instanceof ApplicationError){
                res.status(500).json({ message: error.getDescription() });
            }else{
                res.status(500).json({ message: 'error unexpected' });
            }
        }
    }
}

export default PostController;