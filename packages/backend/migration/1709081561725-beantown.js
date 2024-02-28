export class Beantown1709081561725 {
  constructor() {
      this.name = "Beantown1709081561725";
  }
  async up(queryRunner) {
  //  await queryRunner.query(`CREATE TABLE "note" ("id" character varying(32) NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL, "replyId" character varying(32), "renoteId" character varying(32), "text" text, "name" character varying(256), "cw" character varying(512), "appId" character varying(32), "userId" character varying(32) NOT NULL, "viaMobile" boolean NOT NULL DEFAULT false, "localOnly" boolean NOT NULL DEFAULT false, "renoteCount" smallint NOT NULL DEFAULT 0, "repliesCount" smallint NOT NULL DEFAULT 0, "reactions" jsonb NOT NULL DEFAULT '{}', "visibility" "note_visibility_enum" NOT NULL, "uri" character varying(512), "score" integer NOT NULL DEFAULT 0, "fileIds" character varying(32) array NOT NULL DEFAULT '{}'::varchar[], "attachedFileTypes" character varying(256) array NOT NULL DEFAULT '{}'::varchar[], "visibleUserIds" character varying(32) array NOT NULL DEFAULT '{}'::varchar[], "mentions" character varying(32) array NOT NULL DEFAULT '{}'::varchar[], "mentionedRemoteUsers" text NOT NULL DEFAULT '[]', "emojis" character varying(128) array NOT NULL DEFAULT '{}'::varchar[], "tags" character varying(128) array NOT NULL DEFAULT '{}'::varchar[], "hasPoll" boolean NOT NULL DEFAULT false, "geo" jsonb DEFAULT null, "userHost" character varying(128), "replyUserId" character varying(32), "replyUserHost" character varying(128), "renoteUserId" character varying(32), "renoteUserHost" character varying(128), CONSTRAINT "PK_96d0c172a4fba276b1bbed43058" PRIMARY KEY ("id"))`);
      await queryRunner.query(`ALTER TABLE "note" ADD "checkinRating" float NULL`)
      await queryRunner.query(`ALTER TABLE "note" ADD "checkinLabel" character varying(256)`)
      await queryRunner.query(`ALTER TABLE "note" ADD "checkinLogo" character varying(1024)`)
      await queryRunner.query(`ALTER TABLE "note" ADD "checkinSource" character varying(256)`)
      await queryRunner.query(`ALTER TABLE "note" ADD "checkinClass" character varying(64)`)
      await queryRunner.query(`ALTER TABLE "note" ADD "checkinServing" character varying(64)`)
      await queryRunner.query(`ALTER TABLE "note" ADD "checkinLocation" character varying(256)`)
  }

  async down(queryRunner) {
      throw new Error('you are stuck')
  }
}
