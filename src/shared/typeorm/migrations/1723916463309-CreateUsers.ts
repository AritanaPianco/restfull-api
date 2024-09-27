import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateUsers1723916463309 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
             new Table({
                  name: 'users',
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
                        isUnique: true
                     },
                     {
                        name: 'password',
                        type: 'varchar'
                     },
                     {
                        name: 'avatar',
                        type: 'varchar',
                        isNullable: true
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
         await queryRunner.dropTable('users')
    }

}
