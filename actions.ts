"use server";

import { auth } from "@clerk/nextjs/server";
import { SettingsType } from "./components/CreatePostActions";
import { prisma } from "./utils/db";
import { success, z } from "zod";
import { error } from "console";
import { revalidatePath } from "next/cache";

export const shareAction = async (
  formData: FormData,
  settings: SettingsType
) => {
  const content = formData.get("content") as string;
  const media = formData.get("media") as File;

  console.log(content, media, settings);
};

//like a post
export const likePost = async (postId: number) => {
  const { userId } = await auth();
  if (!userId) return;

  const existingLike = await prisma.like.findFirst({
    where: {
      userId,
      postId,
    },
  });

  if (existingLike) {
    await prisma.like.delete({
      where: {
        id: existingLike.id,
      },
    });
  } else {
    await prisma.like.create({
      data: {
        postId,
        userId,
      },
    });
  }
};

// save a post
export const savePost = async (postId: number) => {
  const { userId } = await auth();
  if (!userId) return;

  const existingSave = await prisma.savedPosts.findFirst({
    where: {
      userId,
      postId,
    },
  });

  if (existingSave) {
    await prisma.savedPosts.delete({
      where: {
        id: existingSave.id,
      },
    });
  } else {
    await prisma.savedPosts.create({
      data: {
        postId,
        userId,
      },
    });
  }
};

// repost a post
export const rePostPost = async (postId: number) => {
  const { userId } = await auth();
  if (!userId) return;

  const existingRepost = await prisma.post.findFirst({
    where: {
      userId,
      rePostId: postId,
    },
  });

  if (existingRepost) {
    await prisma.post.delete({
      where: {
        id: existingRepost.id,
      },
    });
  } else {
    await prisma.post.create({
      data: {
        rePostId: postId,
        userId,
      },
    });
  }
};

//add comment
export const addComment = async (
  prevState: { success: boolean; error: boolean },
  formData: FormData
) => {
  const { userId } = await auth();

  if (!userId) return { success: false, error: true };

  const postId = formData.get("postId");
  const username = formData.get("username");
  const desc = formData.get("desc");

  const Comment = z.object({
    parentPostId: z.number(),
    desc: z.string().max(140),
  });

  const validatedFields = Comment.safeParse({
    parentPostId: Number(postId),
    desc,
  });

  if (!validatedFields.success) {
    console.log(validatedFields.error.flatten().fieldErrors);
    return { success: false, error: true };
  }

  try {
    await prisma.post.create({
      data: {
        ...validatedFields.data,
        userId,
      },
    });
    revalidatePath(`/${username}/status/${postId}`);
    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};
