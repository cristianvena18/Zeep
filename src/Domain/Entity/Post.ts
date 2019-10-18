import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne } from "typeorm";
import Comments from './Comments';
import User from "./User";

@Entity()
class Post extends BaseEntity {

    @PrimaryGeneratedColumn()
    public Id!: number;

    @OneToOne(Post => User, User => Post)
    public idUser: number;

    @Column()
    public Title: string;

    @OneToMany(Post => Comments, Comments => Post)
    public Comments?: Comments[];

    @Column()
    public Content: string;

    public constructor(title: string, content: string, idUser: number) {
        super();
        this.Title = title;
        this.Content = content;
        this.idUser = idUser;
    }

    public GetObjectWithOutComments(): Object{
        const post = {
            title: this.Title,
            content: this.Content
        };

        return post;
    }

    public GetObjectWithComments(): Object{
        const post = {
            title: this.Title,
            content: this.Content,
            comments: this.Comments
        }
        return post;
    }
}

export default Post;