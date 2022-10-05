module.exports = class Data1664879393779 {
  name = 'Data1664879393779'

  async up(db) {
    await db.query(`CREATE TABLE "transaction" ("id" character varying NOT NULL, "block" integer NOT NULL, "timestamp" TIMESTAMP WITH TIME ZONE NOT NULL, "from" text NOT NULL, "to" text NOT NULL, "tx_hash" text NOT NULL, "type" integer NOT NULL, "input" jsonb NOT NULL, "sighash" text NOT NULL, "data" jsonb, "amount" numeric, CONSTRAINT "PK_89eadb93a89810556e1cbcd6ab9" PRIMARY KEY ("id"))`)
    await db.query(`CREATE INDEX "IDX_290df3897fac99713afb5f3d7a" ON "transaction" ("from") `)
    await db.query(`CREATE INDEX "IDX_1713783ebe978fa2ae9654e4bb" ON "transaction" ("to") `)
    await db.query(`CREATE INDEX "IDX_3dab10688c4d77b759f0494a1b" ON "transaction" ("tx_hash") `)
  }

  async down(db) {
    await db.query(`DROP TABLE "transaction"`)
    await db.query(`DROP INDEX "public"."IDX_290df3897fac99713afb5f3d7a"`)
    await db.query(`DROP INDEX "public"."IDX_1713783ebe978fa2ae9654e4bb"`)
    await db.query(`DROP INDEX "public"."IDX_3dab10688c4d77b759f0494a1b"`)
  }
}
