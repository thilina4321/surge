const signupHelper = require("../helper/signup-helper");
const loginHelper = require("../helper/login-helper");
const User = require("../model/user");
const bcrypt = require("bcryptjs");

exports.singupUser = async (req, res) => {
  const data = req.body;
  const { fullName, email, password, confirmPw, userName } = data;
  const userData = [fullName, email, password, confirmPw, userName];

  const isRequiredData = userData.every((ud) => ud);

  if (!isRequiredData) {
    return res
      .status(400)
      .send({ success: false, message: "Please provide all details" });
  }

  if (password !== confirmPw) {
    return res
      .status(400)
      .send({ success: false, message: "Password mismatch" });
  }

  try {
    const { savedUser, error } = await signupHelper.signupUser(
      email,
      password,
      userName,
      fullName
    );

    if (error) {
      return res.status(500).send({ success: false, message: error });
    }
    return res.send({
      success: true,
      message: "Sign up successfully",
      data: savedUser,
    });
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

exports.loginUser = async (req, res) => {
  const data = req.body;
  const { email, password } = data;
  const userData = [email, password];

  const isRequiredData = userData.every((ud) => ud);
  

  if (!isRequiredData) {
    return res.status(400).send({
      success: false,
      message: "Please provide all email and password",
    });
  }
  try {
    const { user, token, error } = await loginHelper.loginHelper(data);
    if (error) {
      return res.status(422).send({ success: false, message: error });
    }
    return res.status(200).send({
      success: true,
      message: "Login successfully",
      data: { user, token },
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.currentUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);
    if (!user) {
      return res
        .status(404)
        .send({ success: false, message: "user can not find" });
    }
    return res
      .status(200)
      .send({ data: user, success: true, message: "successfully find user" });
  } catch (error) {
    return res.send(500).send({ success: false, message: error.message });
  }
};

exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const { fullName, userName, email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (user && user._id != id) {
      return res
        .status(400)
        .send({ success: false, message: "This email is already taken" });
    }
    const findUser = await User.findById(id);

    if (!findUser) {
      return res
        .status(404)
        .send({ success: false, message: "User can not found" });
    }

    const upUser = await findUser.set({ fullName, userName, email });
    const u = await upUser.save();

    return res
      .status(200)
      .send({ data: u, success: true, message: "successfully find user" });
  } catch (error) {
    return res.status(500).send({ success: false, message: error.message });
  }
};

exports.updatePassword = async (req, res) => {
  const { id } = req.params;
  const { currentPassword, newPassword } = req.body;

  try {
    const findUser = await User.findById(id);

    if (!findUser) {
      return res
        .status(404)
        .send({ success: false, message: "User can not found" });
    }

    const user = await User.loginWithEmailAndPassword({
      email: findUser.email,
      password: currentPassword,
    });
    if (user.error) {
      return res
        .status(401)
        .send({ success: false, message: "Authentication failed" });
    }

    const hash = await bcrypt.hash(newPassword, 8);

    const upUser = await findUser.set({ ...findUser, password: hash });
    const u = await upUser.save();

    return res
      .status(200)
      .send({ data: u, success: true, message: "successfully change password" });
  } catch (error) {
    return res.status(500).send({ success: false, message: error.message });
  }
};
