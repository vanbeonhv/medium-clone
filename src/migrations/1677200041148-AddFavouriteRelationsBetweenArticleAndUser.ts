import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddFavouriteRelationsBetweenArticleAndUser1677200041148
    implements MigrationInterface
{
    name = 'AddFavouriteRelationsBetweenArticleAndUser1677200041148';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE "users_favourites_article" ("usersId" integer NOT NULL, "articleId" integer NOT NULL, CONSTRAINT "PK_bcbd4632e74b8275ab950c0d9f2" PRIMARY KEY ("usersId", "articleId"))`,
        );

        await queryRunner.query(
            `CREATE INDEX "IDX_af92aa483bb6a72f665822736c" ON "users_favourites_article" ("usersId") `,
        );

        await queryRunner.query(
            `CREATE INDEX "IDX_3dc6b8715d2ab56c889bdbbba8" ON "users_favourites_article" ("articleId") `,
        );

        await queryRunner.query(
            `ALTER TABLE "users_favourites_article" ADD CONSTRAINT "FK_af92aa483bb6a72f665822736c6" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
        );

        await queryRunner.query(
            `ALTER TABLE "users_favourites_article" ADD CONSTRAINT "FK_3dc6b8715d2ab56c889bdbbba88" FOREIGN KEY ("articleId") REFERENCES "article"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "users_favourites_article" DROP CONSTRAINT "FK_3dc6b8715d2ab56c889bdbbba88"`,
        );

        await queryRunner.query(
            `ALTER TABLE "users_favourites_article" DROP CONSTRAINT "FK_af92aa483bb6a72f665822736c6"`,
        );

        await queryRunner.query(
            `DROP INDEX "public"."IDX_3dc6b8715d2ab56c889bdbbba8"`,
        );

        await queryRunner.query(
            `DROP INDEX "public"."IDX_af92aa483bb6a72f665822736c"`,
        );

        await queryRunner.query(`DROP TABLE "users_favourites_article"`);
    }
}
