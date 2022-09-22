import { PostI } from "./PostI";
import { UsersI } from "./User";

export interface PostContextI{
    posts:PostI[],
    progress?:number,
    setProgress:(progress:number)=>void,
    openCommentModal:boolean,
    setOpenCommentModal:(openCommentModal:boolean)=>void,
    handleComment:(id:string,text:string)=>void,
    setCommentId:(commentId:string)=>void,
    commentId:string,
    }