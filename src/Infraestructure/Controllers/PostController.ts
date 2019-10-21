import { Request, Response } from 'express';
import PostStoreAdapter from '../Adapters/PostStoreAdapter';
import PostStoreUseCase from '../../Domain/Services/PostStoreService';
import PostShowAdapter from '../Adapters/PostShowAdapter';
import PostsShowAdapter from '../Adapters/PostsShowAdapter';
import PostShowUseCase from '../../Domain/Services/PostsShowService';
import PostShowService from '../../Domain/Services/PostShowService';
import UnAuthorizedException from '../../Domain/Exceptions/UnAuthorizedException';
import { SessionInvalid } from '../Exception/SessionInvalid';
import { EntityNotFound } from '../Exception/EntityNotFound';
import { SessionNotFound } from '../Exception/SessionNotFound';
import { DataBaseError } from '../Exception/DataBaseError';
import { InvalidData } from '../Exception/InvalidData';

class PostController {
    public static async Show(req: Request, res: Response) {

        try {
            const postAdapter = new PostsShowAdapter();
            const commandAdapter = await postAdapter.adapt(req);

            const useCase = new PostShowUseCase();
            const posts = await useCase.execute(commandAdapter);

            res.status(200).json({ message: 'ok', posts });
        } catch (error) {
            if (error instanceof UnAuthorizedException) {
                res.status(403).json({ message: error.message });
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

    public static async ShowId(req: Request, res: Response) {

        try {
            const postShowAdapter = new PostShowAdapter();
            const commandAdapter = await postShowAdapter.adapt(req);

            const useCase = new PostShowService();
            const post = await useCase.execute(commandAdapter);

            res.status(200).json({ message: 'ok', posts: [post] });
        } catch (error) {
            if (error instanceof UnAuthorizedException) {
                res.status(403).json({ message: error.message });
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

    public static async Store(req: Request, res: Response) {

        try {
            const adapter: PostStoreAdapter = new PostStoreAdapter();
            const commandAdapter = await adapter.adapt(req);

            const postUseCase = new PostStoreUseCase();
            await postUseCase.execute(commandAdapter);

            res.status(200).json({ message: 'post saved' });
        } catch (error) {
            if (error instanceof UnAuthorizedException) {
                res.status(403).json({ message: error.message });
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