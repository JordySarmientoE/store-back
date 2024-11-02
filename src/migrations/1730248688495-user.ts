import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
  TableIndex,
} from "typeorm";

export class CreateUserTable1676310100000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "user",
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
            name: "lastname",
            type: "varchar",
            length: "255",
            isNullable: false,
          },
          {
            name: "email",
            type: "varchar",
            length: "255",
            isNullable: true,
          },
          {
            name: "password",
            type: "varchar",
            length: "255",
            isNullable: true,
          },
          {
            name: "phone",
            type: "varchar",
            length: "9",
            isNullable: true,
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
            name: "role",
            type: "varchar",
            length: "255",
            isNullable: false,
            default: "'BUYER'",
          },
        ],
      }),
      true
    );

    await queryRunner.createForeignKey(
      "user",
      new TableForeignKey({
        columnNames: ["shopId"],
        referencedColumnNames: ["id"],
        referencedTableName: "shop",
        onDelete: "CASCADE",
      })
    );

    await queryRunner.createIndex(
      "user",
      new TableIndex({
        name: "idx_user_email",
        columnNames: ["email"],
      })
    );

    await queryRunner.createIndex(
      "user",
      new TableIndex({
        name: "idx_user_name",
        columnNames: ["name"],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable("user");
    const foreignKey = table!.foreignKeys.find(
      (fk) => fk.columnNames.indexOf("shopId") !== -1
    );
    if (foreignKey) {
      await queryRunner.dropForeignKey("user", foreignKey);
    }

    await queryRunner.dropTable("user");
  }
}
