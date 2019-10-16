class ShowUserCommand implements IShowUserCommand{
    
    private prop: any;

    public constructor(prop: any){
        this.prop = prop;
    }

    GetPropiety() {
        return this.prop;
    }

}

export default ShowUserCommand;