import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateOrderTable1676310700000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "order",
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
            name: "shopId",
            type: "int",
            isNullable: true,
          },
          {
            name: "paymentId",
            type: "int",
            isNullable: true,
          },
        ],
      }),
      true
    );

    await queryRunner.createForeignKey(
      "order",
      new TableForeignKey({
        columnNames: ["shopId"],
        referencedColumnNames: ["id"],
        referencedTableName: "shop",
        onDelete: "SET NULL",
      })
    );

    await queryRunner.createForeignKey(
      "order",
      new TableForeignKey({
        columnNames: ["paymentId"],
        referencedColumnNames: ["id"],
        referencedTableName: "payment",
        onDelete: "SET NULL",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable("order");
    const shopForeignKey = table!.foreignKeys.find((fk) => fk.columnNames.indexOf("shopId") !== -1);
    const paymentForeignKey = table!.foreignKeys.find((fk) => fk.columnNames.indexOf("paymentId") !== -1);

    await queryRunner.dropForeignKey("order", shopForeignKey!);
    await queryRunner.dropForeignKey("order", paymentForeignKey!);
    await queryRunner.dropTable("order");
  }
}
