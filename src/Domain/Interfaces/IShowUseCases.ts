interface IShowUseCases{
    execute(id: IShowUserCommand): Promise<ResponseCommand>;
}