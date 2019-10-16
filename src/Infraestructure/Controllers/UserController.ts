import {Request, Response} from 'express';
import User from '../../Domain/Entity/User';
import Role from '../../Domain/Entity/Role';
import UserAdapter from '../Adapters/UserAdapter';
import UserStoreUseCase from '../../Domain/UsesCases/UserStoreUseCase';

class UserController{

    public static async Store(req: Request, res: Response){
        const userAdapter = new UserAdapter();

        const command = userAdapter.adapt(req);

        const useCase = new UserStoreUseCase(command);
        try {
            await useCase.execute();

            res.status(201).json({message: "The user has been successfully created"});
        } catch (error) {
            res.status(500).json({message: error});
        }
    }

    public static async Show(req: Request, res: Response){

        try {
            const {id} = req.params;

            const user: User | undefined = await User.findOne(id);

            if(user){
                //no funciona
                // if (user.hasRole(new Role("admin"))) {
                //     res.status(200).json({message: 'Ok', user});
                // }

                if(user.IsBlocked){
                    res.status(410).json({message: "this user is blocked, you are not authorized to see it"});
                }

                res.status(200).json({message: 'Ok', user});
            }
            else{
                res.status(404).json({message: "not user found"});
            }

        } catch (error) {
            res.status(404).json({message: 'Not found user whit this id'});
        }
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

                user.addRole(role);
                user.save();

            } catch(e) {
                res.status(500).json(e);
            }

            res.json({user});
        }
    
    }
}

export default UserController;