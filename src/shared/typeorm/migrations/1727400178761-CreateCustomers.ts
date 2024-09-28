import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateCustomers17274001787761 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
             new Table({
                  name: 'customers',
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
                        name:'email',
                        type: 'varchar',
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
         await queryRunner.dropTable('customers')
    }

}

