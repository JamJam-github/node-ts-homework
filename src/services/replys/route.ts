import {Router} from "express";
import {createReply, deleteReply, updateReply} from "./controller";

const replyRoute = Router();

replyRoute.post('/', createReply);
replyRoute.put('/:replyId', updateReply);
replyRoute.delete('/:replyId', deleteReply);



export default replyRoute