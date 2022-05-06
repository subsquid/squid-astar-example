module.exports = class Data1651851335954 {
  name = 'Data1651851335954'

  async up(db) {
    await db.query(`CREATE TABLE "investement" ("id" character varying NOT NULL, "timestamp" numeric NOT NULL, "value" numeric NOT NULL, CONSTRAINT "PK_324fb55cbef871a4c0cc8648c54" PRIMARY KEY ("id"))`)
  }

  async down(db) {
    await db.query(`DROP TABLE "investement"`)
  }
}
