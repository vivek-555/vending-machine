import {
    BaseEntity,
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    CreateDateColumn,
    UpdateDateColumn
} from "typeorm";
import { User } from "../user/entities/user";

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
    seller: User;

    @Column({ default: false, nullable: false })
    deleted: boolean;

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    public created_at: Date;

    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    public updated_at: Date;
}