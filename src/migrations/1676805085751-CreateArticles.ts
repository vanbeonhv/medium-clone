import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateArticles1676805085751 implements MigrationInterface {
    name = 'CreateArticles1676805085751';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE "article" ("id" SERIAL NOT NULL, "slug" character varying NOT NULL, "title" character varying NOT NULL, "description" character varying NOT NULL DEFAULT '', "body" character varying NOT NULL DEFAULT '', "tagList" text NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "favouritesCount" integer NOT NULL DEFAULT '0', CONSTRAINT "PK_40808690eb7b915046558c0f81b" PRIMARY KEY ("id"))`,
        );
        await queryRunner.query(
            `ALTER TABLE "users" ALTER COLUMN "image" SET NOT NULL`,
        );
        await queryRunner.query(
            `ALTER TABLE "users" ALTER COLUMN "image" SET DEFAULT ''`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "users" ALTER COLUMN "image" DROP DEFAULT`,
        );
        await queryRunner.query(
            `ALTER TABLE "users" ALTER COLUMN "image" DROP NOT NULL`,
        );
        await queryRunner.query(`DROP TABLE "article"`);
    }
}
