import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";
import User from "./User";
import Category from "./Category";
import Product from "./Product";
import Order from "./Order";
import OrderProduct from "./OrderProduct";

@Entity()
class Shop {
  @PrimaryGeneratedColumn() id!: number;

  @Column({ type: "varchar", length: 255 })
    name!: string;

  @Column({ type: "varchar", length: 255, nullable: true })
    address?: string;

  @Column({ type: "varchar", length: 9, nullable: true })
    phone?: string;

  @Column({ type: "varchar", length: 100, nullable: true })
    email?: string;

  @Column({ type: "varchar", length: 11, nullable: true })
    ruc?: string;

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

  @OneToMany(() => User, (user) => user.shop)
    users?: User[];

  @OneToMany(() => Category, (category) => category.shop)
    categories?: Category[];

  @OneToMany(() => Product, (category) => category.shop)
    products?: Product[];

  @OneToMany(() => Order, (order) => order.shop)
    orders?: Order[];

  @OneToMany(() => OrderProduct, (orderProduct) => orderProduct.shop)
    orderProducts?: OrderProduct[];
}

export default Shop;
