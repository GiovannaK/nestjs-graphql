import {MigrationInterface, QueryRunner} from "typeorm";

export class addPasswordColumnToUser1631756181636 implements MigrationInterface {
    name = 'addPasswordColumnToUser1631756181636'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."user" ADD "password" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."user" DROP COLUMN "password"`);
    }

}
