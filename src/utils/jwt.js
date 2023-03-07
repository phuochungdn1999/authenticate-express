const config = require("config");
const {expressjwt} = require("express-jwt");
const jwt = require('jsonwebtoken');
const publicEndpoint = require('./publicEndPoint')

const expressJWT = () => {
  return expressjwt({ secret: config.get('token.accessToken'), algorithms: ["HS256"] }).unless(publicEndpoint);
};

const signJWT = (payload, isRefreshToken = false)=>{
    const key = isRefreshToken ? config.get('token.refreshToken'): config.get('token.accessToken');
    const duration = isRefreshToken ? config.get('token.refreshTokenExpiresIn') : config.get('token.accessTokenExpiresIn')
    return jwt.sign(payload, key,{expiresIn: `${duration}d`})
}

const verifyJWT = (token, isRefreshToken = false)=>{
    try {
      const key = isRefreshToken ? config.get('token.refreshToken'): config.get('token.accessToken');
      return jwt.verify(token,key);
    } catch (error) {
        console.log(error);
        return null;
    }
}

module.exports = {
  expressJWT,
  signJWT,
  verifyJWT
};
