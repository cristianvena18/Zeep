interface IShowByIdUseCases{
    execute(id: IShowCommand): Promise<ResponseCommand>;
}