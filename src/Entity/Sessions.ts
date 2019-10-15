import { BaseEntity, Entity, Column, PrimaryColumn } from "typeorm";
import User from "./User";

@Entity()
class Session extends BaseEntity{

    @PrimaryColumn()
    public IdUser: number;

    @Column()
    public Token: string;

    public constructor(idUser: number, token: string){
        super();
        this.IdUser = idUser;
        this.Token = token;
    }
}

export default Session;