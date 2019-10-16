import {Request, Response} from 'express';
import User from '../../Domain/Entity/User';
import Role from '../../Domain/Entity/Role';
import UserStoreAdapter from '../Adapters/UserStoreAdapter';
import UserStoreUseCase from '../../Domain/UsesCases/UserStoreUseCase';
import UserShowAdapter from '../Adapters/UserShowAdapter';
import UserShowUseCase from '../../Domain/UsesCases/UserShowUseCase';

class UserController{

    public static async Store(req: Request, res: Response){

        const userAdapter = new UserStoreAdapter();
        const command = userAdapter.adapt(req);

        const useCase: UserStoreUseCase = new UserStoreUseCase(command);
        const response: IResponseCommand = await useCase.execute();

        res.status(response.GetStatus()).json(response.GetObject());
    }

    public static async Show(req: Request, res: Response){

        const userAdapter = new UserShowAdapter();
        const command = userAdapter.adap(req);

        const UserShow = new UserShowUseCase();
        const response: IResponseCommand = await UserShow.execute(command);

        res.status(response.GetStatus()).json(response.GetObject);
    }

    public static async BlockUser(req: Request, res: Response){
        const {iduser, authorization} = req.body;

        if(!iduser){
            res.status(400).json({message: "Not found iduser"});
        }

        if(!authorization){
            res.status(400).json({message: "Not found authorization code"});
        }
        const user: User | undefined = await User.findOne(iduser);

        if(!user){
            res.status(404).json({message: "Not user found"});
        }else{
            user.IsBlocked = true;
            user.save();
            res.status(201).json({message: "user blocked!"});
        }
    }

    public static async Update(req: Request, res: Response){

        const {id} = req.params;
        const roleName = req.body.role;

        const user: User | undefined = await User.findOne(id);

        if(user){
            try{
                const role: Role = await Role.findOneOrFail({ where: { name: roleName} });

                // user.addRole(role);
                user.save();

            } catch(e) {
                res.status(500).json(e);
            }

            res.json({user});
        }
    
    }
}

export default UserController;