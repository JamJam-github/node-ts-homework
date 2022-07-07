import { Pool } from "pg";
import { env } from "./env";


// pg 모듈의 Connection Pool를 사용해서 connection 설정
export const connection = new Pool({
    user: env.database.user,
    host: env.database.host,
    database: env.database.database,
    password: env.database.password,
    port: env.database.port
})

