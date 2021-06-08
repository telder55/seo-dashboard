const mongoose = require("mongoose");
const db = require("../models");

// This file empties the User collection and inserts the users below

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/seodashboard");

db.User.remove({})
  .then(() =>
    db.User.create({
      first: "TJ",
      last: "Elder",
      email: "telder55@gmail.com",
      password: "abcd@1234",
      date: new Date(Date.now()),
    })
  )
  .then((res) => {
    console.log("res", res);
    process.exit(0);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
