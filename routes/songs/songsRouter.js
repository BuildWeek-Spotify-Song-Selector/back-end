const router = require("express").Router();
const axios = require("axios");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { restricted } = require("../../auth/restricted-middleware");

const db = require("./songsModel.js");

module.exports = router;

// get songs
router.get("/", restricted, (req, res) => {
  axios
    .get(`http://www.last.fm/music/Kanye+West`)
    .then((resp) => {
      res.json(resp);
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
    })
    .catch((err) =>
      res
        .status(500)
        .json({
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
