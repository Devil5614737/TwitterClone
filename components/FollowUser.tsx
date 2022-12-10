import Image from "next/image";
import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { AuthContextI } from "../interfaces/AuthContextI";
import { UsersI } from "../interfaces/User";

interface PropsI {
  image: string;
  username: string;
  id: string;
  handleFollow: (id: string, user: UsersI) => void;
  user: UsersI;
  followers: [];
}

export const FollowUser = ({
  image,
  username,
  id,
  handleFollow,
  user,
  followers,
}: PropsI) => {
  const { currentUser } = useContext<AuthContextI>(AuthContext);

  let followed = followers.find(
    (item: any) => item.user.uid === (currentUser?.uid as string)
  );

  return (
    <div
      onClick={() => handleFollow(id, user)}
      className="my-5 flex items-center justify-between"
    >
      <div className="flex items-center space-x-4 mb-4">
        <Image
          loading="lazy"
          className=" rounded-full "
          height={48}
          width={48}
          objectFit="cover"
          src={image}
          alt="user"
        />
        <p className="font-semibold text-[1.5rem] text-[#0f1419]">{username}</p>
      </div>
      <button
        onClick={() => handleFollow(id, user)}
        className="inline-block  text-[1.4rem] p-2  bg-black text-white rounded-[1.9rem] px-7 font-semibold"
      >
        {typeof followed === "undefined" ? "Follow" : "Unfollow"}
      </button>
    </div>
  );
};
