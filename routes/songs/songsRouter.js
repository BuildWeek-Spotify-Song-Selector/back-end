const router = require("express").Router();
const axios = require("axios");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const util = require("util");
const { restricted } = require("../../auth/restricted-middleware");

const db = require("./songsModel.js");

module.exports = router;

// get songs
// router.get("/", restricted, (req, res) => {
// axios
//   .get(
//     `http://ws.audioscrobbler.com/2.0/?method=chart.gettoptracks&api_key=f86920dcdd8e8d0768e5e9044125dafa&format=json`
//   )
//   .then((resp) => {
// const songList = resp.data.tracks.track;
// for (var i = 0; i < songList.length; i++) {
//   for (var key in songList[i]) {
//     if (songList[i].hasOwnProperty(key)) {
//       if (key !== "name" && key !== "artist") {
//         delete songList[i][key];
//         delete songList[i].artist.mbid;
//         delete songList[i].artist.url;
//       }
//     }
//   }
// }
// function getRandomID(length, chars) {
//   var result = "";
//   for (var i = length; i > 0; --i)
//     result += chars[Math.floor(Math.random() * chars.length)];
//   return result;
// }
// function randomGenre() {
//   var genreArray = ["rock", "pop", "rap", "classical"];
//   var randomNumber = Math.floor(Math.random() * genreArray.length);
//   var randomGenre = genreArray[randomNumber];
//   return randomGenre;
// }
// var formattedSongList = songList.map(
//   ({ name: track_name, artist: artist_name }) => ({
//     track_name,
//     artist_name: artist_name.name,
//     track_id: getRandomID(
//       27,
//       "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
//     ),
//     genre: randomGenre(),
//     acousticness: Math.random().toFixed(1),
//     danceability: Math.random().toFixed(1),
//     duration_ms: Math.random().toFixed(1),
//     energy: Math.random().toFixed(1),
//     instrumentalness: Math.random().toFixed(1),
//     key: Math.random().toFixed(1),
//     liveness: Math.random().toFixed(1),
//     loudness: Math.random().toFixed(1),
//     mode: true,
//     speechiness: Math.random().toFixed(1),
//     tempo: Math.random().toFixed(1),
//     time_signature: Math.random().toFixed(1),
//     valence: Math.random().toFixed(1),
//     popularity: Math.random().toFixed(1),
//   })
// );
// for (var i = 0; i < formattedSongList.length; i++) {
//   db.getSongs()
//     .then((songs) => {
//       res.json(songs);
//     })
//     .catch((error) => {
//       console.log(error);
//       res.status(500).json({
//         error: "Error retrieving songs, could not connect to database.",
//       });
//     });
//   // }
// })
// .catch((err) =>
//   res.status(500).json({
//     error: "Error: Unable to retrieve songs or user not signed in.",
//   })
// );
// });

// dummy data get songs
router.get("/", restricted, (req, res) => {
  db.getSongs()
    .then((songs) => {
      res.json(songs);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        error: "Error retrieving songs, could not connect to database.",
      });
    });
});

// like song
router.post("/like", restricted, (req, res) => {
  const user_id = req.user.id;
  const song = req.body.id;
  const track_id = req.body.track_id;
  db.likeSong(song, user_id, track_id)
    .then(() => {
      res.status(201).json({ message: "Successfully liked song!" });
    })
    .catch((err) => console.log(err));
});

// get liked songs
router.get("/:id/likes", restricted, (req, res) => {
  const id = req.params.id;
  db.getLikedSongs(id)
    .then((songs) => {
      res.status(200).json(songs);
    })
    .catch((err) => res.status(500).json(err));
});

// delete liked song
router.delete("/:id/likes/:song_id", restricted, (req, res) => {
  const id = req.params.id;
  const song = req.params.song_id;
  console.log(req.user.id);
  if (id == req.user.id) {
    db.deleteFromLikes(id, song)
      .then(() =>
        res
          .status(200)
          .json({ message: "Song successfully removed from Liked Songs" })
      )
      .catch((err) => console.log(err));
  } else {
    return res.status(403).json({
      message: "Please login to remove songs",
    });
  }
});

//get similar songs
router.post("/similar", (req, res) => {
  const track_id = req.body.track_id;
  const number_like = req.body.number_like;
  axios
    .get(`DS endpoint`)
    .then((resp) => {
      const song = resp.data;
      return res.status(200).json(song);
    })
    .catch((err) => res.status(500).json({ error: err }));
});
