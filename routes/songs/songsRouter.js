const router = require("express").Router();
const axios = require("axios");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const util = require("util");
const { restricted } = require("../../auth/restricted-middleware");

const db = require("./songsModel.js");

module.exports = router;

// get songs
router.get("/", restricted, (req, res) => {
  axios
    .get(
      `http://ws.audioscrobbler.com/2.0/?method=chart.gettoptracks&api_key=f86920dcdd8e8d0768e5e9044125dafa&format=json`
    )
    .then((resp) => {
      const songList = resp.data.tracks.track;
      for (var i = 0; i < songList.length; i++) {
        for (var key in songList[i]) {
          if (songList[i].hasOwnProperty(key)) {
            if (key !== "name" && key !== "artist") {
              delete songList[i][key];
              delete songList[i].artist.mbid;
              delete songList[i].artist.url;
            }
          }
        }
      }

      var formattedSongList = songList.map(
        ({ name: track_name, artist: artist_name }) => ({
          track_name,
          artist_name: artist_name.name,
          track_id: "TEST ID",
          genre: "rock",
        })
      );

      for (var i = 0; i < formattedSongList.length; i++) {
        db.getSongs(
          formattedSongList[i].track_name,
          formattedSongList[i].artist_name,
          formattedSongList[i].track_id,
          formattedSongList[i].genre
        )
          .then((songs) => {
            res.json(songs);
          })
          .catch((error) => {
            console.log(error);
            res.status(500).json({
              error: "Error retrieving songs, could not connect to database.",
            });
          });
      }
    })
    .catch((err) =>
      res.status(500).json({
        error: "Error: Unable to retrieve songs or user not signed in.",
      })
    );
});

// like song
// router.post("/like/:id", restricted, (req, res) => {
//   const track_id = req.body.track_id;
//   const user_id = req.user.id;
//   axios
//     .get(`temp.url.gov`)
//     .then((resp) => {
//       db.likeSong(resp.data.seed, user_id, track_id)
//         .then(() => {
//           res.status(201).json({ message: "Successfully liked song!" });
//         })
//         .catch((err) => console.log(err));
//     })
//     .catch((err) =>
//       res
//         .status(500)
//         .json({ error: "Error: Unable to find song or user not signed in." })
//     );
// });

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
router.delete("/:id/likes/:track_id", restricted, (req, res) => {
  const id = req.params.id;
  const track_id = req.params.track_id;
  console.log(req.user.id);
  if (id == req.user.id) {
    db.deleteFromLikes(id, track_id)
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
