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

    public FindComment(id: number){
        const result = this.comment.find(element => element.id === id);
        return result;
    }

    public addComment(comment: Comment){
        if(!this.comment){
            this.comment = [];
        }

        this.comment.push(comment);
    }
}

export default Post;