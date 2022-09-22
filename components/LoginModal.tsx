import { XMarkIcon } from "@heroicons/react/24/outline";
import { signInWithEmailAndPassword } from "firebase/auth";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { auth } from "../lib/firebase";
import ClipLoader from "react-spinners/ClipLoader";
import toast, { Toaster } from "react-hot-toast";

interface PropsI {
  handleClose: () => void;
}

const LoginModal = ({ handleClose }: PropsI) => {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const login = (e: React.MouseEvent) => {
    e.preventDefault();

    setLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        if (user) {
          setLoading(false);
          router.push("/dashboard");
        }
      })
      .catch((error) => {
        setLoading(false);
        const errorMessage = error.message;
        toast.error(errorMessage);
      });
  };

  return (
    <div className="absolute top-0 w-[100vw] min-h-[100vh] bg-overlay grid place-items-center">
      <div className="relative w-[50.8rem] h-fit p-2 bg-white grid place-items-center rounded-[1.3rem]">
        <Image width={40} height={50} src="/logo.svg" alt="twitter logo" />
        <p className="text-[3.1rem] font-semibold">Sign in to Twitter</p>

        <form className="my-10">
          <input
            value={email}
            onChange={(e: React.FormEvent<HTMLInputElement>) =>
              setEmail(e.currentTarget.value)
            }
            required
            className="block p-3 mb-5 text-[1.6rem] h-[5rem] border-2 border-[#CFD9DE] rounded-lg focus:outline-[#1D9BF0]"
            placeholder="Email"
            type="email"
          />
          <input
            value={password}
            onChange={(e: React.FormEvent<HTMLInputElement>) =>
              setPassword(e.currentTarget.value)
            }
            required
            className="block p-3  text-[1.6rem] h-[5rem] border-2 border-[#CFD9DE] rounded-lg focus:outline-[#1D9BF0]"
            placeholder="Password"
            type="password"
          />
          <button
            onClick ={login }
            className="w-full my-5 bg-[#0f1419]
text-white text-[1.6rem] p-3 rounded-[2rem]"
          >
            {loading ? (
              <ClipLoader color="white" loading={true} size={20} />
            ) : (
              "Log in"
            )}
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
            fontSize: 15,
          },
        }}
      />
    </div>
  );
};

export default LoginModal;
