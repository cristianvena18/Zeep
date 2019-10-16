import User from "../Entity/User";

class UserShowUseCase implements IShowUseCases{
    public async execute(command: IShowUserCommand) {
        const id: number = command.GetPropiety();

        try {
            const user = await User.findOne({Id: id});
            
            if(user){
                //no funciona
                // if (user.hasRole(new Role("admin"))) {
                //     res.status(200).json({message: 'Ok', user});
                // }
    
                if(user.IsBlocked){
                    return new ResponseCommand(410, {message: "this user is blocked, you are not authorized to see it"});
                }
    
                return new ResponseCommand(200, {message: 'Ok', user});
            }
            else{
                return new ResponseCommand(404, {message: "not user found"});
            }
        } catch (error) {
            return new ResponseCommand(500, {message: error});
        }
    }

}

export default UserShowUseCase;