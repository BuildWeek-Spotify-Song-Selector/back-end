exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("user_songs")
    .truncate()
    .then(function () {
      // Inserts seed entries
      return knex("user_songs").insert([
        { user_id: 1, song_id: 1, track_id: "ZtwWpaVxVwGTXUPFZAAF3RuR9W5" },
        { user_id: 2, song_id: 2, track_id: "K4PX40m8AzHv0bjHWD0b49qmR42" },
        { user_id: 2, song_id: 3, track_id: "zqkuG6FcXIpDOdWAQGe2WxUC4d3" },
        { user_id: 1, song_id: 4, track_id: "AwGwhPC0dW2zdIxqjUthAOe6upL" },
        { user_id: 1, song_id: 5, track_id: "7293hBNN1iG3CeOCN4Nroqev5jh" },
        { user_id: 2, song_id: 6, track_id: "pkecQdk0Mg82ktslT1akCcFZ89l" },
      ]);
    });
};
