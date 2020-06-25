exports.up = function (knex) {
  return knex.schema
    .createTable("users", (user) => {
      user.increments();
      user.string("name").notNullable();
      user.string("email").notNullable().unique();
      user.string("password").notNullable();
    })
    .createTable("songs", (tbl) => {
      tbl.increments();
      tbl.string("track_id").notNullable();
      tbl.string("track_name").notNullable();
      tbl.string("artist_name").notNullable();
      tbl.string("genre").notNullable();
      tbl.decimal("acousticness", 10);
      tbl.decimal("danceability", 10);
      tbl.decimal("duration_ms", 10);
      tbl.decimal("energy", 10);
      tbl.decimal("instrumentalness", 10);
      tbl.decimal("key", 10);
      tbl.decimal("liveness", 10);
      tbl.decimal("loudness", 10);
      tbl.boolean("mode", 10);
      tbl.decimal("speechiness", 10);
      tbl.decimal("tempo", 10);
      tbl.decimal("time_signature", 10);
      tbl.decimal("valence", 10);
      tbl.decimal("popularity", 10);
    })
    .createTable("user_songs", (tbl) => {
      tbl
        .integer("user_id")
        .unsigned()
        .references("id")
        .inTable("users")
        .onUpdate("cascade")
        .onDelete("cascade");
      tbl
        .string("song_id")
        .references("id")
        .inTable("songs")
        .onUpdate("cascade")
        .onDelete("cascade");
      tbl.string("track_id").notNullable();
      tbl.string("track_name");
      tbl.string("artist_name");
    });
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists("user_songs")
    .dropTableIfExists("songs")
    .dropTableIfExists("users");
};
