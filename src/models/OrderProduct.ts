import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import Shop from "./Shop";
import Product from "./Product";
import Order from "./Order";

@Entity()
class OrderProduct {
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

  @Column({ type: "decimal", precision: 10, scale: 2, default: 0 })
    price!: number;

  @Column({ type: "int", default: 0 })
    quantity!: number;

  @ManyToOne(() => Shop, (shop) => shop.orderProducts)
  @JoinColumn({ name: "shopId" })
    shop?: Shop;

  @Column({ type: "int" })
    shopId?: number;

  @JoinColumn({ name: "productId" })
    product?: Product;

  @Column({ type: "int" })
    productId?: number;

  @JoinColumn({ name: "orderId" })
    order?: Order;

  @Column({ type: "int" })
    orderId?: number;
}

export default OrderProduct;

