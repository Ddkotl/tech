import { dataBase } from "@/lib/db_conect";
import { cache } from "react";
import {
  CreatePostListElementCommand,
  DeletePostListElementCommand,
  PostListElement,
} from "./model/types";
class PostsRepository {
  getPostsList = cache(
    (): Promise<PostListElement[]> => dataBase.post.findMany(),
  );

  createPostElement = (
    command: CreatePostListElementCommand,
  ): Promise<PostListElement> => {
    return dataBase.post.create({
      data: command,
    });
  };
  deletePostElement = (command: DeletePostListElementCommand) => {
    return dataBase.post.delete({
      where: { id: command.id },
    });
  };
}

export const postsRepository = new PostsRepository();
