import { CalendarDaysIcon } from "@heroicons/react/24/outline";
import { profile } from "console";
import { arrayRemove, arrayUnion, collection, doc, onSnapshot, query, updateDoc, where } from "firebase/firestore";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import Card from "../components/Card";
import EditModal from "../components/EditModal";
import { AuthContext } from "../context/AuthContext";
import { AuthContextI } from "../interfaces/AuthContextI";
import { PostI } from "../interfaces/PostI";
import { UserI } from "../interfaces/User";
import { db } from "../lib/firebase";

 const Profile = () => {
  const { currentUser } = useContext<AuthContextI>(AuthContext);
  const [posts, setPosts] = useState<PostI[]>([]);
  const[showEditModal,setShowEditModal]=useState<boolean>(false)
  const [user, setUser] = useState<UserI>();

  useEffect(() => {
    if (!currentUser) return;
    const userD = query(
      collection(db, "users"),
      where("uid", "==", currentUser?.uid)
    );
    const unsubscribe = onSnapshot(userD, (snapshot) => {
      setUser(
        snapshot.docs.map((doc: any) => ({ data: doc.data() }))[0].data as UserI
      );
    });

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (!currentUser) return;
    const q = query(
      collection(db, "posts"),
      where(
        "postedBy.uid",
        "==",
     currentUser?.uid
      )
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      let data=snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() }))
      data.sort((a,b)=>b.data.createdAt-a.data.createdAt)
      setPosts(data as PostI[]);
    });
    return () => {
      unsubscribe();
    };
  }, []);


  const like = async (id: string) => {
    await updateDoc(doc(db, "posts", id), {
      likes: arrayUnion({
        uid: currentUser && currentUser.uid,
      }),
    });
  };

  const unLike = async (id: string) => {
    const ref = doc(db, "posts", id);

    await updateDoc(ref, {
      likes: arrayRemove({
        uid: currentUser && currentUser.uid,
      }),
    });
  };

  const handleLike = (id: string, post: PostI) => {
    like(id);
    let isLiked = post.data.likes.find((item) => item.uid === currentUser?.uid);

    return typeof isLiked === "undefined" ? like(id) : unLike(id);
  };

const handleClose=()=>{
  setShowEditModal(false)
}





  return (
    <>
      <div className="lg:col-span-2 col-span-3">
        <div
          className="sticky  top-0 h-fit z-50 bg-navbar
      backdrop-blur-[1.2rem]
      flex justify-between items-center p-4
   "
        >
          <p className="text-[2rem] font-bold text-[#0F1419]">
            {user?.displayName}
          </p>
        </div>

        <div className="">
          <Image
            className=" w-full inline-block"
            height={100}
            width={300}
            layout="responsive"
            loading="lazy"
            objectFit="cover"
            src={user?.cover as string}
          />

          <div className="flex items-center justify-between -my-24 px-4 mb-5">
            <div className=" bg-[white]   rounded-full w-[14.1rem] h-[14.1rem] relative z-10 grid place-items-center">
              <Image
                className="rounded-full w-full  "
                height={130}
                width={130}
                loading="lazy"
                objectFit="cover"
                src={user?.photoURL as string}
              />
            </div>
            <a
            onClick={()=>setShowEditModal(true)}
              href="#!"
              className="text-[#0f1419]  font-bold  text-[1.5rem] border-2 border-[#CFD9DE] rounded-[2.3rem] p-3 px-7
         hover:bg-[#E7E7E8] inline-block mt-20"
            >
              Edit profile
            </a>
          </div>
        </div>

        <div className="p-4">
          <p className="font-bold text-[1.9rem]">{user?.displayName}</p>
 <p className="text-[#0f1419] text-[1.5rem] mb-4">{user?.bio}</p>
          <div className="flex items-center text-[1.4rem] space-x-2">
            <CalendarDaysIcon className="w-8 h-8 text-[#536471]" />
            <p className="text-[#536471]">Joined December 2014</p>
          </div>

          <div className="flex items-center space-x-5 my-3">
            <p className="text-[1.5rem] font-semibold">
              {user?.followings.length} <span className="text-[#536471] font-medium">Following</span>
            </p>
            <p className="text-[1.5rem] font-semibold">
            {user?.followers.length} <span className="text-[#536471] font-medium">Followers</span>
            </p>
          </div>
       
        </div>
        {posts.map(post=>
           <Card
           key={post.id}
           image={post.data.image}
           caption={post.data.caption}
           handleLike={handleLike}
           id={post.id as string}
           post={post}
           likes={post.data.likes.length}
           postedBy={post.data.postedBy}
           comments={post.data.comments.length}
           hide={true}
    
         />
            )}
        
      </div>
      {showEditModal&&
      <EditModal close={handleClose}/>
      }
    </>
  );
};



export default Profile