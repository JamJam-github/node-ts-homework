import {Router} from "express";
import {getMemoList, getMemoById, register, updateMemo, getMemoCount} from "./controller"

const memoRoute = Router();

memoRoute.get('/', getMemoList);
memoRoute.get('/count', getMemoCount);
memoRoute.get('/:id', getMemoById);
memoRoute.post('/', register);
memoRoute.put('/:id', updateMemo);


export default memoRoute