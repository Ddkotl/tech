import { MdDashboard } from "react-icons/md";
import { MdOutlinePostAdd } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import { MdCategory } from "react-icons/md";
import { FaTags } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { MdOutlineQueryStats } from "react-icons/md";
export type AdminNavItem = {
  name: string;
  path: string;
  icon: React.ElementType;
};
export const adminNavItems: AdminNavItem[] = [
  {
    name: "Админка",
    path: "/admin",
    icon: MdDashboard,
  },
  {
    name: "Пользователи",
    path: "/admin/users",
    icon: FaUsers,
  },
  {
    name: "Статьи",
    path: "/admin/posts",
    icon: MdOutlinePostAdd,
  },
  {
    name: "Категории",
    path: "/admin/categories",
    icon: MdCategory,
  },
  {
    name: "Тэги",
    path: "/admin/tags",
    icon: FaTags,
  },
  {
    name: "Статистика",
    path: "/admin/statistics",
    icon: MdOutlineQueryStats,
  },
  {
    name: "Настройки",
    path: "/admin/settings",
    icon: IoMdSettings,
  },
];
