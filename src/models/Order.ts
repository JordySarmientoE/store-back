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
import Payment from "./Payment";

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

  @Column({ type: "int", default: 0 })
    total!: number;

  @ManyToOne(() => Shop, (shop) => shop.orders)
  @JoinColumn({ name: "shopId" })
    shop?: Shop;

  @Column({ type: "int" })
    shopId?: number;

  @OneToMany(() => OrderProduct, (orderProduct) => orderProduct.order)
    orderProducts?: OrderProduct[];

  @ManyToOne(() => Payment, (payment) => payment.orders)
    @JoinColumn({ name: "paymentId" })
    payment?: Payment;
  
  @Column({ type: "int" })
    paymentId?: number;
}

export default Order;
