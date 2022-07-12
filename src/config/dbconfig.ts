import { Pool } from "pg";
import { env } from "./env";


// pg 모듈의 Connection Pool를 사용해서 connection 설정
export const connection = new Pool({
    host: env.database.host,
    user: env.database.user,
    database: env.database.database,
    password: env.database.password,
    port: env.database.port,
    max: 10,
    connectionTimeoutMillis: 30000,
    idleTimeoutMillis: 30000
});

connection.connect(function(error, args) {
    if (error) {
        console.error(error);
        process.exit();
    } else {
        console.log('postgresql connection');
    }
});

