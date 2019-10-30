import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToMany, JoinTable, OneToMany} from "typeorm";
import Role from './Role';
import Post from "./Post";

@Entity()
class User extends BaseEntity{
    
    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public username: string;
    
    @Column()
    public password: string;
    
    @Column()
    public isBlocked: boolean;
    
    @ManyToMany(type => Role)
    @JoinTable()
    public roles: Role[];

    @OneToMany(type => Post, post => post.user)
    public posts: Post[];

    public hasRole(role: string){
      const result = this.roles.find(element => element.Name === role);

      return !!result;
    }

    public addRole(role: Role){
      if(!this.roles){
        this.roles = [];
      }
      this.roles.push(role);
    }
}

export default User;