import { MigrationInterface, QueryRunner } from 'typeorm'

export class news1674561665670 implements MigrationInterface {
    name = 'news1674561665670'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "news" DROP COLUMN "title"`)
        await queryRunner.query(`ALTER TABLE "news" ADD "title" text NOT NULL`)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "news" DROP COLUMN "title"`)
        await queryRunner.query(`ALTER TABLE "news" ADD "title" character varying NOT NULL`)
    }
}
