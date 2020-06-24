exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("user_songs")
    .truncate()
    .then(function () {
      // Inserts seed entries
      return knex("user_songs").insert([
        { user_id: 1, song_id: 1, track_id: "7kr3xZk4yb3YSZ4VFtg2Qt" },
        { user_id: 2, song_id: 2, track_id: "3CwJI2rcnyZL0DVaUZ2D99" },
        { user_id: 2, song_id: 3, track_id: "1gewemPOUilb21s7CfMS55" },
        { user_id: 1, song_id: 4, track_id: "2yE3bwbhqypdsuhmv48Svn" },
        { user_id: 1, song_id: 5, track_id: "5fhZ8Pd7ieNCeebaLZDjN3" },
        { user_id: 2, song_id: 6, track_id: "5vm7y9SmcH0S1NOQanb8rQ" },
      ]);
    });
};
