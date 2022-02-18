const jwt = require("jsonwebtoken");
const Auth = require("../model/user");
const JWT_SECURE_KEY = 'Surge';

const auth = async (req, _, next) => {
  const token = req.header("Authorization").replace("Bearer ", "");
  try {
    const decordedToken = jwt.verify(token, JWT_SECURE_KEY);

    const user = await Auth.findOne({
      _id: decordedToken.id,
    });

    if (!user) {
      throw new Error("Not Authenticate");
    }

    next();
  } catch (err) {
    req.error = error;
    next();
  }
};

module.exports = auth;
