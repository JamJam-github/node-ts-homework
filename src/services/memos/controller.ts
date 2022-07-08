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

export {getMemoList, getMemoById}