const knex = require("../../knex/knex");

const createToken = async (query) => {
  const refreshTokenId = await knex("token").insert(query);
  return refreshTokenId;
};

const deleteToken = async (query) => {
  const refreshTokenId = await knex("token").del().where(query);
  return refreshTokenId;
};

const findOneToken = async (query) => {
  const token = await knex("token").where(query).select("*");
  return token;
};


module.exports = {
  createToken,
  deleteToken,
  findOneToken
};
