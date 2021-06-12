require("dotenv").config();
const { google } = require("googleapis");
const oauth2 = google.oauth2("v2");
const axios = require("axios");

//Google Api stuff

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT
);

const scopes = "https://www.googleapis.com/auth/webmasters";

const url = oauth2Client.generateAuthUrl({
  // 'online' (default) or 'offline' (gets refresh_token)
  access_type: "offline",

  // If you only need one scope you can pass it as a string
  scope: scopes,
});

const redirectFunction = (req, res) => {
  console.log(url);
  axios
    .get(
      "https://accounts.google.com/o/oauth2/v2/auth?access_type=offline&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fwebmasters&response_type=code&client_id=581749580855-7os7thh02ips6t6okk4hdklg0s54eopu.apps.googleusercontent.com&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fdashboard"
    )
    .then((response) => {
      console.log(typeof response);
      console.log(Object.keys(response));
      return res.status(200).json(url);
    });
};

module.exports = {
  redirectFunction,
};
