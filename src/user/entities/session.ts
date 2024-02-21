import {
    BaseEntity,
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne
} from "typeorm";
import { Product } from "../../product/entity";
import { User } from "./user";

@Entity({ name: 'sessions' })
export class Session extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne('User', 'sessions', {
        eager: true,
        nullable: false
    })
    user: User;

    @ManyToOne('Product', 'sessions', {
        eager: true,
        nullable: true
    })
    checkoutProduct: Product;

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    public created_at: Date;

    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    public updated_at: Date;
}