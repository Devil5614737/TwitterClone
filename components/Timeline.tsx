import { SparklesIcon } from "@heroicons/react/24/outline";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { PostContext } from "../context/PostContext";
import { AuthContextI } from "../interfaces/AuthContextI";
import { PostContextI } from "../interfaces/PostContextI";
import { PostI } from "../interfaces/PostI";
import { db } from "../lib/firebase";
import Card from "./Card";
import CommentModal from "./CommentModal";
import TweetBox from "./TweetBox";

const Timeline = () => {
  const { posts, progress } = useContext<PostContextI>(PostContext);
  const { currentUser } = useContext<AuthContextI>(AuthContext);
  const [openCommentModal, setOpenCommentModal] = useState<boolean>(false);

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

  const open = () => {
    setOpenCommentModal(true);
  };

  return (
    <>
      <div className=" lg:col-span-2 col-span-3">
        <div
          className="sticky  top-0 h-fit z-10 bg-navbar
      backdrop-blur-[1.2rem]
      flex justify-between items-center p-4
      "
        >
          <p className="text-[2rem] font-bold text-[#0F1419]">Latest Tweets</p>
          <div
            title="latest tweets"
            className="cursor-pointer hover:bg-[#E7E7E8] rounded-full p-2"
          >
            <SparklesIcon className="h-10 w-10" />
          </div>
        </div>
        {(progress as number) > 0 && (
          <div
            className="transition-all ease-in-out"
            style={{
              width: `${progress}%`,
              background: "#1D9BF0",
              height: 5,
            }}
          ></div>
        )}
        <TweetBox />
        {posts?.map((post) => (
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
            hide={false}
            open={open}
            setOpenCommentModal={setOpenCommentModal}
          />
        ))}
      </div>
      {openCommentModal && (
        <CommentModal setOpenCommentModal={setOpenCommentModal} />
      )}
    </>
  );
};

export default Timeline;
