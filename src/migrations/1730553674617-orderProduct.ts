import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateOrderProductTable1676310800000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "order_product",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "status",
            type: "boolean",
            default: true,
          },
          {
            name: "createdAt",
            type: "timestamp",
            default: "CURRENT_TIMESTAMP",
          },
          {
            name: "updatedAt",
            type: "timestamp",
            default: "CURRENT_TIMESTAMP",
            onUpdate: "CURRENT_TIMESTAMP",
          },
          {
            name: "total",
            type: "int",
            default: 0,
          },
          {
            name: "price",
            type: "decimal",
            default: 0,
            precision: 10,
            scale: 2,
          },
          {
            name: "quantity",
            type: "int",
            default: 0,
          },
          {
            name: "shopId",
            type: "int",
            isNullable: true,
          },
          {
            name: "productId",
            type: "int",
            isNullable: true,
          },
          {
            name: "orderId",
            type: "int",
            isNullable: true,
          },
        ],
      }),
      true
    );

    await queryRunner.createForeignKey(
      "order_product",
      new TableForeignKey({
        columnNames: ["shopId"],
        referencedColumnNames: ["id"],
        referencedTableName: "shop",
        onDelete: "SET NULL",
      })
    );

    await queryRunner.createForeignKey(
      "order_product",
      new TableForeignKey({
        columnNames: ["productId"],
        referencedColumnNames: ["id"],
        referencedTableName: "product",
        onDelete: "SET NULL",
      })
    );

    await queryRunner.createForeignKey(
      "order_product",
      new TableForeignKey({
        columnNames: ["orderId"],
        referencedColumnNames: ["id"],
        referencedTableName: "order",
        onDelete: "SET NULL",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable("order_product");
    const shopForeignKey = table!.foreignKeys.find((fk) => fk.columnNames.indexOf("shopId") !== -1);
    const productForeignKey = table!.foreignKeys.find((fk) => fk.columnNames.indexOf("productId") !== -1);
    const orderForeignKey = table!.foreignKeys.find((fk) => fk.columnNames.indexOf("orderId") !== -1);

    await queryRunner.dropForeignKey("order_product", shopForeignKey!);
    await queryRunner.dropForeignKey("order_product", productForeignKey!);
    await queryRunner.dropForeignKey("order_product", orderForeignKey!);
    await queryRunner.dropTable("order_product");
  }
}
