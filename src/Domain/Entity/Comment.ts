import { BaseEntity, Entity, Column, ManyToOne, OneToMany, PrimaryGeneratedColumn, JoinColumn, JoinTable } from "typeorm";
import User from "./User";
import Post from "./Post";

@Entity()
class Comment extends BaseEntity{

    @PrimaryGeneratedColumn()
    public id: number;

    @ManyToOne(type => Post, post => post.comment)
    @JoinTable()
    public post: Post;

    @ManyToOne(type => User)
    public IdUser: number;

    @Column()
    public content: string;

    public constructor(idPost: Post, idUser: number, content: string){
        super();
        this.post = idPost;
        this.IdUser = idUser;
        this.content = content;
    }
}

export default Comment;