import {
    BaseEntity,
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn
} from "typeorm";

export enum Roles {
    Buyer = 'buyer',
    Seller = 'seller',
    Admin = 'admin'
}

@Entity({ name: 'users' })
// @Check('Select Case when MOD("deposit", 5) = 0 then 1 else 0 end case;')
export class User extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: String, nullable: false, unique: true })
    username: string;

    @Column({ type: String, nullable: false })
    password: string;

    @Column({ type: "integer", nullable: false })
    deposit: number;

    @Column({ type: 'enum', enum: Roles, nullable: false })
    role: Roles;

    @Column({ default: false, nullable: false })
    deleted: boolean;

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    public created_at: Date;

    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    public updated_at: Date;
}