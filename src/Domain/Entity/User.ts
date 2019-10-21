import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToMany, JoinTable} from "typeorm";
import Role from './Role';

@Entity()
class User extends BaseEntity{
    
    @PrimaryGeneratedColumn()
    public Id!: number;

    @Column()
    public Name: string;

    @Column()
    public Username: string;

    @Column()
    public Password: string;

    @Column()
    public IsBlocked: boolean;

    @ManyToMany(type => Role)
    @JoinTable()
    public Role?: Role[];

    public constructor(username: string, password: string, ){
        super();
        this.Name = '';
        this.Username = username;
        this.Password = password;
        this.IsBlocked = false;
    }

    public hasRole(role: string) {
      if(this.Role){
        const result = this.Role.find(element => element.Name === role);
        return !!result;
      }
      else{
        return false;
      }
    }

    public addRole(role: Role) {
      if(this.Role){
        this.Role.push(role);
      }
      else{
        this.Role = [role];
      }
    }
}

export default User;