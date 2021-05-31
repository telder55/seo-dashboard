const mongoose = require("mongoose");
const db = require("../models");

// This file empties the Books collection and inserts the books below

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/seodashboard");

const userSeed = [
  {
    first: "TJ",
    last: "Elder",
    email: "telder55@gmail.com",
    password: "password",
    date: new Date(Date.now()),
  },
  {
    first: "Melanie",
    last: "Elder",
    email: "mel@gmail.com",
    password: "password",
    date: new Date(Date.now()),
  },
];

db.User.remove({})
  .then(() => db.User.collection.insertMany(userSeed))
  .then((data) => {
    console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
