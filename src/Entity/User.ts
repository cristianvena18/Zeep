import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToMany} from "typeorm";
import Role from './Role';

@Entity()
class User extends BaseEntity{
    
    @PrimaryGeneratedColumn()
    public Id!: number;

    @Column()
    public Name: string;

    @Column()
    public Nickname: string;

    @Column()
    public Password: string;

    @Column()
    public IsBlocked: boolean;

    @ManyToMany(type => Role, Role => User)
    public Role: Role[];

    public constructor(name: string, nickname: string, password: string, role: Role[]){
        super();
        this.Name = name;
        this.Nickname = nickname;
        this.Password = password;
        this.IsBlocked = false;
        this.Role = role
    }

    public hasRole(role: Role){
        const result = this.Role.find(element => element.Name === role.Name);
  
        return !!result;
      }
  
      public addRole(role: Role){
        this.Role.push(role);
      }
}

export default User;