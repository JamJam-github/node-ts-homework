import { Request, Response } from 'express';
import { connection } from '../../config/dbconfig';

const query = require('./querystring');

// 메모 리스트 API
async function getMemoList(req: Request, res: Response) {
    console.log('getMemoList call');

    let curpage = req.query.page_number;
    let pageSize = req.query.page_size;
    
    if (!curpage) {
        curpage = '1';
    }
    if (!pageSize) {
        pageSize = '5';
    }

    const postdb = await connection.connect();
    console.log('pageSize, curpage', pageSize, curpage);

    try {
        postdb.query(query.SELECT_MEMO_LIST, [pageSize, curpage], function(err, results) {
            if (err) {
                console.log(err);
                return res.status(500).json({success: false, err});
            } else {
                res.json({success: true, memoList: results.rows, page: curpage, page_size: pageSize})
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

// 메모 전체 개수 API
async function getMemoCount(req: Request, res: Response) {
    const postdb = await connection.connect();

    try {
        postdb.query(query.SELECT_MEMO_ALL, [], function(err, results) {
            if (err) {
                console.log(err);
                return res.status(500).json({success: false, err});
            } else {
                res.json({success: true, allSize: results.rows})
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

// 메모 상세보기 API
async function getMemoById(req: Request, res: Response) {
    console.log('getMemoById ::', req.params);
    const postdb = await connection.connect();
    const params = [req.params.id];

    try {
        postdb.query(query.SELECT_MEMO_BYID, params, function(err, results) {
            if (err) {
                console.log(err);
                return res.status(500).json({success: false, err});
            } else {
                const memoList = results.rows;
                postdb.query(query.SELECTE_REPLY_BYMEMOID, params, function(err, results) {
                    if (err) {
                        console.log(err);
                        return res.status(500).json({success: false, err});
                    } else {
                        res.json({success: true, memoList: memoList, replyList: results.rows});
                    }
                });
            }
        })
    } catch (error) {
        console.error(error);
        await postdb.query('ROLLBACK');
        res.status(500).json({success: false, message: "Server Error"});
    } finally {
        postdb.release();
    }
}

// 메모 생성 API
async function register(req: Request, res: Response) {
    console.log('register ::', req.body);
    for(var field of ['title', 'content', 'user_id']){
        if(!req.body[field]) {
            return res.json({success: false, code: 501, message: `입력값이 누락되었습니다. (${field})`,  data: field});
        }
    }
   
    const postdb = await connection.connect();
    const params = [req.body.title, req.body.content, req.body.user_id];

    try {
        postdb.query(query.INSERT_MEMO, params, function(err, results) {
            if (err) {
                console.log(err);
                return res.status(500).json({success: false, err});
            } else {
                res.json({success: true, result: results.rows})
            }
        })
    } catch (error) {
        console.error(error);
        await postdb.query('ROLLBACK');
        res.status(500).json({success: false, message: "Server Error"});
    } finally {
        postdb.release();
    }
}

// 메모 수정 API
async function updateMemo(req: Request, res: Response) {
    console.log('updateMemo');

    const postdb = await connection.connect();

    try {
        postdb.query(query.SELECTE_MEMO_BYUSERID, [req.params.id, req['userId']], function(err, results) {
            if (err) {
                console.log(err);
                return res.status(500).json({success: false, err});
            } else {
                if (results.rowCount == 0) {
                    return res.status(403).json({success: false, message: "작성자만 수정이 가능합니다."});
                } else {
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

// 메모 삭제 API
async function deleteMemo(req: Request, res: Response) {
    console.log('deleteMemo ::', req['userId']);

    const postdb = await connection.connect();

    try {
        postdb.query(query.SELECTE_MEMO_BYUSERID, [req.params.id, req['userId']], function(err, results) {
            if (err) {
                console.log(err);
                return res.status(500).json({success: false, err});
            } else {
                if (results.rowCount == 0) {
                    return res.status(403).json({success: false, message: "작성자만 삭제가 가능합니다."});
                } else {
                    postdb.query(query.DELETE_MEMO, [req.params.id], function(err, results) {
                        if (err) {
                            console.log(err);
                            return res.status(500).json({success: false, err});
                        } else {
                            res.json({success: true})
                        }
                    });
                }
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


export {getMemoList, getMemoCount, getMemoById, register, updateMemo, deleteMemo}