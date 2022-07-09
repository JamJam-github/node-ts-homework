import {Router} from "express";
import {login, register} from "./controller";

const userRoute = Router();

userRoute.post('/signup', register);
userRoute.post('/signin', login);



export default userRoute