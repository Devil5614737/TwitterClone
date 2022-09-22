import type { NextPage } from "next";
import Image from "next/image";
import { useState } from "react";
import LoginModal from "../components/LoginModal";
import SignupModal from "../components/SignupModal";

const Home: NextPage = () => {
  const [openLoginModal,setOpenLoginModal]=useState(false);
  const [openSignupModal,setOpenSignupModal]=useState(false);



const handleOpen=()=>{
  setOpenLoginModal(true)
}
const handleClose=()=>{
  setOpenLoginModal(false)
}
const handleOpenSignup=()=>{
  setOpenSignupModal(true)
}
const handleCloseSignup=()=>{
  setOpenSignupModal(false)
}

  return (
<>
<div className="md:grid grid-cols-2">
      <div className="bg-login-bg hidden md:block h-[100vh] grid place-items-center">
      <Image width={555} height={347} 
      className='inline-block'
      src="/logo2.svg"
       alt="twitter logo" 
       style={{filter:'invert(1)'}}
       />

      </div>
      <div className="container p-16">
        <Image width={45} height={57} src="/logo.svg" alt="twitter logo" />
        <div className="my-14">
          <h3 className="text-[4rem] text-[#0F1419] font-extrabold mb-14">
            Happening now
          </h3>
          <h5 className="text-[2rem] text-[#0F1419] font-extrabold ">
            Join Twitter today.
          </h5>

          <a
          onClick={handleOpenSignup}
            href="#!"
            className="rounded-[3rem] bg-[#1D9BF0] text-white font-semibold text-[1.5rem] px-16 py-4 inline-block mt-14 mb-14"
          >
            Sign up with email
          </a>

          <p className="font-semibold text-[1.7rem]">
            Already have an account?
          </p>
          <a
          onClick={handleOpen}
            href="#!"
            className="rounded-[3rem] border-2 mt-4 font-semibold text-[1.5rem] px-32 py-4 inline-block text-[#1D9BF0] hover:bg-[#E8F5FD]"
          >
            Sign in
          </a>
        </div>
      </div>
    </div>
    {openLoginModal&&
    <LoginModal handleClose={handleClose}/>
    }
    {openSignupModal&&
    <SignupModal handleClose={handleCloseSignup}/>
    }
</>
  );
};

export default Home;
