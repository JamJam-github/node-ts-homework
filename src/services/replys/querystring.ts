module.exports.INSERT_REPLY = `
    insert into reply (memo_id, comment, user_id) 
    values ($1, $2, $3) 
    RETURNING reply_id
`;

module.exports.UPDATE_REPLY = `
    update reply
    set comment = $1
    where reply_id = $2
`;

module.exports.DELETE_REPLY = `
    delete from reply
    where reply_id = $1
`;