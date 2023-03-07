const knex = require("../../knex/knex");

const createUser = async (query) => {
  const userId = await knex("users").insert(query);
  return userId;
};

const findOneUser = async (query) => {
  const user = await knex("users").where(query).select("*");
  return user;
};

module.exports = {
  createUser,
  findOneUser,
};
