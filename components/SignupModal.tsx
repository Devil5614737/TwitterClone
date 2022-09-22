import { XMarkIcon } from "@heroicons/react/24/outline";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState } from "react";
import toast, { Toaster } from 'react-hot-toast';
import ClipLoader from "react-spinners/ClipLoader";

import { auth, db } from "../lib/firebase";


interface PropsI {
  handleClose: () => void;
}

const SignupModal = ({ handleClose }: PropsI) => {
  const router = useRouter();
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const[loading,setLoading]=useState<boolean>(false);

  const handleSignup = async (e:React.MouseEvent) => {
    e.preventDefault();
    setLoading(true)
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);

      try {
        await updateProfile(res.user, {
          displayName: username,
          photoURL:"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
        });
        await setDoc(doc(db, "users", res.user.uid), {
          uid: res.user.uid,
          displayName: username,
          email,
          followers: [],
          followings: [],
          verified: false,
          cover: "",
          bio: "",
          photoURL: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png",
        }).then(() =>{
          toast.success("user created successfully")
          setLoading(false)
          router.push("/dashboard")});
      } catch (e) {
        setLoading(false)
       toast.error('try again!!!')
      }
    } catch (e) {
      setLoading(false)
      toast.error('something went wrong');
    }
  };

  return (
    <div className="absolute top-0 w-[100vw] min-h-[100vh]  bg-overlay grid place-items-center p-3">
      <div className="relative  w-[50.8rem] h-[100vh] h-fit p-2 bg-white grid place-items-center rounded-[1.3rem]">
        <Image width={40} height={50} src="/logo.svg" alt="twitter logo" />
        <p className="text-[3.1rem] font-semibold">Sign in to Twitter</p>

        <form className="my-10">
          <input
            onChange={(e: React.FormEvent<HTMLInputElement>) =>
              setUsername(e.currentTarget.value)
            }
            value={username}
            required
            className="block p-3 mb-5 text-[1.6rem] h-[5rem] border-2 border-[#CFD9DE] rounded-lg focus:outline-[#1D9BF0]"
            placeholder="Usernamae"
            type="text"
          />
          <input
            onChange={(e: React.FormEvent<HTMLInputElement>) =>
              setEmail(e.currentTarget.value)
            }
            value={email}
            required
            className=" block p-3 mb-5 text-[1.6rem] h-[5rem] border-2 border-[#CFD9DE] rounded-lg focus:outline-[#1D9BF0]"
            placeholder="Email"
            type="email"
          />
          <input
            onChange={(e: React.FormEvent<HTMLInputElement>) =>
              setPassword(e.currentTarget.value)
            }
            value={password}
            required
            className="mb-5 block p-3  text-[1.6rem] h-[5rem] border-2 border-[#CFD9DE] rounded-lg focus:outline-[#1D9BF0]"
            placeholder="Password"
            type="password"
          />


          <button
            onClick={handleSignup}
            className="w-full my-2 bg-[#0f1419]
text-white text-[1.6rem] p-3 rounded-[2rem]"
          >
           {loading?<ClipLoader color='white' loading={true}  size={20} />: "Sign up"}
          </button>
  
        </form>

        <XMarkIcon
          onClick={handleClose}
          className="h-10 w-10 absolute top-5 left-8 cursor-pointer "
        />
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

export default SignupModal;
