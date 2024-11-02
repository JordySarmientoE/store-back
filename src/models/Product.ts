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
import Category from "./Category";
import OrderProduct from "./OrderProduct";
import InventoryMovement from "./InventoryMovement";

@Entity()
class Product {
  @PrimaryGeneratedColumn()
    id!: number;

  @Column({ type: "varchar", length: 255 })
    name!: string;

  @Column({ type: "varchar", length: 255 })
    description!: string;

  @Column({ type: "boolean", default: true })
    status!: boolean;

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    createdAt!: Date;

  @Column({ type: "int", default: 0 })
    quantity!: number;

  @Column({ type: "decimal", precision: 10, scale: 2, default: 0 })
    price!: number;

  @UpdateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
    onUpdate: "CURRENT_TIMESTAMP",
  })
    updatedAt!: Date;

  @ManyToOne(() => Shop, (shop) => shop.products)
  @JoinColumn({ name: "shopId" })
    shop?: Shop;

  @Column({ type: "int"})
    shopId?: number;

  @ManyToOne(() => Category, (category) => category.products)
  @JoinColumn({ name: "categoryId" })
    category?: Category;

  @Column({ type: "int" })
    categoryId?: number;

  @OneToMany(() => OrderProduct, (orderProduct) => orderProduct.product)
    orderProducts?: OrderProduct[];

  @OneToMany(() => InventoryMovement, (movement) => movement.product)
    inventoryMovements?: InventoryMovement[];
}

export default Product;
