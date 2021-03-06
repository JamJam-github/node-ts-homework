module.exports.SELECT_MEMO_LIST = `
    select id, title, content, user_id
    from memo 
    order by id 
    limit $1 
    offset ($2 - 1) * $1
    ;
`;

module.exports.SELECT_MEMO_ALL = "select count(1) from memo;"

module.exports.SELECT_MEMO_BYID = `
    select id, title, content, user_id
    from memo 
    where id = $1
`;

module.exports.INSERT_MEMO = `
    insert into memo (title, content, user_id) 
    values ($1, $2, $3) 
    RETURNING id`;

module.exports.UPDATE_MEMO = `
    update memo
    set title = $1,
    content = $2
    where id = $3
    ;
`;

module.exports.DELETE_MEMO = "delete from memo where id = $1";

module.exports.SELECTE_MEMO_BYUSERID = `
    select user_id 
    from memo 
    where id = $1
    and user_id = $2
`;

module.exports.SELECTE_REPLY_BYMEMOID = `
    select reply_id, comment, user_id
    from reply 
    where memo_id = $1
`;