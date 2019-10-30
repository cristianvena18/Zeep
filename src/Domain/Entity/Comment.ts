import { BaseEntity, Entity, Column, ManyToOne, PrimaryGeneratedColumn, JoinTable, TreeChildren, TreeParent } from "typeorm";
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
    public user: User;

    @Column()
    public content: string;

    @TreeChildren()
    public comment: Comment[];

    @TreeParent()
    public parent: Comment;

    public addComment(comment: Comment){
        if(!this.comment){
            this.comment = [];
        }

        this.comment.push(comment);
    }
}

export default Comment;