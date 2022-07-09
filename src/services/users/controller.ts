import express, { Request, Response } from 'express';
import { connection } from '../../config/dbconfig';
import bcrypt from 'bcrypt';
import {sign, verify} from '../../modules/jwt';

const query = require('./querystring');

// 회원가입 API
async function register(req: Request, res: Response) {
    console.log('register ::', req.body);

    // 필수값 체크
    for(var field of ['id', 'password']){
        if(!req.body[field]) {
            return res.status(400).json({success: false, code: 501, message: `필수 입력값이 누락되었습니다. (${field})`,  data: field});
        }
    }

    const postdb = await connection.connect();

    try {
        // 중복 가입 확인
        const results = await postdb.query(query.SELECT_USER, [req.body.id]);
        if (results.rowCount > 0) {
            return res.status(400).json({success: false, code: 502, message: '중복된 아이디입니다.'});
        }

        // 정상 가입 로직
        const saltRound = 10;
        const salt = await bcrypt.genSalt(saltRound);
        const hashedPW = await bcrypt.hash(req.body.password, salt);

        postdb.query(query.INSERT_USER, [req.body.id, hashedPW], function(err, results) {
            if (err) {
                console.log(err);
                return res.status(500).json({success: false, err});
            } else {
                res.json({success: true, result: results.rowCount})
            }
        })
    } catch (error) {
        console.error(error);
        await postdb.query('ROLLBACK')
        res.status(500).json({success: false, message: "Server Error"});
    } finally {
        postdb.release();
    }
}


// 로그인 API
async function login(req: Request, res: Response) {
    for(var field of ['id', 'password']){
        if(!req.body[field]) {
            return res.json({success: false, code: 501, message: `필수 입력값이 누락되었습니다. (${field})`,  data: field});
        }
    }

    const postdb = await connection.connect();

    try {
        const results = await postdb.query(query.SELECT_USER, [req.body.id]);
        if (results.rowCount > 0) {
            const isMatch = await bcrypt.compare(req.body.password, results.rows[0]['password']);
            if (isMatch) {
                const jwtToken = await sign(results.rows[0]);
                res.status(200).json({loginSuccess: true, userId: req.body.id, token: jwtToken.token, refreshToken: jwtToken.refreshToken});
            } else {
                res.json({loginSuccess: false, code: 503, message: '비밀번호가 맞지 않습니다.'});
            }
        } else {
            return res.status(400).json({success: false, code: 502, message: '등록된 로그인 정보가 없습니다.'});
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({success: false, message: "Server Error"});
    } finally {
        postdb.release();
    }
    
}


export {register, login}