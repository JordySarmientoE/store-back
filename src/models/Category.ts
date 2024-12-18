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
import Product from "./Product";

@Entity()
class Category {
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

  @OneToMany(() => Product, (product) => product.category)
    products?: Product[];
}

export default Category;
