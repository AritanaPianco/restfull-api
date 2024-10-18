import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateOrders1727549911431 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
          await queryRunner.createTable(
                new Table({
                        name: 'orders',
                        columns:[
                            {
                                name: 'id',
                                type: 'int',
                                isPrimary: true,
                                isGenerated: true,
                                generationStrategy: 'increment'
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
                })
          )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
         await queryRunner.dropTable('orders')
    }

}
