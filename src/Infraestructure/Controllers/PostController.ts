import { Request, Response } from 'express';
import PostStoreAdapter from '../Adapters/PostStoreAdapter';
import PostStoreHandler from '../../Domain/Handlers/PostStoreHandler';
import PostShowAdapter from "../Adapters/PostShowAdapter";
import PostsShowAdapter from '../Adapters/PostsShowAdapter';
import AllPostsShowHandler from '../../Domain/Handlers/AllPostsShowHandler';
import PostShowHandler from '../../Domain/Handlers/PostShowHandler';
import UnAuthorizedException from '../../Domain/Exceptions/UnAuthorizedException';
import { SessionInvalid } from '../Exception/SessionInvalid';
import { EntityNotFound } from '../Exception/EntityNotFound';
import { SessionNotFound } from '../Exception/SessionNotFound';
import { DataBaseError } from '../Exception/DataBaseError';
import { InvalidData } from '../Exception/InvalidData';
import { injectable, inject } from 'inversify';

@injectable()
class PostController {

    private postsShowAdapter: PostsShowAdapter;
    private postsShowHandler: AllPostsShowHandler;
    private postShowAdapter: PostShowAdapter;
    private postShowHandler: PostShowHandler;
    private postStoreAdapter: PostStoreAdapter;
    private postStoreHandler: PostStoreHandler;

    constructor(
        @inject(PostsShowAdapter) postsShowAdapter: PostsShowAdapter,
        @inject(AllPostsShowHandler) postsShowHandler: AllPostsShowHandler,
        @inject(PostShowAdapter) postShowAdapter: PostShowAdapter,
        @inject(PostShowHandler) postShowHandler: PostShowHandler,
        @inject(PostStoreAdapter) postStoreAdapter: PostStoreAdapter,
        @inject(PostStoreHandler) postStoreHandler: PostStoreHandler
    ){
        this.postsShowAdapter = postsShowAdapter;
        this.postsShowHandler = postsShowHandler;
        this.postShowAdapter = postShowAdapter;
        this.postShowHandler = postShowHandler;
        this.postStoreAdapter = postStoreAdapter;
        this.postStoreHandler = postStoreHandler;
    }

    public async Show(req: Request, res: Response) {

        const commandAdapter = await this.postsShowAdapter.adapt(req);

        const posts = await this.postsShowHandler.execute(commandAdapter);

        res.status(200).json({ message: 'ok', posts });
    }

    public async ShowId(req: Request, res: Response) {

        const commandAdapter = await this.postShowAdapter.adapt(req);
        const post = await this.postShowHandler.execute(commandAdapter);

        res.status(200).json({ message: 'ok', posts: [post] });
    }

    public async Store(req: Request, res: Response) {

        try {
            const commandAdapter = await this.postStoreAdapter.adapt(req);
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
            } else{
                res.status(500).json({message: error.message});
            }
        }
    }
}

export default PostController;