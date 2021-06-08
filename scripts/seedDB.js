const mongoose = require("mongoose");
const db = require("../models");

// This file empties the User collection and inserts the users below

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/seodashboard");

const userSeed = [
  {
    first: "TJ",
    last: "Elder",
    email: "telder55@gmail.com",
    password: "password",
    date: new Date(Date.now()),
  },
  // {
  //   first: "Melanie",
  //   last: "Elder",
  //   email: "mel@gmail.com",
  //   password: "password",
  //   date: new Date(Date.now()),
  // },
];

db.User.remove({})
  .then(() =>
    db.User.create({
      first: "TJ",
      last: "Elder",
      email: "telder55@gmail.com",
      password: "abcd@1234",
    })
  )
  .then((res) => {
    console.log("res", res);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });

// db.User.remove({})
//   .then(() => db.User.collection.insertMany(userSeed))
//   .then((data) => {
//     console.log(data.result.n + " records inserted!");
//     process.exit(0);
//   })
//   .catch((err) => {
//     console.error(err);
//     process.exit(1);
//   })
