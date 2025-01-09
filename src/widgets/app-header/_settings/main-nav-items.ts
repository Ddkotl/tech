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
    name: "Новости",
    path: "/news",
  },
  {
    name: "Обзоры",
    path: "/reviews",
  },
];
