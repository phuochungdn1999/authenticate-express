const config = require('config');
const bcrypt = require("bcrypt");


const genSalt = async (saltRounds) => {
  const salt = await bcrypt.genSalt(saltRounds);
  return salt;
};
const encryptPassword = async (password) => {
  try {
    const salt = await genSalt(parseInt(config.get('saltRound')));
    const hash = await bcrypt.hash(password, salt);
    return hash.toString();
  } catch (error) {
    console.log(error);
  }
};

const comparePassword = async (password, passwordHash) => {
  try {
    const compare = await bcrypt.compare(password, passwordHash);
    return compare;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  encryptPassword,
  comparePassword,
};
