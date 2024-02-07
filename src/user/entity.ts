import {
    BaseEntity,
    Entity,
    PrimaryGeneratedColumn,
    Column
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

    @Column({ type: String, nullable: false })
    username: string;

    @Column({ type: String, nullable: false })
    password: string;

    @Column({ type: "integer", nullable: false })
    deposit: number;

    @Column({ type: 'enum', enum: Roles, nullable: false })
    role: Roles;
}