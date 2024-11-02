import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";
import Order from "./Order";

@Entity()
class Payment {
  @PrimaryGeneratedColumn()
    id!: number;

  @Column({ type: "varchar", length: 255 })
    type!: string;

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

  @OneToMany(() => Order, (order) => order.payment)
    orders?: Order[];
}

export default Payment;

