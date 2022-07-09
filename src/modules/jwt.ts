import randToken from 'rand-token';
import jwt from 'jsonwebtoken';
import { env } from "../../src/config/env";


const secretKey = env.secret_key.jwt as string;
const options: any = env.options;
const TOKEN_EXPIRED = -3;
const TOKEN_INVALID = -2;


export const sign = async (userInfo: any) => {
    const payload = {
        userId: userInfo.user_id
    };

    const result = {
        token: jwt.sign(payload, secretKey, options),
        refreshToken: randToken.uid(256)
    }

    return result;
}

interface SystemError {
    code: string;
    message: string;
}

export const verify = async (token: any) => {
    let decoded;
    
    try {
        decoded = jwt.verify(token, secretKey);
    } catch (error) {
        const err = error as SystemError;
        if (err.message == 'jwt expired') {
            console.log('expired token');
            return TOKEN_EXPIRED;
        } else {
            console.log('invalid token');
            return TOKEN_INVALID;
        }
    }

    return decoded;
}