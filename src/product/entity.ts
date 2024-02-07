import {
    BaseEntity,
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne
} from "typeorm";
import { User } from "../user/entity";

@Entity({ name: 'products' })
export class Product extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: String, nullable: false })
    name: string;

    @Column({ type: "integer", nullable: false })
    cost: number;

    @Column({ type: "integer", nullable: false })
    quantityAvailable: number;

    @ManyToOne('User', 'products', {
        eager: true
    })
    sellerId: User;
}