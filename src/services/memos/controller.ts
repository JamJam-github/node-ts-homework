import express, { Request, Response } from 'express';
import { connection } from "../../config/dbconfig";

// 메모 리스트 API
async function getMemoList(req: Request, res: Response) {
    console.log('getMemoList ::');
    const postdb = await connection.connect();
    const SELECT_MEMO_LIST = "select * from memo";
    

    postdb.query(SELECT_MEMO_LIST, [], function(err, results) {
        if (err) {
            console.log(err);
            return res.status(500).json({success: false, err});
        } else {
            res.json({success: true, memoList: results.rows})
        }
    })
}

// 메모 상세보기 API
async function getMemoById(req: Request, res: Response) {
    console.log('getMemoById ::', req.params);
    const postdb = await connection.connect();
    const SELECT_MEMO_BYID = "select * from memo where id = $1";
    const params = [req.params.id];

    postdb.query(SELECT_MEMO_BYID, params, function(err, results) {
        if (err) {
            console.log(err);
            return res.status(500).json({success: false, err});
        } else {
            res.json({success: true, memoList: results.rows})
        }
    })
}

// 메모 생성 API
async function register(req: Request, res: Response) {
    console.log('register ::', req.params);
    for(var field of ['title', 'content']){
        if(!req.body[field]) {
            return res.json({success: false, code: 501, message: `입력값이 누락되었습니다. (${field})`,  data: field});
        }
    }
   
    const postdb = await connection.connect();
    const INSERT_MEMO = "insert into memo (title, content) values ($1, $2) RETURNING id";
    const params = [req.body.title, req.body.content];

    postdb.query(INSERT_MEMO, params, function(err, results) {
        if (err) {
            console.log(err);
            return res.status(500).json({success: false, err});
        } else {
            res.json({success: true, result: results.rows})
        }
    })
}

export {getMemoList, getMemoById, register}