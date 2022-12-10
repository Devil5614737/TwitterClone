import {
  FaceSmileIcon,
  GifIcon,
  LinkIcon,
  PhotoIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";
import {
  addDoc,
  collection,

  serverTimestamp,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import Image from "next/image";
import React, { ChangeEvent, useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { PostContext } from "../context/PostContext";
import {motion} from 'framer-motion';
import { AuthContextI } from "../interfaces/AuthContextI";
import { PostContextI } from "../interfaces/PostContextI";
import { db, storage } from "../lib/firebase";
import toast, { Toaster } from 'react-hot-toast';

const TweetBox = () => {
  const { currentUser } = useContext<AuthContextI>(AuthContext);

  const { setProgress } = useContext<PostContextI>(PostContext);
  const [text, setText] = useState<string>("");
  const [file, setFile] = useState<File>();







  const handleChange = (event: ChangeEvent) => {
    const target = event.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];
    setFile(file);
  };


  const posts = collection(db, "posts");
  const date = new Date().getTime();

  
  const handleTweet = async () => {
    if (file) {
      const storageRef = ref(storage, `${file?.name + date}`);
    
      const uploadTask = uploadBytesResumable(storageRef, file);
  
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setProgress(Math.round(progress));
          },
          (error) => {
            alert(error);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then(
              async (downloadURL) => {
                await addDoc(posts, {
                  caption: text,
                  image: downloadURL,
                  likes: [],
                  comments: [],
                  reTweets: [],
                  createdAt: serverTimestamp(),
                  postedBy: {
                    uid: currentUser?.uid,
                    displayName: currentUser?.displayName,
                    photoURL: currentUser?.photoURL,
                  },
                });
              }
            ).then(()=>{setProgress(0)
            setText("")
            setFile(null as undefined|any) 
            })
          }
        );
    
    }else{
      await addDoc(posts, {
        caption: text,
        likes: [],
        comments: [],
        reTweets: [],
        createdAt: serverTimestamp(),
        postedBy: {
          uid: currentUser?.uid,
          displayName: currentUser?.displayName,
          photoURL: currentUser?.photoURL,
        },
      }).then(()=>{setText("")
    toast.success('posted successfully')
    }).catch(e=>alert(e))
    }
  };

  return (
    <div
      className="flex  w-full p-4 
 gap-6"
    >
      <div>
      <Image
            src={currentUser?.photoURL as string}
            width={45}
            height={45}
            className="rounded-full"
            objectFit="cover"
            alt='currentUser'
          />
      </div>
      <div className="w-full">
        <textarea
          placeholder="What's happening"
          className="text-[2rem] h-fit resize-none w-full outline-none text-[#5D6D79]"
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            setText(e.currentTarget.value)
          }
          value={text}
        />
        {file && (
          <div className="relative">
            <Image
              className="rounded-[2em] w-full inline-block mb-3"
              height={140}
              width={300}
              layout="responsive"
              loading="lazy"
              objectFit="cover"
              src={URL.createObjectURL(file)}
              alt='cover'
            />
            <XCircleIcon
              onClick={() => setFile("" as any)}
              className="h-12 w-12 cursor-pointer absolute top-4 left-3 text-white fill-black "
            />
          </div>
        )}
        <div className="flex items-center justify-between mt-10">
          <div className="flex gap-5 items-center">
            <label
              htmlFor="image"
              className=" rounded-full w-16 h-16 grid place-items-center hover:bg-[#E8F5FD]"
            >
              <PhotoIcon className="h-10 w-10 cursor-pointer text-[#1D9BF0]" />
            </label>
            <input
              onChange={handleChange}
              type="file"
              className="hidden"
              id="image"
            />
            <div className=" rounded-full w-16 h-16 grid place-items-center hover:bg-[#E8F5FD]">
              <GifIcon className="h-10 w-10 cursor-pointer text-[#1D9BF0]" />
            </div>
            <div className=" rounded-full w-16 h-16 grid place-items-center hover:bg-[#E8F5FD]">
              <FaceSmileIcon className="h-10 w-10 cursor-pointer text-[#1D9BF0]" />
            </div>
            <div className=" rounded-full w-16 h-16 grid place-items-center hover:bg-[#E8F5FD]">
              <LinkIcon className="h-8 w-8 cursor-pointer text-[#1D9BF0]" />
            </div>
          </div>
          <motion.button
           whileTap={{
    scale: 0.8,
}}
            onClick={handleTweet}
            disabled={!text}
            className="text-[1.5rem] font-semibold bg-[#1D9BF0] py-3 px-9 rounded-full text-white disabled:opacity-[.5]"
          >
            Tweet
          </motion.button>
        </div>
      </div>
        <Toaster
      toastOptions={{
      
        style: {
        fontSize:15
        },
      }}
      
      />
    </div>
  );
};

export default TweetBox;
