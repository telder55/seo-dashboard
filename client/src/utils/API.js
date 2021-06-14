import axios from "axios";

const API = {
  // Gets all users
  getUsers: function () {
    return axios.get("/api/users");
  },
  // Gets the User with the given id
  getUser: function (id) {
    return axios.get("/api/users/" + id);
  },
  // Deletes the User with the given id
  deleteUser: function (id) {
    return axios.delete("/api/users/" + id);
  },
  // Saves a User to the database
  saveUser: function (userData) {
    return axios.post("/api/users", userData);
  },

  checkUser: function (email) {
    return axios.get("/api/users/" + email);
  },

  getRedirect: function () {
    return axios.get("/api/redirect/");
  },

  exchangeCode: function (code) {
    return axios.post("/api/exchange/", code);
  },

  getSearch: function () {
    return axios.post("/api/search/");
  },
};

export default API;
