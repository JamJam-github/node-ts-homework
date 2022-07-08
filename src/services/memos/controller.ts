import express, { Request, Response } from 'express';
import { type } from 'os';
import { connection } from '../../config/dbconfig';

const query = require('./querystring');

// 메모 리스트 API
async function getMemoList(req: Request, res: Response) {
    console.log('getMemoList call');
    const postdb = await connection.connect();
    

    postdb.query(query.SELECT_MEMO_LIST, [], function(err, results) {
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
    const params = [req.params.id];

    postdb.query(query.SELECT_MEMO_BYID, params, function(err, results) {
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
    console.log('register ::', req.body);
    for(var field of ['title', 'content']){
        if(!req.body[field]) {
            return res.json({success: false, code: 501, message: `입력값이 누락되었습니다. (${field})`,  data: field});
        }
    }
   
    const postdb = await connection.connect();
    const params = [req.body.title, req.body.content];

    postdb.query(query.INSERT_MEMO, params, function(err, results) {
        if (err) {
            console.log(err);
            return res.status(500).json({success: false, err});
        } else {
            res.json({success: true, result: results.rows})
        }
    })
}

// 메모 수정 API
async function updateMemo(req: Request, res: Response) {
    console.log('updateMemo ::', req.body);
    console.log('updateMemo param::', req.params);

    const postdb = await connection.connect();
    const params = [req.body.title, req.body.content, req.params.id];

    postdb.query(query.UPDATE_MEMO, params, function(err, results) {
        if (err) {
            console.log(err);
            return res.status(500).json({success: false, err});
        } else {
            res.json({success: true})
        }
    });
}

export {getMemoList, getMemoById, register, updateMemo}