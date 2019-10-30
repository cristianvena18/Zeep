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
}

export default Comment;