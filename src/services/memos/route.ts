import {Router} from "express";
import {getMemoList, getMemoById} from "./controller"

const memoRoute = Router();

memoRoute.get('/', getMemoList);
memoRoute.get('/:id', getMemoById);


export default memoRoute