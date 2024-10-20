export type PostListElement = {
  id: string;
  title: string;
  content: string;
};

export type CreatePostListElementCommand = {
  title: string;
  content: string;
};

export type DeletePostListElementCommand = {
  id: string;
};
