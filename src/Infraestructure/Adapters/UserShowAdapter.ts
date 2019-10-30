import { Request } from 'express';
import schemaId from './Schemas/IdFindSchema';
import ShowUserCommand from '../Commands/ShowUserCommand';
import { injectable } from 'inversify';
import { InvalidData } from '../utils/errors/InvalidData';

@injectable()
class UserShowAdapter {

    public async adap(req: Request) {
        const { id } = req.params;

        const resultId = schemaId.validate({ id });

        if (resultId.error) {
            throw new InvalidData(resultId.error.message);
        }

        return new ShowUserCommand(resultId.value);
    }
}

export default UserShowAdapter;