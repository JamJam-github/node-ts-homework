import {Router} from "express";
import {getMemoList, getMemoById, register} from "./controller"

const memoRoute = Router();

memoRoute.get('/', getMemoList);
memoRoute.get('/:id', getMemoById);
memoRoute.post('/', register);


export default memoRoute