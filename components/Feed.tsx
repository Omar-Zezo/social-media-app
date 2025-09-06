import React from "react";
import Post from "./Post";
import { prisma } from "@/utils/db";
import { auth } from "@clerk/nextjs/server";

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
  const posts = await prisma.post.findMany({ where: whereCondetion });
  return (
    <div>
      {posts.map((post) => (
        <Post key={post.id} />
      ))}
    </div>
  );
};

export default Feed;
