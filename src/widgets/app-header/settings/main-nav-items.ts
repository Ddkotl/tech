export interface NavItems {
  name: string;
  path: string;
}

export const mainNavItems: NavItems[] = [
  {
    name: "Главная",
    path: "/",
  },
  {
    name: "Статьи",
    path: "/posts",
  },
  {
    name: "Закладки",
    path: "/bookmarks",
  },
];
