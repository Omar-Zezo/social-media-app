import React from "react";
import Post from "./Post";
import { prisma } from "@/utils/db";
import { auth } from "@clerk/nextjs/server";
import InfiniteFeed from "./InfiniteFeed";

const Feed = async ({ userProfileId }: { userProfileId?: string }) => {
  const { userId } = await auth();

  if (!userId) return;

  const whereCondetion = userProfileId
    ? { userId: userProfileId }
    : {
        parentPostId: null,
        userId: {
          in: [
            userId,
            ...(
              await prisma.follow.findMany({
                where: { followerId: userId },
                select: { followingId: true },
              })
            ).map((follow) => follow.followingId),
          ],
        },
      };
  const posts = await prisma.post.findMany({
    where: whereCondetion,
    include: {
      user: {
        select: { username: true, displayName: true, img: true },
      },
      rePost: {
        include: {
          user: {
            select: { username: true, displayName: true, img: true },
          },
          _count: { select: { likes: true, comments: true, rePosts: true } },
          likes: { where: { userId: userId }, select: { id: true } },
          rePosts: { where: { userId: userId }, select: { id: true } },
          saves: { where: { userId: userId }, select: { id: true } },
        },
      },
      _count: { select: { likes: true, comments: true, rePosts: true } },
      likes: { where: { userId: userId }, select: { id: true } },
      rePosts: { where: { userId: userId }, select: { id: true } },
      saves: { where: { userId: userId }, select: { id: true } },
    },
    take: 3,
    skip: 0,
    orderBy: { createdAt: "desc" },
  });
  return (
    <div>
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
      <InfiniteFeed />
    </div>
  );
};

export default Feed;
