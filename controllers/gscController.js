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
  axios.get(url).then((response) => {
    return res.status(200).json(url);
  });
};

const exchangeFunc = async (req, res) => {
  try {
    const { tokens } = await oauth2Client.getToken(req.body.code);
    const updateDB = await updateRefresh(req.body.id, tokens.refresh_token);
    console.log("Token added to db: ", tokens.refresh_token);
    return res.status(200).json(true);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
};

const updateRefresh = async (id, token) => {
  await db.User.findOneAndUpdate(
    { _id: id },
    {
      refreshtoken: token,
      gscconnected: true,
    }
  ).then();
};

const getRefresh = async (req, res) => {
  try {
    const currentUserId = req.body.id;
    console.log("User Id ", currentUserId);
    const getUsersRefresh = await db.User.findById(
      currentUserId,
      "refreshtoken"
    ).exec();
    const newPost = await {
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      refresh_token: getUsersRefresh.refreshtoken,
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
      searchType: "web",
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
