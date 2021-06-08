const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");

module.exports = () => {};

const userSchema = new Schema({
  first: { type: String, required: true },
  last: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

// Hashes password automatically
userSchema.pre("save", async function (next) {
  const bcryptSalt = 10;
  const hash = await bcrypt.hash(this.password, Number(bcryptSalt));
  this.password = hash;
  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
