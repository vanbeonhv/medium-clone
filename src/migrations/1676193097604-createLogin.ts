import { MigrationInterface, QueryRunner } from 'typeorm';

export class createLogin1676193097604 implements MigrationInterface {
    name = 'createLogin1676193097604';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "username"`);
        await queryRunner.query(
            `ALTER TABLE "users" ADD "username" character varying NOT NULL`,
        );
        await queryRunner.query(
            `ALTER TABLE "users" ALTER COLUMN "image" DROP NOT NULL`,
        );
        await queryRunner.query(
            `ALTER TABLE "users" ALTER COLUMN "image" DROP DEFAULT`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "users" ALTER COLUMN "image" SET DEFAULT ''`,
        );
        await queryRunner.query(
            `ALTER TABLE "users" ALTER COLUMN "image" SET NOT NULL`,
        );
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "username"`);
        await queryRunner.query(
            `ALTER TABLE "users" ADD "username" character varying NOT NULL`,
        );
    }
}
