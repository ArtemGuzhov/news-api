import { MigrationInterface, QueryRunner } from 'typeorm'

export class users1674563202325 implements MigrationInterface {
    name = 'users1674563202325'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE "users" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "login" text NOT NULL, "email" text NOT NULL, "password" text NOT NULL, CONSTRAINT "UQ_2d443082eccd5198f95f2a36e2c" UNIQUE ("login"), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
        )
        await queryRunner.query(`ALTER TABLE "news" ADD "user_id" integer`)
        await queryRunner.query(
            `ALTER TABLE "news" ADD CONSTRAINT "FK_7a806f5e14fced276888eab1a3e" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "news" DROP CONSTRAINT "FK_7a806f5e14fced276888eab1a3e"`)
        await queryRunner.query(`ALTER TABLE "news" DROP COLUMN "user_id"`)
        await queryRunner.query(`DROP TABLE "users"`)
    }
}
