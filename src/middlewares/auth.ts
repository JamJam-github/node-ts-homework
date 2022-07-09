import { Request, Response, NextFunction } from 'express';
import { verify } from '../modules/jwt'

const TOKEN_EXPIRED = -3;
const TOKEN_INVALID = -2;

export const authUtil = {
    checkToken: async (req: Request, res: Response, next: NextFunction) => {
        let authHeader = req.headers['authorization'];
        let token = authHeader && authHeader.split(" ")[1];  // Bearer + token

        if (!token) {
            return res.status(400).json({success: false, message: "Empty Token"});
        }

        const user = await verify(token);
        if (user === TOKEN_EXPIRED) {
            return res.status(401).json({success: false, message: "Invalid Token"});
        }
        if (user === TOKEN_INVALID) {
            return res.status(401).json({success: false, message: "Invalid Token"});
        }

        req['token'] = token;
        req['userId'] = user['userId'];

        // console.log('검증 후 담은 req 정보', req['userId']);

        next();
    }
}