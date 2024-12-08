"use server";

import { SessionEntity } from "@/entities/user";
import { getAppSessionServer } from "@/entities/user/get-app-session.server";
import { dataBase } from "@/shared/lib/db_conect";

import { revalidatePath } from "next/cache";

export async function toggleLike(postId: string) {
  const session: SessionEntity | null = await getAppSessionServer();
  if (!session) {
    throw new Error("Unauthorized");
  }

  const userId = session.user.id;

  try {
    const existingLike = await dataBase.like.findUnique({
      where: {
        userId_postId: {
          userId,
          postId,
        },
      },
    });

    if (existingLike) {
      await dataBase.like.delete({
        where: {
          userId_postId: {
            userId,
            postId,
          },
        },
      });
    } else {
      await dataBase.like.create({
        data: {
          userId,
          postId,
        },
      });
    }

    revalidatePath(`/posts/${postId}`);
    return { success: true };
  } catch (error) {
    console.error("Failed to toggle like:", error);
    return { success: false, error: "Failed to toggle like" };
  }
}

export async function toggleBookmark(postId: string) {
  const session: SessionEntity | null = await getAppSessionServer();

  if (!session) {
    throw new Error("Unauthorized");
  }

  const userId = session.user.id;

  try {
    const existingBookmark = await dataBase.bookmark.findUnique({
      where: {
        userId_postId: {
          userId,
          postId,
        },
      },
    });

    if (existingBookmark) {
      await dataBase.bookmark.delete({
        where: {
          userId_postId: {
            userId,
            postId,
          },
        },
      });
    } else {
      await dataBase.bookmark.create({
        data: {
          userId,
          postId,
        },
      });
    }

    revalidatePath(`/posts/${postId}`);
    return { success: true };
  } catch (error) {
    console.error("Failed to toggle bookmark:", error);
    return { success: false, error: "Failed to toggle bookmark" };
  }
}
export async function incrementViewCount(postId: string) {
  try {
    await dataBase.post.update({
      where: { id: postId },
      data: { views: { increment: 1 } },
    });

    revalidatePath(`/posts/${postId}`);
    revalidatePath(`/posts`);
    return { success: true };
  } catch (error) {
    console.error("Failed to increment view count:", error);
    return { success: false, error: "Failed to increment view count" };
  }
}
