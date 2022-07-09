module.exports.SELECT_USER = "select user_id, password from account where user_id = $1";

module.exports.INSERT_USER = "insert into account (user_id, password, created) values ($1, $2, current_timestamp)";