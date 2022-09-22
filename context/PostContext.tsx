import { arrayUnion, collection, doc, onSnapshot, Timestamp, updateDoc } from "firebase/firestore";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { AuthContextI } from "../interfaces/AuthContextI";
import { PostContextI } from "../interfaces/PostContextI";
import { PostI } from "../interfaces/PostI";
import { db } from "../lib/firebase";
import { AuthContext } from "./AuthContext";
import { v4 as uuid } from "uuid";

export const PostContext=createContext({} as PostContextI)


interface PostContextProviderI {
    children: ReactNode;
  }

export const PostContextProvider=({children}:PostContextProviderI)=>{
  const {currentUser}=useContext<AuthContextI>(AuthContext)
    const[posts,setPosts]=useState<PostI[]>([]);
    const[progress,setProgress]=useState<number>();
    const[openCommentModal,setOpenCommentModal]=useState<boolean>(false)
    const[commentId,setCommentId]=useState<string>("")



    const postsCollection = collection(db, "posts");

    useEffect(() => {
        const unsubscribe = onSnapshot(postsCollection, (snapshot) => {
           const data=snapshot.docs.map((doc:any) => ({ id: doc.id, data: doc.data() }));
           data.sort((a,b)=>b.data.createdAt-a.data.createdAt)
       setPosts(data);
        });
    
        return () => {
          unsubscribe();
        };
      }, []);


      const handleComment = async (id:string ,text:string ) => {
        if (!text) return;
        await updateDoc(doc(db, "posts", id), {
          comments: arrayUnion({
            id: uuid(),
            text,
            postedBy: {
              id: currentUser&&currentUser.uid,
              displayName: currentUser&&currentUser.displayName,
              photoURL: currentUser&&currentUser.photoURL,
              date: Timestamp.now(),
            },
          }),
        })
     
    
      };


    return (
        <PostContext.Provider value={{posts,setProgress,progress,openCommentModal,setOpenCommentModal,handleComment,setCommentId,commentId}}>
            {children}
        </PostContext.Provider>
    )
}