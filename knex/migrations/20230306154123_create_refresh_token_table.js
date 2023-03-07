/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.raw(`
    CREATE TABLE token
    (
      id bigint NOT NULL AUTO_INCREMENT primary key,
      user_id bigint NOT NULL,    
      refresh_token varchar(2000) NOT NULL,
      access_token varchar(2000) NOT NULL,
      FOREIGN KEY (user_id) REFERENCES users(id)
    )
  `);
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("refresh_token");

};
