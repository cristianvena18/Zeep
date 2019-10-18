import { Request, Response } from 'express';
import PostStoreAdapter from '../Adapters/PostStoreAdapter';
import PostStoreUseCase from '../../Domain/UsesCases/PostStoreUseCase';
import PostShowByIdAdapter from '../Adapters/PostShowByIdAdapter';
import PostShowByIdUseCase from '../../Domain/UsesCases/PostShowByIdUseCase';
import PostShowAdapter from '../Adapters/PostShowAdapter';
import PostShowUseCase from '../../Domain/UsesCases/PostShowUseCase';

class PostController {
    public static async Show(req: Request, res: Response) {

        try {
            const postAdapter = new PostShowAdapter();
            const commandAdapter = postAdapter.adapt(req);

            const useCase = new PostShowUseCase(commandAdapter);
            const commandRespose = await useCase.execute();

            res.status(commandRespose.GetStatus()).json(commandRespose.GetObject());
        } catch (error) {
            res.status(400).json({ message: error });
        }
    }

    public static async ShowId(req: Request, res: Response) {

        try {
            const postShowAdapter = new PostShowByIdAdapter();
            const commandAdapter = postShowAdapter.adapt(req);

            const useCase = new PostShowByIdUseCase(commandAdapter);
            const commandRespose = await useCase.execute();

            res.status(commandRespose.GetStatus()).json(commandRespose.GetObject());
        } catch (error) {
            res.status(400).json({ message: error });
        }
    }

    public static async Store(req: Request, res: Response) {

        try {
            const adapter: PostStoreAdapter = new PostStoreAdapter();
            const commandAdapter: CreatePostCommand = adapter.adapt(req);

            const postUseCase = new PostStoreUseCase(commandAdapter);
            const commandRespose: IResponseCommand = await postUseCase.execute();

            res.status(commandRespose.GetStatus()).json(commandRespose.GetObject());
        } catch (error) {
            res.status(400).json({message: error});
        }
    }
}

export default PostController;