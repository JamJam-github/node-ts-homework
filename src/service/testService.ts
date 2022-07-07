import { resolve } from "path";
import { connection } from "../config/dbconfig";

export const search_User = async(userEmail: String, userPwd: String) => {
    const postdb = await connection.connect();
    const SEARCH_USER_SQL = "select * from test_user where user_email = $1 and user_pwd = $2";
    const params = [userEmail, userPwd];

    try {
        return new Promise((resolve, reject) => {
            postdb.query(SEARCH_USER_SQL, params, (error, results) => {
                if (error) reject(error);
                else resolve(results);
            })
        })
    } catch (error) {
        throw error;
    } finally {
        postdb.release();
    }
}