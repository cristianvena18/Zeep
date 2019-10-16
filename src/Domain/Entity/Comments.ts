import { BaseEntity, Entity, Column, ManyToOne, PrimaryColumn } from "typeorm";
import User from "./User";

@Entity()
class Comments extends BaseEntity{
    @PrimaryColumn()
    public IdPost: number;

    @ManyToOne(Comments => User, User => Comments)
    public IdUser: number;

    @Column()
    public content: string;

    public constructor(idPost: number, idUser: number, content: string){
        super();
        this.IdPost = idPost;
        this.IdUser = idUser;
        this.content = content;
    }
}

export default Comments;