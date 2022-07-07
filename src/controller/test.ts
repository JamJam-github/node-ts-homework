import express, { Request, Response } from 'express';
import router from '../config/route';
import { search_User } from '../service/testService';

const testRoute = router;

testRoute.get('/test', (req: Request, res: Response) => {
    res.status(200).send("test good")
})

testRoute.post('/test', async(req: Request, res: Response) => {
    const userEmail: String = req.body.user_email;
    const userPwd: String = req.body.user_pwd;

    try {
        const result:any = await search_User(userEmail, userPwd);
        console.log('result.rows ::', result.rows);
        console.log('result.rowCount ::', result.rowCount);

        if (result.rowCount > 0) {
            res.status(200).send({
                success: true,
                result: result.rows
            });
        } else {
            res.status(400).send({
                success: false,
                message: "Resource Null"
            });
        }

    } catch (error) {
        console.error("post /test", error);
        res.status(500).send({
            success: false,
            message: "Server Error"
        });
    }
})

export default testRoute