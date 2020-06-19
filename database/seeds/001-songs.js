exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("songs")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("songs").insert([
        {
          track_id: "7kr3xZk4yb3YSZ4VFtg2Qt",
          artist_name: "Billy Raffoul",
          track_name: "Acoustic",
          genre: "acoustic",
        },
        {
          track_id: "3CwJI2rcnyZL0DVaUZ2D99",
          artist_name: "DJ Flex",
          track_name: "Put Your Back In It (Afrobeat)",
          genre: "afrobeat",
        },
        {
          track_id: "1gewemPOUilb21s7CfMS55",
          artist_name: "Rehab",
          track_name: "Bartender Song (Sittin At A Bar) - Alt/Rock Mix",
          genre: "alt-rock",
        },
        {
          track_id: "2yE3bwbhqypdsuhmv48Svn",
          artist_name: "Stiff Little Fingers",
          track_name: "Alternative Ulster",
          genre: "alternative",
        },
        {
          track_id: "5fhZ8Pd7ieNCeebaLZDjN3",
          artist_name: "Sample Rain Library",
          track_name: "Ambiente Lluvia",
          genre: "ambient",
        },
        {
          track_id: "3nWeDCCPMUM9KkYCwc3gy1",
          artist_name: "MC Virgins",
          track_name: "Anime Thighs",
          genre: "anime",
        },
        {
          track_id: "5vm7y9SmcH0S1NOQanb8rQ",
          artist_name: "Denzel Curry",
          track_name: "BLACK METAL TERRORIST",
          genre: "black-metal",
        },
        {
          track_id: "3iUVv4ZwMtKpU7QeAQ9nvd",
          artist_name: "Quadry",
          track_name: "Bluegrass",
          genre: "bluegrass",
        },
        {
          track_id: "1R0URa3Wh9LT403zzYyXDl",
          artist_name: "Shotgun Willy",
          track_name: "Blues Clues",
          genre: "blues",
        },
        {
          track_id: "4ESyocZUQ3fOlCbNP6n17i",
          artist_name: "Lil Tecca",
          track_name: "Bossanova",
          genre: "bossanova",
        },
      ]);
    });
};
