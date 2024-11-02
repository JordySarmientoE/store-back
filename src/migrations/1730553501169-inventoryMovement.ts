import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateInventoryMovementTable1676310500000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "inventory_movement",
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
            name: "movementType",
            type: "varchar",
            length: "3",
            isNullable: true,
          },
          {
            name: "quantity",
            type: "int",
            isNullable: true,
          },
        ],
      }),
      true
    );

    await queryRunner.createForeignKey(
      "inventory_movement",
      new TableForeignKey({
        columnNames: ["shopId"],
        referencedColumnNames: ["id"],
        referencedTableName: "shop",
        onDelete: "SET NULL",
      })
    );

    await queryRunner.createForeignKey(
      "inventory_movement",
      new TableForeignKey({
        columnNames: ["productId"],
        referencedColumnNames: ["id"],
        referencedTableName: "product",
        onDelete: "SET NULL",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable("inventory_movement");

    if (table) {
      const foreignKeyShop = table.foreignKeys.find(fk => fk.columnNames.indexOf("shopId") !== -1);
      const foreignKeyProduct = table.foreignKeys.find(fk => fk.columnNames.indexOf("productId") !== -1);

      if (foreignKeyShop) {
        await queryRunner.dropForeignKey("inventory_movement", foreignKeyShop);
      }
      if (foreignKeyProduct) {
        await queryRunner.dropForeignKey("inventory_movement", foreignKeyProduct);
      }
    }

    await queryRunner.dropTable("inventory_movement");
  }
}
