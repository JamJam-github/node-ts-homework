module.exports.SELECT_MEMO_LIST = "select * from memo order by id limit $1 offset ($2 - 1) * $1";

module.exports.SELECT_MEMO_ALL = "select count(1) from memo;"

module.exports.SELECT_MEMO_BYID = "select * from memo where id = $1";

module.exports.INSERT_MEMO = "insert into memo (title, content) values ($1, $2) RETURNING id";

module.exports.UPDATE_MEMO = `
    update memo
    set title = $1,
    content = $2
    where id = $3
    ;
`;

module.exports.DELETE_MEMO = "delete from memo where id = $1";