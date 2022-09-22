import React, { useContext, useState } from "react";
import {
  HomeIcon,
  HashtagIcon,
  BellIcon,
  EnvelopeIcon,
  BookmarkIcon,
  UserIcon,
  EllipsisHorizontalCircleIcon,
  ArrowLeftOnRectangleIcon,
} from "@heroicons/react/24/outline";
import SideBarRow from "./SideBarRow";
import Image from "next/image";
import { AuthContextI } from "../interfaces/AuthContextI";
import { AuthContext } from "../context/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../lib/firebase";
import { useRouter } from "next/router";

interface PropsI {
  show: (showProfile: boolean) => void;
  setShowProfile: any;
}

const Sidebar = ({ show, setShowProfile }: PropsI) => {
  const { currentUser } = useContext<AuthContextI>(AuthContext);

  const router = useRouter();

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        router.push("/");
      })
      .catch((error) => {
        alert(error);
      });
  };

  return (
    <>
      <div className=" px-11 py-5 border-r-2  border-r-[#EFF3F4]  sticky top-0 h-fit ">
        <Image
          className=" mb-3 inline-block"
          width={33}
          height={29}
          objectFit="contain"
          src="/logo.svg"
          alt="twitter logo"
        />
        <SideBarRow
          Icon={HomeIcon}
          title="Home"
          logout={() => setShowProfile(false)}
        />
        <SideBarRow Icon={HashtagIcon} title="Explore" />
        <SideBarRow Icon={BellIcon} title="Notifications" />
        <SideBarRow Icon={EnvelopeIcon} title="Messages" />
        <SideBarRow Icon={BookmarkIcon} title="Bookmarks" />
        {/* //fix naming */}
        <SideBarRow logout={show as any} Icon={UserIcon} title="Profile" />
        <SideBarRow Icon={EllipsisHorizontalCircleIcon} title="More" />
        <SideBarRow
          Icon={ArrowLeftOnRectangleIcon}
          title="Logout"
          logout={handleLogout}
        />
        <a
          className="hidden lg:grid place-items-center text-white text-[1.7rem]  h-[5.2rem] w-[22.4rem] rounded-[10rem] font-semibold bg-[#1D9BF0] mt-5"
          href="#!"
        >
          Tweet
        </a>
        -<div className="flex items-center space-x-2 my-9 cursor-pointer hover:bg-[#E7E7E8] max-w-fit lg:py-4 lg:px-6  rounded-[10rem]">
          <Image
            src={currentUser?.photoURL as string}
            width={35}
            height={35}
            className="rounded-full"
            objectFit="cover"
            alt='currentuser'
          />
          <div className="hidden lg:block">
            <p className="text-[0F1419] text-[1.5rem] font-bold">
              {currentUser && currentUser.displayName}
            </p>
            <p className="text-[1.6rem] text-[grey]">@231312312312</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
