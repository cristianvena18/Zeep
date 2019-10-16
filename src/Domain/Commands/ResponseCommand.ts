class ResponseCommand implements IResponseCommand{
    
    private status: number;
    private object: Object;
    
    public constructor(status: number, object: Object){
        this.status = status;
        this.object = object;
    }

    public GetStatus(){
        return this.status;
    }

    public GetObject(){
        return this.object;
    }
}