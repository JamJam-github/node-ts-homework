import { Request, Response } from 'express';
import { connection } from '../../config/dbconfig';

const query = require('./querystring');

// 댓글 생성 API
async function createReply(req: Request, res: Response) {
    for(var field of ['memo_id', 'comment', 'user_id']){
        if(!req.body[field]) {
            return res.json({success: false, code: 501, message: `입력값이 누락되었습니다. (${field})`,  data: field});
        }
    }
   
    const postdb = await connection.connect();
    const params = [req.body.memo_id, req.body.comment, req.body.user_id];

    try {
        postdb.query(query.INSERT_REPLY, params, function(err, results) {
            if (err) {
                console.log(err);
                return res.status(500).json({success: false, err});
            } else {
                res.json({success: true, result: results.rows})
            }
        });
    } catch (error) {
        console.error(error);
        await postdb.query('ROLLBACK');
        res.status(500).json({success: false, message: "Server Error"});
    } finally {
        postdb.release();
    }
}


// 댓글 수정 API
async function updateReply(req: Request, res: Response) {
    const postdb = await connection.connect();
    const params = [req.body.comment, req.params.replyId];

    try {
        postdb.query(query.UPDATE_REPLY, params, function(err, results) {
            if (err) {
                console.log(err);
                return res.status(500).json({success: false, err});
            } else {
                res.json({success: true, result: results.rowCount})
            }
        });
    } catch (error) {
        console.error(error);
        await postdb.query('ROLLBACK');
        res.status(500).json({success: false, message: "Server Error"});
    } finally {
        postdb.release();
    }
}

// 댓글 삭제 API
async function deleteReply(req: Request, res: Response) {
    const postdb = await connection.connect();
    const params = [req.params.replyId];

    try {
        postdb.query(query.DELETE_REPLY, params, function(err, results) {
            if (err) {
                console.log(err);
                return res.status(500).json({success: false, err});
            } else {
                res.json({success: true, result: results.rowCount})
            }
        });
    } catch (error) {
        console.error(error);
        await postdb.query('ROLLBACK');
        res.status(500).json({success: false, message: "Server Error"});
    } finally {
        postdb.release();
    }
}

export {createReply, updateReply, deleteReply}