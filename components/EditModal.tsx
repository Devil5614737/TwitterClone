import { CameraIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { updateProfile, User } from "firebase/auth";
import { doc,  updateDoc } from "firebase/firestore";
;
import Image from "next/image";
import React, { ChangeEvent, useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useImage } from "../hooks/useImage";
import { AuthContextI } from "../interfaces/AuthContextI";
import { db} from "../lib/firebase";
import ClipLoader from "react-spinners/ClipLoader";
import toast, { Toaster } from "react-hot-toast";

interface PropsI {
  close: (showEditModal: boolean) => void;
}

const EditModal = ({ close }: PropsI) => {
  const { currentUser } = useContext<AuthContextI>(AuthContext);
  const [file, setFile] = useState<File>();
  const [name, setName] = useState<string>("");
  const [bio, setBio] = useState<string>("");
  const {  url } = useImage(file as File);
  const[loading,setLoading]=useState<boolean>(false);

  const handleChange = (event: ChangeEvent) => {
    const target = event.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];
    setFile(file);
  };


  const handleEdit = async () => {
    setLoading(true)
    if (!file) return;

    try {
      await updateProfile(currentUser as any, {
        displayName: name,
        photoURL: url,
      });
      await updateDoc(doc(db, "users", currentUser?.uid as string), {
        displayName: name,
        photoURL: url,
        bio,
        cover:url
      }).then(close(false) as any
      ).then(()=>toast.success('changes saved!!!'))
    } catch (e) {
      setLoading(false)
      alert(e);
    }
  };

  return (
    <>
      <div className="fixed top-0 w-[100vw] min-h-[100vh] bg-overlay grid place-items-center z-50 left-0">
        <div className=" relative w-[50.8rem] h-fit p-2 px-5 bg-white  rounded-[1.3rem]">
          <div className=" flex items-center justify-between w-full py-4">
            <div className="flex items-center space-x-4 ">
              <XMarkIcon
                onClick={close as any}
                className="w-[2rem] h-[2rem] cursor-pointer"
              />
              <p className="text-[1.5rem]">Edit Profile</p>
            </div>
            <button
            disabled={!name||!bio||!url}
              onClick={handleEdit}
    
              className="inline-block  text-[1.6rem] p-3 bg-black text-white rounded-[1.9rem] px-[2rem]"
            >
               {loading ? (
              <ClipLoader color="white" loading={true} size={20} />
            ) : (
              "Save"
            )}
            </button>
          </div>
          <div className="my-2">
           
            <div className=" bg-[white]   rounded-full w-[10rem] h-[10rem] relative z-10 grid place-items-center my-[1rem] mb-5 mx-2 ">
              <Image
                className="rounded-full w-full  "
                height={90}
                width={90}
                loading="lazy"
                objectFit="cover"
                alt='cover'
                src={
                  file
                    ? URL.createObjectURL(file)
                    : (currentUser?.photoURL as string)
                }
              />
              <label
                htmlFor="profilePic"
                className="absolute w-12 h-12 rounded-full bg-black grid place-items-center cursor-pointer items-center"
              >
                <CameraIcon className="w-8 h-8 text-[white]" />
              </label>
            </div>
            <input
              value={name}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setName(e.currentTarget.value)
              }
              className="w-full p-3 py-4 rounded-lg text-[1.5rem] border-2 border-[#CFD9DE] mb-5"
              placeholder="Name"
            />
            <textarea
              value={bio}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                setBio(e.currentTarget.value)
              }
              className="w-full p-3 py-4 rounded-lg text-[1.5rem] border-2 border-[#CFD9DE]"
              placeholder="Bio"
            />
          </div>
        </div>
      </div>
      <input
        id="profilePic"
        type="file"
        className="hidden"
        onChange={handleChange}
      />
    <Toaster
        toastOptions={{
          style: {
            fontSize: 15,
          },
        }}
      />
     
    </>
  );
};

export default EditModal;
