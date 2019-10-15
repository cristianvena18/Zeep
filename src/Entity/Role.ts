import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

@Entity()
class Role extends BaseEntity{

    @PrimaryGeneratedColumn()
    public Id!: number;

    @Column()
    public Name: string;

    public constructor(name: string){
        super();
        this.Name = name;
    }
}

export default Role;