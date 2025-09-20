"use client";

import { prisma } from "@/utils/db";
import { useState } from "react";

const FollowButton = ({
  isFollowing,
  userId,
}: {
  isFollowing: boolean;
  userId: string;
}) => {
  const [hovered, setHovered] = useState(false);
  const label = isFollowing ? (hovered ? "Unfollow" : "Following") : "Follow";

  //follow
  const follow = async () => {
    // prisma.follow.create({data:{following:}})
  };
  return (
    <button
      onMouseOver={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`py-2 w-[100px] text-center font-bold rounded-full cursor-pointer border
        ${label === "Follow" && "bg-white text-black"}
        ${
          label === "Following" && "bg-transparent text-white border-borderGray"
        }
        ${label === "Unfollow" && "border-red-500 text-red-500"}
        `}
    >
      {label}
    </button>
  );
};

export default FollowButton;
