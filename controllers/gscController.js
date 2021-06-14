require("dotenv").config();
const { google } = require("googleapis");
const oauth2 = google.oauth2("v2");
const axios = require("axios");
const db = require("../models");

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
  axios
    .get(
      "https://accounts.google.com/o/oauth2/v2/auth?access_type=offline&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fwebmasters&response_type=code&client_id=581749580855-7os7thh02ips6t6okk4hdklg0s54eopu.apps.googleusercontent.com&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fdashboard"
    )
    .then((response) => {
      return res.status(200).json(url);
    });
};

const exchangeFunc = async (req, res) => {
  try {
    const { tokens } = await oauth2Client.getToken(req.body.code);
    const updateDB = await updateRefresh(req.body.id, tokens.refresh_token);
    console.log("Token added to db: ", tokens.refresh_token);
    return res.status(200).json(tokens.refresh_token);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
};

const updateRefresh = (id, token) => {
  db.User.findOneAndUpdate(
    { _id: id },
    {
      refreshtoken: token,
    }
  ).then();
};

const getRefresh = async (req, res) => {
  try {
    const newPost = {
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      refresh_token:
        "1//04c2Or_qnZR7QCgYIARAAGAQSNwF-L9IrcBIkRe6_ebRlNLX7Q2gEFTYK2f9E9D1UvfkPjySqDW91whDWO7GkFqU6kIbpq-FFrcg",
      grant_type: "refresh_token",
    };
    const refreshToken = await axios({
      method: "post",
      url: "https://oauth2.googleapis.com/token",
      data: newPost,
    });
    const metrics = await getMetrics(refreshToken.data.access_token);

    return res.status(200).json(metrics);
  } catch (err) {
    console.log(err);
  }
};

const getMetrics = async (token) => {
  const apiResponse = await axios({
    method: "post",
    url: "https://www.googleapis.com/webmasters/v3/sites/sc-domain:nevadamentalhealth.com/searchAnalytics/query?&",
    data: {
      startDate: "2021-05-01",
      endDate: "2021-05-31",
      dimensions: ["country", "device"],
    },
    headers: { Authorization: `Bearer ${token}` },
  });
  return apiResponse.data;
};

module.exports = {
  redirectFunction,
  exchangeFunc,
  getRefresh,
};
