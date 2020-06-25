exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("users")
    .truncate()
    .then(function () {
      // Inserts seed entries
      return knex("users").insert([
        {
          id: 1,
          name: "user1",
          email: "user2@gmail.com",
          password:
            "$2a$10$52twA0.mdakCADff/cepy.2BYltueuon9VSYSRXjFsv4mSh/wr1DO",
        },
        {
          id: 2,
          name: "user2",
          email: "user2@test.com",
          password:
            "$2a$10$52twA0.mdakCADff/cepy.2BYltueuon9VSYSRXjFsv4mSh/wr1DO",
        },
      ]);
    });
};
