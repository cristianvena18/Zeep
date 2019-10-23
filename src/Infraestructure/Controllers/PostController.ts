import { Request, Response } from 'express';
import PostStoreAdapter from '../Adapters/PostStoreAdapter';
import PostStoreHandler from '../../Domain/Handlers/PostStoreHandler';
import PostShowAdapter from '../Adapters/PostShowAdapter';
import PostsShowAdapter from '../Adapters/PostsShowAdapter';
import PostsShowHandler from '../../Domain/Handlers/PostsShowHandler';
import PostShowHandler from '../../Domain/Handlers/PostShowHandler';
import UnAuthorizedException from '../../Domain/Exceptions/UnAuthorizedException';
import { SessionInvalid } from '../Exception/SessionInvalid';
import { EntityNotFound } from '../Exception/EntityNotFound';
import { SessionNotFound } from '../Exception/SessionNotFound';
import { DataBaseError } from '../Exception/DataBaseError';
import { InvalidData } from '../Exception/InvalidData';
import { injectable } from 'inversify';
import container from '../../inversify.config';
import CurrentUserService from '../Services/CurrentUserService';

@injectable()
class PostController {
    public async Show(req: Request, res: Response) {

        try {
            const postAdapter = new PostsShowAdapter(container.get(CurrentUserService));
            const commandAdapter = await postAdapter.adapt(req);

            const useCase: PostsShowHandler = new PostsShowHandler();
            const posts = await useCase.execute(commandAdapter);

            res.status(200).json({ message: 'ok', posts });
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

    public async ShowId(req: Request, res: Response) {

        try {
            const postShowAdapter = new PostShowAdapter(container.get(CurrentUserService));
            const commandAdapter = await postShowAdapter.adapt(req);

            const useCase: PostShowHandler = new PostShowHandler();
            const post = await useCase.execute(commandAdapter);

            res.status(200).json({ message: 'ok', posts: [post] });
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

    public async Store(req: Request, res: Response) {

        try {
            const adapter: PostStoreAdapter = new PostStoreAdapter(container.get(CurrentUserService));
            const commandAdapter = await adapter.adapt(req);

            const postUseCase: PostStoreHandler = new PostStoreHandler();
            await postUseCase.execute(commandAdapter);

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