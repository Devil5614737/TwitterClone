import {
  ArrowPathRoundedSquareIcon,
  ArrowUpTrayIcon,
  ChatBubbleOvalLeftIcon,
  CheckBadgeIcon,
  EllipsisHorizontalCircleIcon,
  EllipsisHorizontalIcon,
  HeartIcon,
  TrashIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { deleteDoc, doc } from "firebase/firestore";
import Image from "next/image";
import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { PostContext } from "../context/PostContext";
import { AuthContextI } from "../interfaces/AuthContextI";
import { PostContextI } from "../interfaces/PostContextI";
import { postedByI, PostI } from "../interfaces/PostI";
import { db } from "../lib/firebase";
import {motion} from 'framer-motion'

interface PropsI {
  image: string;
  caption: string;
  handleLike: (id: string, post: PostI,uid:string) => void;
  id: string;
  post: PostI;
  likes: number;
  postedBy: postedByI;
  comments: number;
  hide:boolean,
  setOpenCommentModal?: (openCommentModal: boolean) => void;
  open?: any;
}

const Card = ({
  image,
  caption,
  id,
  post,
  handleLike,
  likes,
  postedBy,
  comments,
  open,
  hide
}: PropsI) => {
  const { currentUser } = useContext<AuthContextI>(AuthContext);
  const { setCommentId } = useContext<PostContextI>(PostContext);

  const [show, setShow] = useState<boolean>(false);

  const handleDelete = async () => {
    await deleteDoc(doc(db, "posts", id));
    setShow(false);
  };

  let isLiked = post.data.likes.find((item) => item.uid === currentUser?.uid);

  return (
    <motion.div
    initial={{ y:50,opacity:0}}
  animate={{ y:0, opacity: 1 }}
  transition={{
    type: "spring",
    stiffness: 260,
    damping: 20,
    delay:.5
  }}
    className="p-3 py-5 relative  border-t-2 hover:bg-[#F7F7F7]  border-[#EFF3F4]">
      <div className="flex  space-x-5  onClick={()=>setShow(false)} ">
        <div className="">
          <Image
            loading="lazy"
            className=" rounded-full "
            height={48}
            width={48}
            objectFit="cover"
            src={postedBy?.photoURL}
            alt='postedby'
          />
        </div>
        <div className="w-full">
          <p className="flex flex-1 justify-between items-center gap-2 text-[1.5rem]  text-[#0F1419]">
            {postedBy.displayName}
            {/* <span>
              <CheckBadgeIcon className="h-10 w-10 cursor-pointer text-white fill-[#1D9BF0]" />
            </span> */}
            {currentUser?.uid === postedBy.uid && (
              <EllipsisHorizontalIcon
                onClick={() => setShow(true)}
                className="w-10 h-10 cursor-pointer relative z-20"
              />
            )}
          </p>
          <p className="text-[1.6rem]">{caption}</p>
          <div
            className="h-fit
             my-4"
          >
            {image && (
              <Image
                className="rounded-[2em] w-full "
                height={180}
                width={300}
                layout="responsive"
                loading="lazy"
                objectFit="cover"
                src={image&&image}
                alt='postedby'
              />
            )}
          </div>
          <div className="flex items-center justify-between w-[70%]">
            <div className="flex cursor-pointer hover:text-[#8BCAF4] transition-all delay-100 ease-in-out">
           {hide===false&&
           <>
                <ChatBubbleOvalLeftIcon
                  onClick={() => {
                    setCommentId(id);
                    open();
                  }}
                  className="h-8 w-8"
                />
           
              <p className="text-[1.4rem]">{comments}</p>
              </>
           }
              
            </div>
            <div className="flex cursor-pointer items-center space-x-3 hover:text-[#45CB9E] transition-all delay-100 ease-in-out">
              <ArrowPathRoundedSquareIcon className="h-8 w-8" />
              <p className="text-[1.4rem]">8</p>
            </div>
            <div
              onClick={() => handleLike(id, post,currentUser?.uid as string)}
              className="flex cursor-pointer items-center space-x-3 hover:text-[#F91880] transition-all delay-100 ease-in-out"
            >
              <HeartIcon
                className="h-8 w-8"
                style={{
                  fill: isLiked ? "#F91880" : "white",
                  color: isLiked && "#F91880",
                }}
              />
              <p className="text-[1.4rem]">{likes}</p>
            </div>
            <div className="flex cursor-pointer items-center space-x-3 hover:text-[#4EB0F2] transition-all delay-100 ease-in-out">
              <ArrowUpTrayIcon className="h-8 w-8" />
              <p className="text-[1.4rem]">2</p>
            </div>
          </div>
          {post.data.comments.map(comment=>
          <div key={comment.id} className="flex items-center space-x-2 my-3">
            <Image
             loading="lazy"
             className=" rounded-full "
             height={27}
             width={27}
             objectFit="cover"
             src={comment?.postedBy.photoURL}
             alt='postedby'
            />
          <div className="">
            <p className='text-[1.5rem] '>{comment.postedBy.displayName}</p>
            <p className="text-[1.4rem]">{comment.text}</p>
          </div>
          </div>
            )}
        </div>
      </div>
      {show && (
        <div className="z-20 absolute w-fit h-fit top-0 right-0 bg-white rounded-[1rem] p-4 shadow-2xl ">
          <p
            onClick={handleDelete}
            className="text-[1.7rem] cursor-pointer flex items-center gap-3 hover:text-[red]"
          >
            <span>
              <TrashIcon className="w-7 h-7" />
            </span>
            Delete
          </p>
          <p
            onClick={() => setShow(false)}
            className="text-[1.7rem] cursor-pointer flex items-center gap-3 hover:text-[red] my-2"
          >
            <span>
              <XMarkIcon className="w-7 h-7" />
            </span>
            Close
          </p>
        </div>
      )}
    </motion.div>
  );
};

export default Card;
