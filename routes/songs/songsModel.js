const db = require("../../database/dbConfig.js");
const axios = require("axios");

module.exports = {
  getSongs,
  getLikedSongs,
  likeSong,
  deleteFromLikes,
  putSongToUser,
};

function getSongs(name, artist, track_id, genre) {
  const inject = {
    track_id: track_id,
    track_name: name,
    artist_name: artist,
    genre: genre,
  };
  return db("songs")
    .truncate()
    .then((songs) => {
      return db("songs")
        .insert(inject)
        .then((songs) => {
          return db("songs");
        });
    });
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
    user_id: user_id,
    song_id: song,
    track_id: track_id,
  };
  return db("user_songs").insert(inject);
}

function deleteFromLikes(user_id, track_id) {
  return db("user_songs")
    .select()
    .where({ user_id, track_id: track_id })
    .limit(1)
    .first()
    .del();
}
