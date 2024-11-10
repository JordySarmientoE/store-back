import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from "typeorm";

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
            type: "decimal",
            default: 0,
            precision: 10,
            scale: 2,
          },
          {
            name: "shopId",
            type: "int",
            isNullable: true,
          },
          {
            name: "payment",
            type: "varchar",
            length: "255",
            isNullable: false,
          },
          {
            name: "userId",
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
        columnNames: ["userId"],
        referencedColumnNames: ["id"],
        referencedTableName: "user",
        onDelete: "SET NULL",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable("order");
    const shopForeignKey = table!.foreignKeys.find(
      (fk) => fk.columnNames.indexOf("shopId") !== -1
    );
    const orderForeignKey = table!.foreignKeys.find(
      (fk) => fk.columnNames.indexOf("userId") !== -1
    );

    await queryRunner.dropForeignKey("order", shopForeignKey!);
    await queryRunner.dropForeignKey("order", orderForeignKey!);
    await queryRunner.dropTable("order");
  }
}
