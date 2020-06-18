exports.up = function (knex) {
  return knex.schema
    .createTable("users", (account) => {
      account.increments();
      account.string("name").notNullable();
      account.string("email").notNullable().unique();
      account.string("password").notNullable();
    })
    .createTable("songs", (tbl) => {
      tbl.increments();
      tbl.string("track_id").notNullable();
      tbl.string("track_name").notNullable();
      tbl.string("artist_name").notNullable();
      tbl.decimal("acousticness", 10);
      tbl.decimal("danceability", 10);
      tbl.decimal("duration_ms", 10);
      tbl.decimal("energy", 10);
      tbl.decimal("instrumentalness", 10);
      tbl.decimal("key", 10);
      tbl.decimal("liveness", 10);
      tbl.decimal("loudness", 10);
      tbl.boolean("mode");
      tbl.decimal("speechiness", 10);
      tbl.decimal("tempo", 10);
      tbl.decimal("time_signature", 10);
      tbl.decimal("valence", 10);
      tbl.decimal("popularity", 10);
    })
    .createTable("user_songs", (tbl) => {
      tbl
        .integer("account_id")
        .unsigned()
        .references("id")
        .inTable("accounts")
        .onUpdate("cascade")
        .onDelete("cascade");
      tbl
        .integer("song_id")
        .references("id")
        .inTable("music")
        .onUpdate("cascade")
        .onDelete("cascade");
      tbl.string("real_track_id").notNullable();
    });
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists("account_to_music")
    .dropTableIfExists("music")
    .dropTableIfExists("accounts");
};
