import { Request, Response } from 'express';
import User from '../../Domain/Entity/User';
import Role from '../../Domain/Entity/Role';
import UserStoreAdapter from '../Adapters/UserStoreAdapter';
import UserStoreHandler from '../../Domain/Handlers/UserStoreHandler';
import UserShowAdapter from '../Adapters/UserShowAdapter';
import UserShowHandler from '../../Domain/Handlers/UserShowHandler';
import UnAuthorizedException from '../../Domain/Exceptions/UnAuthorizedException';
import { EntityNotFound } from '../Exception/EntityNotFound';
import { DataBaseError } from '../Exception/DataBaseError';
import { InvalidData } from '../Exception/InvalidData';
import { SessionNotFound } from '../Exception/SessionNotFound';
import { SessionInvalid } from '../Exception/SessionInvalid';
import { injectable } from 'inversify';
import TYPES from '../../types';
import container from '../../inversify.config';

@injectable()
class UserController {

    public async Store(req: Request, res: Response) {

        try {
            const userAdapter = new UserStoreAdapter(container.get(TYPES.IHashService));
            const command = userAdapter.adapt(req);

            const useCase: UserStoreHandler = new UserStoreHandler();
            const response = await useCase.execute(command);

            res.status(201).json({ message: response });

        } catch (error) {
            if (error instanceof DataBaseError) {
                res.status(500).json({ message: error.message });
            }
            else if (error instanceof InvalidData) {
                res.status(400).json({ message: error.message });
            }
            else if (error instanceof Error) {
                res.status(500).json({ message: error.message });
            }
        }
    }

    public async Show(req: Request, res: Response) {

        try {
            const userAdapter = new UserShowAdapter();
            const command = await userAdapter.adap(req);

            const UserShow: UserShowHandler = new UserShowHandler();
            const response = await UserShow.execute(command);

            res.status(200).json({ message: 'user found', user: response });
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
            } else {
                res.status(500).json({ message: error.message });
            }
        }
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