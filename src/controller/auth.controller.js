const knex = require("../../knex/knex");
const { createToken, deleteToken, findOneToken } = require("../services/token.service");
const { createUser, findOneUser } = require("../services/user.service");
const { signJWT, verifyJWT } = require("../utils/jwt");
const { encryptPassword, comparePassword } = require("../utils/password");

const signUpHandler = async (req, res, next) => {
  try {
    const users = await findOneUser({ email: req.body.email });
    if (users.length > 0) {
      return res.status(400).json({
        message: "Email already exist",
      });
    }
    const password = await encryptPassword(req.body.password);
    await createUser({
      email: req.body.email,
      password: password,
      fullname: req.body.fullname,
    });
    return res.status(200).json({
      message: "Create successful",
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

const signInHandler = async (req, res, next) => {
  try {
    const users = await findOneUser({ email: req.body.email });
    if (!users.length > 0) {
      return res.status(401).json({
        message: "Email not exist",
      });
    }
    const compare = await comparePassword(req.body.password, users[0].password);
    if (compare) {
      const accessToken = signJWT({ id: users[0].id });
      const refreshToken = signJWT({ id: users[0].id }, true);

      await createToken({
        user_id: users[0].id,
        refresh_token: refreshToken,
        access_token: accessToken,
      });

      return res.status(200).json({
        message: "Login successful",
        accessToken: accessToken,
        refreshToken: refreshToken,
      });
    }
    return res.status(401).json({
      message: "Login failed",
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: error.message,
    });
  }
};

const refreshTokenHandler = async (req, res, next) => {
  try {
    const decoded = verifyJWT(req.body.refreshToken, true);
    if (!decoded) {
      return res.status(400).json({
        message: "Invalid refresh token",
      });
    }

    const refreshToken = await findOneToken({refresh_token: req.body.refreshToken})
    if(refreshToken.length === 0){
      return res.status(403).json({
        message: "Invalid refresh token",
      });
    }

    const user = await findOneUser({ id: decoded.id });

    if (!user) {
      return res.status(403).json({
        message: "User not found",
      });
    }

    const newAccessToken = signJWT({ id: decoded.id });
    const newRefreshToken = signJWT({ id: decoded.id }, true);
    await createToken({
      user_id: user[0].id,
      refresh_token: newRefreshToken,
      access_token: newAccessToken,
    });

    return res.status(200).json({
      message: "Refresh token successful",
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: error.message,
    });
  }
};

const logoutHandler = async (req, res, next) => {
  try {
    const accessToken = req.headers.authorization.split(" ")[1];
    await deleteToken({ access_token: accessToken.toString() });
    return res.status(200).json({
      message: "Log out successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: error.message,
    });
  }
};

module.exports = {
  signUpHandler,
  signInHandler,
  refreshTokenHandler,
  logoutHandler,
};
