export type PostId = string;

export type PostEntity = {
  id: PostId;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
};

export type CreatePostDto = {
  title: string;
  content: string;
};
