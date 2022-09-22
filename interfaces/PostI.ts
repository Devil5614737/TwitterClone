
export interface postedByI{
    displayName:string,
    photoURL:string,
    uid:string
}

interface CommentsPostedby{
    date:any,
    displayName:string,
    id:string,
    photoURL:string
}

export interface CommentsI{
id:string,
text:string,
postedBy:CommentsPostedby
}

export interface LikesI{
    uid:any
}

interface dataI{
    id:string,
    caption:string,
    comments:CommentsI[],
    createdAt:any,
    image:string,
    likes:LikesI[],
    postedBy:postedByI,
}

export interface PostI{
    id?:string,
data:dataI
}