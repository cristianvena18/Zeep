import { TokenGenerator, TokenBase } from 'ts-token-generator';
import * as crypto from 'crypto';
import {Hash} from 'crypto';
import IHashService from './IHashService';

class HashService implements IHashService{

    public GeneratedToken(){
        const tokgen2 = new TokenGenerator({ bitSize: 512, baseEncoding: TokenBase.BASE62 });

        const token = tokgen2.generate();

        return token;
    }

    public Encrypt(line: string){
        const hash: Hash = crypto.createHash('sha256');
        const hashPassword: string = hash.update(line).digest('hex');
        return hashPassword;
    }

    public Equals(passwordSave: string, password: string){
        const valid: boolean = crypto.timingSafeEqual(Buffer.from(passwordSave, 'binary'), Buffer.from(password, 'binary'));

        return valid;
    }
}

export default HashService;