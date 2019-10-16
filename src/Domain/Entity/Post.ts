import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne } from "typeorm";
import Comments from './Comments';
import User from "./User";

@Entity()
class Post extends BaseEntity{
    
    @PrimaryGeneratedColumn()
    private Id!: number;

    @OneToOne(Post => User, User => Post)
    public idUser: number;

    @Column()
    public Title: string;

    @OneToMany(Post => Comments, Comments => Post)
    public Comments?: Comments[];

    @Column()
    public content: string;

    public constructor(title: string, content: string, idUser: number){
        super();
        this.Title = title;
        this.content = content;
        this.idUser = idUser;
    }
}

export default Post;