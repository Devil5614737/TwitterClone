import {
  FaceSmileIcon,
  GifIcon,
  PhotoIcon,
  UserCircleIcon,
  XCircleIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import React, { ChangeEvent, useContext, useState } from "react";
import { PostContext } from "../context/PostContext";
import { PostContextI } from "../interfaces/PostContextI";

interface PropsI {
  setOpenCommentModal: (openCommentModal: boolean) => void;
}

const CommentModal = ({ setOpenCommentModal }: PropsI) => {

  const { handleComment,commentId, } = useContext<PostContextI>(PostContext);


  const [text, setText] = useState<string>("");
  const [file, setFile] = useState<File>();

  const handleChange = (event: ChangeEvent) => {
    const target = event.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];
    setFile(file);
  };



  return (
    <div className="right-0 fixed z-10 top-0 w-[100vw] min-h-[100vh] bg-overlay ">
      <div
        className="relative flex rounded-[1em] bg-[white]  w-[50rem] p-4 m-auto my-[2rem] h-fit z-50
 gap-6"
      >
        <div>
          <UserCircleIcon className="h-20 w-20" />
        </div>
        <div className="w-full">
          <textarea
            placeholder="Tweet your reply"
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
            </div>
            <button
            onClick={()=>{handleComment(commentId,text)
            setText('')
            setOpenCommentModal(false)
            }}
              disabled={!text}
              className="text-[1.5rem] font-semibold bg-[#1D9BF0] py-3 px-9 rounded-full text-white disabled:opacity-[.5]"
            >
              Reply
            </button>
          </div>
        </div>
        <XMarkIcon
          onClick={() => setOpenCommentModal(false)}
          className="h-10 w-10 cursor-pointer "
        />
      </div>
    </div>
  );
};

export default CommentModal;
