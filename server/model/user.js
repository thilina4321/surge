const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const user = new Schema({
  email: String,
  password: String,
  userName:String,
  fullName:String
});

user.statics.loginWithEmailAndPassword = async (data) => {
  try {
    const admin = await User.findOne({ email: data.email });
    if (!admin) {
      throw new Error("Loging failed");
    }

    const compare = await bcrypt.compare(data.password, admin.password);
    if (!compare) {
      throw new Error("Invalid password");
    }

    return admin;
  } catch (error) {
    throw new Error("Login Failed");
  }
};

user.methods.toJSON = function () {
  const admin = this;
  const adminObject = admin.toObject();

  delete adminObject.tokens;
  delete adminObject.password;

  return adminObject;
};

user.methods.generateToken = async function () {
  const admin = this;

  try {
    const token = jwt.sign({ id: admin._id }, 'Surge', {
      expiresIn: "1h",
    });

    
    return token;
  } catch (error) {
    throw new Error("Something went wrong");
  }
};

const User = mongoose.model("user", user);

module.exports = User;
