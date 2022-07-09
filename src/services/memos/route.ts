import {Router} from "express";
import {getMemoList, getMemoById, register, updateMemo, getMemoCount, deleteMemo} from "./controller"
import { authUtil } from "../../middlewares/auth";

const memoRoute = Router();

memoRoute.get('/', getMemoList);
memoRoute.get('/count', getMemoCount);
memoRoute.get('/:id', getMemoById);
memoRoute.post('/', register);
memoRoute.put('/:id', authUtil.checkToken, updateMemo);
memoRoute.delete('/:id', authUtil.checkToken, deleteMemo);


export default memoRoute