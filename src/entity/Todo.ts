import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    Unique,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne
} from "typeorm";
import { Length } from "class-validator";
import { User } from "./User";
@Entity()
@Unique(["name"])
export class Todo {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @Length(4, 100)
    name: string;

    @Column()
    description: string;

    @Column()
    dateOfCompletion: string;
    @Column()
    status: string;

    @Column()
    @CreateDateColumn()
    createdAt: Date;

    @ManyToOne(() => User, user => user.todos)
    userId: User;

    @Column()
    @UpdateDateColumn()
    updatedAt: Date;


}
