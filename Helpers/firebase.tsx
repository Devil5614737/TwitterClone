import { User } from "firebase/auth";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { PostI } from "../interfaces/PostI";
import { UsersI } from "../interfaces/User";
import { db } from "../lib/firebase";

const like = async (id: string,uid:string) => {
    await updateDoc(doc(db, "posts", id), {
      likes: arrayUnion({
        uid,
      }),
    });
  };


  const unLike = async (id: string,uid:string) => {
    const ref = doc(db, "posts", id);

    await updateDoc(ref, {
      likes: arrayRemove({
        uid
      }),
    });
  };



  const handleLike = (id: string, post: PostI,uid:string) => {
    let isLiked = post.data.likes.find((item) => item.uid === uid);

    return typeof isLiked === "undefined"
      ? like(id, uid as string)
      : unLike(id,uid as string);
  };








  export {like,unLike,handleLike}