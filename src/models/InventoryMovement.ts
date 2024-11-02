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
import { MovementType } from "../interfaces/IInventoryMovement";

@Entity()
class InventoryMovement {
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

  @ManyToOne(() => Shop, (shop) => shop.categories)
  @JoinColumn({ name: "shopId" })
    shop?: Shop;

  @Column({ type: "int" })
    shopId?: number;

  @ManyToOne(() => Product, (product) => product.inventoryMovements)
  @JoinColumn({ name: "productId" })
    product?: Product;
  
  @Column({ type: "int" })
    productId?: number;

  @Column({ type: "varchar", length: 3 })
    movementType?: MovementType;

  @Column({ type: "int" })
    quantity?: number;
}

export default InventoryMovement;
