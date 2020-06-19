const db = require("../../database/dbConfig.js");
const axios = require("axios");

module.exports = {
  getSongs,
  getLikedSongs,
  likeSong,
  deleteFromLikes,
  putSongToAccount,
};

function getSongs(songs) {
  return db("songs");
}

function getLikedSongs(id) {
  return db("user_songs")
    .select()
    .where({ user_id: id })
    .join("songs", "song_id", "songs.id");
}

function likeSong(song, user_id, track_id) {
  return db("songs")
    .insert(song)
    .returning("id")
    .then((ids) => {
      return putSongToAccount(ids[0], user_id, track_id);
    });
}

function findById(id) {
  return db("songs").where("id", id).first();
}

function putSongToAccount(song_id, user_id, track_id) {
  const inject = {
    user_id: user_id,
    song_id: song_id,
    track_id: track_id,
  };
  return db("user_songs").insert(inject).returning("user_id");
}

function deleteFromLikes(user_id, track_id) {
  return db("user_songs")
    .select()
    .where({ user_id, track_id: track_id })
    .limit(1)
    .first()
    .del();
}
