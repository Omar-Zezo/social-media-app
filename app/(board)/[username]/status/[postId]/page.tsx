import Comments from "@/components/Comments";
import Post from "@/components/Post";
import { prisma } from "@/utils/db";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

const StatusPage = async ({
  params,
}: {
  params: { username: string; postId: string };
}) => {
  const { userId } = await auth();
  const { postId, username } = await params;

  if (!userId) return;

  const post = await prisma.post.findFirst({
    where: { id: Number(postId) },
    include: {
      user: { select: { username: true, displayName: true, img: true } },
      _count: { select: { likes: true, comments: true, rePosts: true } },
      likes: { where: { userId: userId }, select: { id: true } },
      rePosts: { where: { userId: userId }, select: { id: true } },
      saves: { where: { userId: userId }, select: { id: true } },
      comments: {
        orderBy: { createdAt: "desc" },
        include: {
          user: { select: { username: true, displayName: true, img: true } },
          _count: { select: { likes: true, comments: true, rePosts: true } },
          likes: { where: { userId: userId }, select: { id: true } },
          rePosts: { where: { userId: userId }, select: { id: true } },
          saves: { where: { userId: userId }, select: { id: true } },
        },
      },
    },
  });

  if (!post) return notFound();

  return (
    <div className="">
      <div className="flex items-center gap-8 sticky top-0 backdrop-blur-md p-4 z-10 bg-[#00000084]">
        <Link href="/">
          <Image src="/icons/back.svg" alt="back" width={24} height={24} />
        </Link>
        <h1 className="font-bold text-lg">Post</h1>
      </div>
      <Post type="status" post={post} />
      <Comments
        comments={post.comments}
        postId={Number(postId)}
        username={username}
      />
    </div>
  );
};

export default StatusPage;
