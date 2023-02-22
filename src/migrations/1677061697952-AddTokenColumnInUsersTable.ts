import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddTokenColumnInUsersTable1677061697952
    implements MigrationInterface
{
    name = 'AddTokenColumnInUsersTable1677061697952';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "users" ADD "token" character varying NOT NULL DEFAULT ''`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "token"`);
    }
}
