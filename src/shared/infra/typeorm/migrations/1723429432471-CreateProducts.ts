// timestamp with time zone

import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateProducts1723429432471 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
       await queryRunner.createTable(
             new Table(
                {
                    name: "products",
                    columns: [
                          {
                              name: 'id',
                              type: 'int',
                              isPrimary: true,
                              isGenerated: true,
                              generationStrategy: 'increment'
                          },
                          {
                            name: 'name',
                            type: 'varchar'
                          },
                          {
                            name: 'price',
                            type: 'decimal',
                            precision: 10,
                            scale: 2
                          },
                          {
                            name: 'quantity',
                            type: 'int'
                          },
                          {
                            name: 'created_at',
                            type: 'timestamp',
                            default: 'CURRENT_TIMESTAMP'
                          },
                          {
                            name: 'updated_at',
                            type: 'timestamp',
                            default: 'CURRENT_TIMESTAMP',
                            onUpdate: 'CURRENT_TIMESTAMP'
                          }
                    ]
                }
             )
       )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable("products")
    }

}
