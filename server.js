const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");
const app = express();
const PORT = process.env.PORT || 3001;

const { google } = require("googleapis");
const oauth2 = google.oauth2("v2");

//Google Api stuff

const oauth2Client = new google.auth.OAuth2(
  "581749580855-7os7thh02ips6t6okk4hdklg0s54eopu.apps.googleusercontent.com",
  "YUBY58RHR7TKKDCKllgO66ZQ",
  "http://localhost:3000/dashboard"
);

const scopes = "https://www.googleapis.com/auth/webmasters";

const url = oauth2Client.generateAuthUrl({
  // 'online' (default) or 'offline' (gets refresh_token)
  access_type: "offline",

  // If you only need one scope you can pass it as a string
  scope: scopes,
});

console.log(url);

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}
// Add routes, both API and view
app.use(routes);

// Connect to the Mongo DB
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/seodashboard",
  { useNewUrlParser: true, useUnifiedTopology: true }
);

// Start the API server
app.listen(PORT, function () {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
