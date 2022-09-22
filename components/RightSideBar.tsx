
import { MagnifyingGlassIcon, XCircleIcon } from "@heroicons/react/24/outline";
import { arrayRemove, arrayUnion, collection, doc, DocumentData, onSnapshot, QueryDocumentSnapshot, updateDoc, where ,query as q} from "firebase/firestore";

import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";

import { AuthContextI } from "../interfaces/AuthContextI";
import {  UsersI } from "../interfaces/User";
import { db } from "../lib/firebase";

import { FollowUser } from "./FollowUser";

const RightSideBar = () => {

const {currentUser}=useContext<AuthContextI>(AuthContext)

  const [query, setQuery] = useState<string>("");
  const [users, setUsers] = useState<UsersI[]>([]);





  useEffect(() => {
    if (!currentUser) return;
    const u = q(
      collection(db, "users"),
      where("uid", "!=", currentUser && currentUser.uid)
    );
    const unsubscribe = onSnapshot(u, (snapshot) => {
      setUsers(
        snapshot.docs.map((doc: QueryDocumentSnapshot<DocumentData>) => ({
          id: doc.id,
          data: doc.data(),
        })) as UsersI[]
      );
    });

    return () => {
      unsubscribe();
    };
  }, [currentUser]);





// TODO: fix the follow/unfollow








  const follow=async(id:string,user:UsersI)=>{
    await updateDoc(doc(db,"users",id),{
      followers:arrayUnion({
        user:{
          uid:currentUser&&currentUser.uid,
          displayName:currentUser&&currentUser.displayName,
          photoURL:currentUser&&currentUser.photoURL
        }
      })
    })
    await updateDoc(doc(db,"users",currentUser?.uid as string),{
      followings:arrayUnion({
        user:{
          uid:user.data.uid,
          displayName:user.data.displayName,
          photoURL:user.data.photoURL
        }
      })
    })
    }
    const unFollow=async(id:string,user:UsersI)=>{
    await updateDoc(doc(db,"users",id),{
      followers:arrayRemove({
        user:{
          uid:currentUser&&currentUser.uid,
          displayName:currentUser&&currentUser.displayName,
          photoURL:currentUser&&currentUser.photoURL
        }
      })
    })
    await updateDoc(doc(db,"users",currentUser?.uid as string),{
      followings:arrayRemove({
        user:{
          uid:user.data.uid,
          displayName:user.data.displayName,
          photoURL:user.data.photoURL
        }
      })
    })
    }
    
    const handleFollow=async(id:string,user:UsersI)=>{
      console
      let a=user.data.followers.find((item:any)=>item.user.uid===currentUser?.uid as string)
      typeof a==='undefined'?follow(id,user):unFollow(id,user)
    }





  return (
    <div className="hidden lg:block p-4 h-fit sticky top-0 ">
      <div
        className="p-4  
      bg-[#EFF3F4]
       flex items-center rounded-[3em] "
      >
        <MagnifyingGlassIcon  className="w-8 h-8" />
        <input
          value={query}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setQuery(e.currentTarget.value)
          }
          className="text-[1.5rem] focus:outline-none bg-[#EFF3F4] mx-5"
          placeholder="Search Twitter"
        />
        {query && (
          <XCircleIcon
            onClick={() => setQuery("")}
            className="w-12 h-12 cursor-pointer fill-[#1D9BF0]  text-white"
          />
        )}
      </div>
<div className="bg-[#F7F9F9] h-fit py-1 px-8 my-5 rounded-[2rem]">

  <p className="mt-5 font-bold text-[2rem]">Who to follow</p>
{users?.map(user=>
<FollowUser
 key={user.id} 
 image={user.data.photoURL} 
 username={user.data.displayName}
 id={user.id}
 handleFollow={handleFollow}
 user={user}
 followers={user.data.followers}
 />
  )}

</div>
</div>



  );
};

export default RightSideBar;
