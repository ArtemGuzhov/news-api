import { MigrationInterface, QueryRunner } from 'typeorm'

export class refreshToken1674587670224 implements MigrationInterface {
    name = 'refreshToken1674587670224'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "refreshToken" text`)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "refreshToken"`)
    }
}
