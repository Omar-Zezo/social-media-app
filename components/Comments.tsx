"use client";
import Image from "next/image";
import Post from "./Post";
import { Post as PostType } from "@prisma/client";
import { useUser } from "@clerk/nextjs";
import { useActionState } from "react";
import { addComment } from "@/actions";

type CommentsWithDetails = PostType & {
  user: {
    displayName: string | null;
    username: string;
    img: string | null;
  };
  _count: {
    likes: number;
    rePosts: number;
    comments: number;
  };
  likes: { id: number }[];
  rePosts: { id: number }[];
  saves: { id: number }[];
};

const Comments = ({
  comments,
  postId,
  username,
}: {
  comments: CommentsWithDetails[];
  postId: number;
  username: string;
}) => {
  const { isLoaded, isSignedIn, user } = useUser();
  const [state, formAction, isPending] = useActionState(addComment, {
    success: false,
    error: false,
  });
  return (
    <div className="">
      {user && (
        <form
          action={formAction}
          className="flex items-center justify-between gap-4 p-4 "
        >
          <div className="relative w-10 h-10 rounded-full overflow-hidden">
            <Image
              src={user.imageUrl || "/general/avatar.webp"}
              alt="username"
              fill
            />
          </div>
          <input
            autoComplete="off"
            name="desc"
            type="text"
            className="flex-1 bg-transparent outline-none p-2 text-xl"
            placeholder="Post your reply"
          />
          <input name="postId" type="number" hidden readOnly value={postId} />
          <input name="username" type="text" hidden readOnly value={username} />
          <button
            disabled={isPending}
            className="py-2 px-4 font-bold bg-white text-black rounded-full cursor-pointer disabled:cursor-not-allowed disabled:bg-slate-200"
          >
            {isPending ? "Replying.." : "Reply"}
          </button>
        </form>
      )}
      {state.error && <p className="text-red-300 p-4">Something went wrong</p>}
      {comments.map((comment) => (
        <Post type="comment" key={comment.id} post={comment} />
      ))}
    </div>
  );
};

export default Comments;
