import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from "typeorm";
import Shop from "./Shop";
import { Role } from "../interfaces/IUser";
import Order from "./Order";

@Entity()
class User {
  @PrimaryGeneratedColumn()
    id!: number;

  @Column({ type: "varchar", length: 255 })
    name!: string;

  @Column({ type: "varchar", length: 255 })
    lastname!: string;

  @Column({ type: "varchar", length: 255 })
    email?: string;

  @Column({ type: "varchar", length: 255 })
    password?: string;

  @Column({ type: "boolean", default: true })
    status!: boolean;

  @Column({ type: "varchar", length: 9, nullable: true })
    phone!: string;

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    createdAt!: Date;

  @Column({ type: "varchar", length: 255, nullable: false, default: "BUYER" })
    role?: Role;

  @UpdateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
    onUpdate: "CURRENT_TIMESTAMP",
  })
    updatedAt!: Date;

  @ManyToOne(() => Shop, (shop) => shop.users)
  @JoinColumn({ name: "shopId" })
    shop?: Shop;

  @Column({ type: "int" })
    shopId?: number;

  @OneToMany(() => Order, (order) => order.user)
    orders?: Order[];
}

export default User;