class ShowUserCommand implements IShowCommand{
    
    private Id: any;

    public constructor(id: number){
        this.Id = id;
    }

    GetId() {
        return this.Id;
    }
}

export default ShowUserCommand;