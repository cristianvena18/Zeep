import { Request } from 'express';
import schemaId from './Schemas/IdFindSchema';
import ShowUserCommand from '../Commands/ShowUserCommand';
import { InfraestructureError } from '../utils/errors/InfraestructureError';
import { injectable } from 'inversify';

@injectable()
class UserShowAdapter {

    public async adap(req: Request) {
        const { id } = req.params;

        const resultId = schemaId.validate({ id });

        if (resultId.error) {
            throw new InfraestructureError(resultId.error.message, 400);
        }

        return new ShowUserCommand(resultId.value);
    }
}

export default UserShowAdapter;