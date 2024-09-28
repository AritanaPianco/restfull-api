import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateOrdersProducts1727551918474 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table(
               {
                   name: "orders_products",
                   columns: [
                         {
                             name: 'id',
                             type: 'int',
                             isPrimary: true,
                             isGenerated: true,
                             generationStrategy: 'increment'
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
          await queryRunner.dropTable('orders_products')
    }

}
