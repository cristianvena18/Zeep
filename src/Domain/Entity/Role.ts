import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToMany, JoinTable } from "typeorm";
import User from "./User";

@Entity()
class Role extends BaseEntity{

    @PrimaryGeneratedColumn()
    public Id!: number;

    @Column({unique: true})
    public Name: string;

    @ManyToMany(type => User)
    @JoinTable()
    public categories?: User[];

    public constructor(name: string){
        super();
        this.Name = name;
    }
}

export default Role;