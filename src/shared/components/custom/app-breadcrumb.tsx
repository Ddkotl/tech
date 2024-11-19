// "use client";
// import Link from "next/link";
// import {
//   Breadcrumb,
//   BreadcrumbList,
//   BreadcrumbItem,
//   BreadcrumbLink,
//   BreadcrumbSeparator,
// } from "../ui/breadcrumb";
// import { usePathname } from "next/navigation";

// const bredcrambTranslate = {
//   admin: "Админка",
//   users: "Пользователи",
//   posts: "Статьи",
//   categories: "Категории",
//   tags: "Тэги",
//   statistics: "Статистика",
//   settings: "Настройки",
// };

// export function AppBreadcrumb() {
//   const pathname = usePathname();
//   const links = pathname.split("/").filter((e) => e !== "");
//   const len = links.length - 1;
//   console.log(links);
//   return (
//     <Breadcrumb className="hidden md:flex">
//       <BreadcrumbList>
//         <BreadcrumbItem>
//           <BreadcrumbLink asChild>
//             <Link href="/">Главная</Link>
//           </BreadcrumbLink>
//         </BreadcrumbItem>
//         <BreadcrumbSeparator />
//         {links.map((link, index) => {
//           if (index === len) {
//             return (
//               <BreadcrumbItem key={index}>
//                 <BreadcrumbLink asChild>
//                   <Link href={`/${link}`}>{bredcrambTranslate[link]}</Link>
//                 </BreadcrumbLink>
//               </BreadcrumbItem>
//             );
//           }
//           return (
//             <>
//               <BreadcrumbItem key={index}>
//                 <BreadcrumbLink asChild>
//                   <Link href={`/${link}`}>{bredcrambTranslate[link]}</Link>
//                 </BreadcrumbLink>
//               </BreadcrumbItem>
//               <BreadcrumbSeparator />
//             </>
//           );
//         })}
//       </BreadcrumbList>
//     </Breadcrumb>
//   );
// }
