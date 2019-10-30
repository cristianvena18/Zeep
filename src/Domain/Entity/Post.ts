import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, OneToMany, JoinTable } from "typeorm";
import Comment from "./Comment";

@Entity()
class Post extends BaseEntity {

    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public title: string;

    @Column()
    public body: string;

    @Column()
    public user: number;

    @OneToMany(type => Comment, comment => comment.post)
    @JoinTable()
    public comment: Comment[];

    public GetObjectWithOutComments(): Object {
        const post = {
            title: this.title,
            content: this.body
        };

        return post;
    }

    public GetObjectWithComments(): Object {
        const post = {
            title: this.title,
            content: this.body
        }
        return post;
    }

    public addComment(comment: Comment){
        if(!this.comment){
            this.comment = [];
        }

        this.comment.push(comment);
    }
}

export default Post;