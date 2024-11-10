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
import OrderProduct from "./OrderProduct";
import { Payment } from "../interfaces/IOrder";
import User from "./User";

@Entity()
class Order {
  @PrimaryGeneratedColumn()
    id!: number;

  @Column({ type: "boolean", default: true })
    status!: boolean;

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    createdAt!: Date;

  @UpdateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
    onUpdate: "CURRENT_TIMESTAMP",
  })
    updatedAt!: Date;

  @Column({ type: "decimal", precision: 10, scale: 2, default: 0 })
    total!: number;

  @ManyToOne(() => Shop, (shop) => shop.orders)
  @JoinColumn({ name: "shopId" })
    shop?: Shop;

  @Column({ type: "int" })
    shopId?: number;

  @OneToMany(() => OrderProduct, (orderProduct) => orderProduct.order)
    orderProducts?: OrderProduct[];

  @Column({ type: "varchar", length: 255 })
    payment?: Payment;

  @ManyToOne(() => User, (user) => user.orders)
  @JoinColumn({ name: "userId" })
    user?: User;
  
  @Column({ type: "int" })
    userId?: number;
}

export default Order;
