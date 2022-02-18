const Auth = require("../model/user");
const bcrypt = require('bcryptjs');

exports.signupUser = async (email, password, userName, fullName) => {
  try {
    const hash = await bcrypt.hash(password, 8);
    const user = new Auth({
      email,
      password: hash,
      userName,
      fullName,
    });

    const savedUser = await user.save();
    return { savedUser };
  } catch (error) {
    return { error: error.message };
  }
};
