import path from "path"
import dotenv from "dotenv"

const config = dotenv.config({
    path: path.join(__dirname, '../../env/server.env')
})

export const env = {
    database: {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        database: process.env.DB_DATABASE,
        password: process.env.DB_PASSWORD,
        port: Number(process.env.DB_PORT)
    },
    secret_key: {
        jwt: process.env.TOKEN_SECRET
    },
    options: {
        algorithm: "HS256",
        expiresIn: "30m",
        issuer: "issuer"
    }
}