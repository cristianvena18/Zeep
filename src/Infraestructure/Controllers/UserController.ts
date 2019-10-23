import { Request, Response } from 'express';
import User from '../../Domain/Entity/User';
import Role from '../../Domain/Entity/Role';
import UserStoreAdapter from '../Adapters/UserStoreAdapter';
import UserStoreHandler from '../../Domain/Handlers/UserStoreHandler';
import UserShowAdapter from '../Adapters/UserShowAdapter';
import UserShowHandler from '../../Domain/Handlers/UserShowHandler';
import { injectable, inject } from 'inversify';

@injectable()
class UserController {

    private userStoreAdapter: UserStoreAdapter;
    private userStoreHandler: UserStoreHandler;
    private userShowAdapter: UserShowAdapter;
    private userShowHandler: UserShowHandler;

    constructor(
        @inject(UserStoreAdapter) userStoreAdapter: UserStoreAdapter,
        @inject(UserStoreHandler) userStoreHandler: UserStoreHandler,
        @inject(UserShowAdapter) userShowAdapter: UserShowAdapter,
        @inject(UserShowHandler) userShowHandler: UserShowHandler 
    ){
        this.userShowAdapter = userShowAdapter;
        this.userShowHandler = userShowHandler;
        this.userStoreAdapter = userStoreAdapter;
        this.userStoreHandler = userStoreHandler;
    }

    public async Store(req: Request, res: Response) {

        const command = this.userStoreAdapter.adapt(req);
        const response = await this.userStoreHandler.execute(command);

        res.status(201).json({ message: response });
    }

    public async Show(req: Request, res: Response) {

        const command = await this.userShowAdapter.adap(req);
        const response = await this.userShowHandler.execute(command);

        res.status(200).json({ message: 'user found', user: response });
    }

    public async BlockUser(req: Request, res: Response) {
        const { iduser, authorization } = req.body;

        if (!iduser) {
            res.status(400).json({ message: "Not found iduser" });
        }

        if (!authorization) {
            res.status(400).json({ message: "Not found authorization code" });
        }
        const user: User | undefined = await User.findOne(iduser);

        if (!user) {
            res.status(404).json({ message: "Not user found" });
        } else {
            user.isBlocked = true;
            user.save();
            res.status(201).json({ message: "user blocked!" });
        }
    }

    public async Update(req: Request, res: Response) {

        const { id } = req.params;
        const roleName = req.body.role;

        const user: User | undefined = await User.findOne(id);

        if (user) {
            try {
                const role: Role = await Role.findOneOrFail({ where: { name: roleName } });
                // user.addRole(role);
                user.save();
            } catch (e) {
                res.status(500).json(e);
            }
            res.json({ user });
        }
    }
}

export default UserController;