import {Router} from "express";
import {getMemoList, getMemoById, register, updateMemo} from "./controller"

const memoRoute = Router();

memoRoute.get('/', getMemoList);
memoRoute.get('/:id', getMemoById);
memoRoute.post('/', register);
memoRoute.put('/:id', updateMemo);


export default memoRoute