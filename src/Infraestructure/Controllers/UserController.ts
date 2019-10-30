import { Request, Response } from 'express';
import User from '../../Domain/Entity/User';
import Role from '../../Domain/Entity/Role';
import UserStoreAdapter from '../Adapters/UserStoreAdapter';
import UserStoreHandler from '../../Domain/Handlers/UserStoreHandler';
import UserShowAdapter from '../Adapters/UserShowAdapter';
import UserShowHandler from '../../Domain/Handlers/UserShowHandler';
import { injectable, inject } from 'inversify';
import { InfraestructureError } from '../utils/errors/InfraestructureError';
import { ApplicationError } from '../utils/errors/AppError';

@injectable()
class UserController {

    private userStoreAdapter: UserStoreAdapter;
    private userStoreHandler: UserStoreHandler;
    private userShowAdapter: UserShowAdapter;
    private userShowHandler: UserShowHandler;

    constructor(
        @inject(UserStoreAdapter) storeAdapter: UserStoreAdapter,
        @inject(UserStoreHandler) storeHandler: UserStoreHandler,
        @inject(UserShowAdapter) showAdapter: UserShowAdapter,
        @inject(UserShowHandler) showHandler: UserShowHandler
    ) {
        this.userShowAdapter = showAdapter;
        this.userShowHandler = showHandler;
        this.userStoreAdapter = storeAdapter;
        this.userStoreHandler = storeHandler;
    }

    public Store = async (req: Request, res: Response) => {
        try {
            const command = this.userStoreAdapter.adapt(req);
            const response = await this.userStoreHandler.execute(command);

            res.status(201).json({ message: response });
        } catch (error) {
            if (error instanceof InfraestructureError) {
                res.status(error.getStatusCode()).json({ message: error.message });
            } else if (error instanceof ApplicationError) {
                res.status(500).json({ message: error.getDescription() });
            } else {
                res.status(500).json({ message: 'unexpected error' });
            }
        }

    }

    public Show = async (req: Request, res: Response) => {
        try {
            const command = await this.userShowAdapter.adap(req);
            const response = await this.userShowHandler.execute(command);

            res.status(200).json({ message: 'user found', user: response });
        } catch (error) {
            if (error instanceof InfraestructureError) {
                res.status(error.getStatusCode()).json({ message: error.message });
            } else if (error instanceof ApplicationError) {
                res.status(500).json({ message: error.getDescription() });
            } else {
                res.status(500).json({ message: 'unexpected error' });
            }
        }
    }

    public Update = async (req: Request, res: Response) => {

        const { id } = req.params;
        const { role, block } = req.body;

        if (!role && block === undefined) {
            res.status(400).json({ message: 'bad request, expected role or block for update user' });
        }

        const user: User | undefined = await User.findOne(id);

        if (user) {
            try {
                const _role: Role = await Role.findOneOrFail({ where: { name: role } });
                user.addRole(_role);
                user.save();
            } catch (e) {
                res.status(500).json(e);
            }
            res.json({ user });
        }
    }
}

export default UserController;