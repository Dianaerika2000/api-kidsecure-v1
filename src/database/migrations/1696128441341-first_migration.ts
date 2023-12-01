import { MigrationInterface, QueryRunner } from "typeorm";

export class FirstMigration1696128441341 implements MigrationInterface {
    name = 'FirstMigration1696128441341'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "photo_url" character varying NOT NULL, "type" character varying NOT NULL DEFAULT 'individual', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "individual_user" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "lastname" character varying NOT NULL, "birth_date" TIMESTAMP NOT NULL, "gender" character varying NOT NULL, "nationality" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "user_id" integer, CONSTRAINT "UQ_e36482010b191dd80f334e0ccb1" UNIQUE ("email"), CONSTRAINT "REL_b2b189e6e9f25c0239402c9651" UNIQUE ("user_id"), CONSTRAINT "PK_a9fffa3cb6d181c232454d1e5b9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "individual_user" ADD CONSTRAINT "FK_b2b189e6e9f25c0239402c96515" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "individual_user" DROP CONSTRAINT "FK_b2b189e6e9f25c0239402c96515"`);
        await queryRunner.query(`DROP TABLE "individual_user"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
