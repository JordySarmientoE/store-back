import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
  TableIndex,
} from "typeorm";

export class CreateProductTable1676310400000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "product",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "name",
            type: "varchar",
            length: "255",
            isNullable: false,
          },
          {
            name: "description",
            type: "varchar",
            length: "255",
            isNullable: false,
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
            name: "quantity",
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
            name: "categoryId",
            type: "int",
            isNullable: true,
          },
        ],
      }),
      true
    );

    await queryRunner.createForeignKey(
      "product",
      new TableForeignKey({
        columnNames: ["shopId"],
        referencedColumnNames: ["id"],
        referencedTableName: "shop",
        onDelete: "CASCADE",
      })
    );

    await queryRunner.createForeignKey(
      "product",
      new TableForeignKey({
        columnNames: ["categoryId"],
        referencedColumnNames: ["id"],
        referencedTableName: "category",
        onDelete: "SET NULL",
      })
    );

    await queryRunner.createIndex(
      "product",
      new TableIndex({
        name: "idx_product_name",
        columnNames: ["name"],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable("product");

    if (table) {
      const foreignKeyShop = table.foreignKeys.find(
        (fk) => fk.columnNames.indexOf("shopId") !== -1
      );
      const foreignKeyCategory = table.foreignKeys.find(
        (fk) => fk.columnNames.indexOf("categoryId") !== -1
      );

      if (foreignKeyShop) {
        await queryRunner.dropForeignKey("product", foreignKeyShop);
      }
      if (foreignKeyCategory) {
        await queryRunner.dropForeignKey("product", foreignKeyCategory);
      }
    }

    await queryRunner.dropTable("product");
  }
}
