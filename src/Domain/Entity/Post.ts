import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import User from "./User";

@Entity()
class Post extends BaseEntity {

    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public title: string;

    @Column()
    public body: string;

    @OneToMany(type => User, user => user.posts)
    public user: User;

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
}

export default Post;