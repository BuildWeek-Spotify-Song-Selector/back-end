const db = require("../../database/dbConfig.js");
const axios = require("axios");

module.exports = {
  getSongs,
  getLikedSongs,
  likeSong,
  deleteFromLikes,
  putSongToUser,
};

function getSongs() {
  return db("songs");
}

function getLikedSongs(id) {
  return db("user_songs")
    .select()
    .where({ user_id: id })
    .join("songs", "song_id", "songs.id");
}

function findById(id) {
  return db("songs").where("id", id).first();
}

function likeSong(song, user_id, track_id) {
  return db("songs")
    .select()
    .where({ id: song })
    .then((ids) => {
      return putSongToUser(song, user_id, track_id);
    });
}

function putSongToUser(song, user_id, track_id) {
  const inject = {
    song_id: song,
    user_id: user_id,
    track_id: track_id,
  };
  return db("user_songs").insert(inject);
}

function deleteFromLikes(user_id, song) {
  return db("user_songs")
    .select()
    .where({ user_id, song_id: song })
    .limit(1)
    .first()
    .del();
}
