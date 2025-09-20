import { leftbarList } from "@/constants";
import { prisma } from "@/utils/db";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const LeftBar = async () => {
  const { userId } = await auth();
  const user = userId
    ? await prisma.user.findUnique({ where: { id: userId } })
    : undefined;

  console.log(user);
  return (
    <div className="h-screen sticky top-0 flex flex-col justify-between pt-2 pb-8">
      <div className="flex flex-col gap-4 items-center 2xl:items-start text-lg">
        <Link href="/" className="block p-2 rounded-full hover:bg-[#181818]">
          <Image width={30} height={30} src="/icons/logo.svg" alt="logo" />
        </Link>
        <ul className="flex flex-col gap-2">
          {leftbarList.map((item) => (
            <li key={item.id}>
              <Link
                href={
                  item.name === "Profile" ? `/${user?.username}` : item.link
                }
                className="flex gap-4 px-3 py-2 rounded-full hover:bg-[#181818]"
              >
                <Image
                  src={`/icons/${item.icon}`}
                  alt={item.name}
                  width={24}
                  height={24}
                />
                <p className="hidden 2xl:block">{item.name}</p>
              </Link>
            </li>
          ))}
        </ul>
        <Link href="/" className="2xl:hidden p-2 bg-white rounded-full">
          <Image src="/icons/post.svg" alt="post" width={24} height={24} />
        </Link>

        <Link
          href="/compose/post"
          className="hidden 2xl:block py-2 px-20 bg-white text-lg text-black font-semibold rounded-full"
        >
          Post
        </Link>
      </div>
      <div className="flex items-center justify-between mt-4">
        <div className="flex items-center gap-2">
          <div className="size-10 relative rounded-full flex">
            <Image
              src="/general/avatar.webp"
              alt="username"
              fill
              className="rounded-full"
            />
          </div>
          <div className="hidden 2xl:flex flex-col">
            <p className="capitalize font-semibold">{user?.displayName}</p>
            <p className="text-sm text-textGray">@{user?.username}</p>
          </div>
        </div>
        <div className="hidden 2xl:block cursor-pointer font-bold">...</div>
      </div>
    </div>
  );
};

export default LeftBar;
