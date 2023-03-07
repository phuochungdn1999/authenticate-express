/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.raw(`
    CREATE TABLE users
    (
      id bigint NOT NULL AUTO_INCREMENT primary key,
      email varchar(255) NOT NULL unique,
      password varchar(2000) NOT NULL,
      fullname varchar(255)  NOT NULL   
    )
  `);
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("users");
};
